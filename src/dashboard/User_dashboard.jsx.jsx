import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function UserDashboard() {
  const exchangeRate = 4100;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCalculations = async (currentUser) => {
    if (!currentUser) {
      setHistory([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const q = query(
        collection(db, "calculations"),
        where("userId", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      console.log("Fetched User Data:", data);
      setHistory(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchCalculations(user);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this saved calculation?")) {
      try {
        await deleteDoc(doc(db, "calculations", id));
        setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Failed to delete: " + error.message);
      }
    }
  };

  const totalSavedCalculations = history.length;

  const totalCostUSD = history.reduce((sum, item) => {
    const val = Number(item.costUSD) || Number(item.cost) || 0;
    return sum + val;
  }, 0);

  const totalCostKHR = history.reduce((sum, item) => {
    const val = Number(item.costKHR) || (Number(item.costUSD || 0) * exchangeRate);
    return sum + val;
  }, 0);

  if (loading) {
    return (
      <div className="pt-36 text-center font-bold text-slate-600 min-h-screen bg-gray-100">
        Loading your calculations from Firebase...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 pt-28 pb-16 px-4 sm:px-8 font-inter">
      <div className="max-w-[1280px] mx-auto">
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center font-bold">
            Firestore Error: {errorMsg} <br />
            <span className="text-sm font-normal">
              (Please check your Firestore Security Rules to ensure Read permission is enabled)
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-adlam">
              User Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage your saved calculation history.
            </p>
          </div>
          <button
            onClick={() => fetchCalculations(auth.currentUser)}
            className="px-4 py-2 text-sm font-bold 
            bg-white border-2 border-white rounded-[8px] 
            cursor-pointer 
            shadow-lg
            bg-blue-700 text-white 
            hover:scale-110"
          >
            Refresh History
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-2 border-black rounded-[10px] p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Total Saved</h3>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">
              {totalSavedCalculations}
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-[10px] p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Total Cost ($)</h3>
            <p className="text-3xl font-extrabold text-red-600 mt-2">
              ${totalCostUSD.toFixed(2)}
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-[10px] p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Total Cost (KHR)</h3>
            <p className="text-3xl font-extrabold text-green-600 mt-2">
              {totalCostKHR.toLocaleString()} Riel
            </p>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white border-2 border-black rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 font-adlam">Calculation History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-black text-gray-700 font-bold text-sm">
                  <th className="p-4">Type</th>
                  <th className="p-4">Dimensions / Spec</th>
                  <th className="p-4">Equipment Required</th>
                  <th className="p-4">Total Cost ($)</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">
                      No calculations saved yet. Try using the Calculators!
                    </td>
                  </tr>
                ) : (
                  history.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-blue-800">
                        {item.type || item.tool || "Lighting"}
                      </td>

                      <td className="p-4 text-gray-700">
                        {item.area ? `${item.area} m²` : "N/A"}{" "}
                        {item.length && item.width ? `(${item.length}m × ${item.width}m)` : ""}
                      </td>

                      <td className="p-4 font-semibold text-gray-800">
                        {item.buluCount || item.bulbCount || item.quantity || 0} Bulbs
                        {item.bulwatt || item.watt ? ` (${item.bulwatt || item.watt}W)` : ""}
                      </td>

                      <td className="p-4 font-bold text-red-600">
                        ${Number(item.costUSD || item.cost || 0).toFixed(2)}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 border border-black rounded-[6px] transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;