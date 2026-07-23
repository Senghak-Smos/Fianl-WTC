import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [calculations, setCalculations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const unsubUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch dashboard data.");
        setLoading(false);
      }
    );

    const unsubCalcs = onSnapshot(
      collection(db, "calculations"),
      (snapshot) => {
        const calcList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCalculations(calcList);
      },
      (err) => console.error("Error fetching calculations:", err)
    );

    const unsubContacts = onSnapshot(
      collection(db, "contacts"),
      (snapshot) => {
        const contactList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactList);
      },
      (err) => console.error("Error fetching contacts:", err)
    );

    return () => {
      unsubUsers();
      unsubCalcs();
      unsubContacts();
    };
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: newRole });
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Failed to update user role.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this account record?")) {
      try {
        await deleteDoc(doc(db, "users", userId));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user record.");
      }
    }
  };

  const handleDeleteCalc = async (calcId) => {
    if (window.confirm("Are you sure you want to delete this calculation history?")) {
      try {
        await deleteDoc(doc(db, "calculations", calcId));
      } catch (err) {
        console.error("Error deleting calculation:", err);
        alert("Failed to delete calculation.");
      }
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "contacts", contactId));
      } catch (err) {
        console.error("Error deleting contact message:", err);
        alert("Failed to delete contact message.");
      }
    }
  };

  const formatDate = (dateField) => {
    if (!dateField) return "N/A";
    if (dateField.toDate) return dateField.toDate().toLocaleDateString();
    return new Date(dateField).toLocaleDateString();
  };

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user" || !u.role).length;

  return (
    <div className="flex flex-col min-h-screen pt-[110px] bg-gray-50 font-inter">
      <div className="flex-grow max-w-[1280px] w-full mx-auto px-4 sm:px-6 md:px-12 pb-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-adlam text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage user accounts, permissions, calculation and messages records.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border-2 border-black rounded-[10px] p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Total Accounts</h3>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{loading ? "..." : totalUsers}</p>
          </div>
          <div className="bg-white border-2 border-black rounded-[10px] p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Admins</h3>
            <p className="text-3xl font-extrabold text-green-600 mt-2">{loading ? "..." : adminCount}</p>
          </div>
          <div className="bg-white border-2 border-black rounded-[10px] p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Users</h3>
            <p className="text-3xl font-extrabold text-red-500 mt-2">{loading ? "..." : userCount}</p>
          </div>
          <div className="bg-white border-2 border-black rounded-[10px] p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Saved Calculations</h3>
            <p className="text-3xl font-extrabold text-purple-600 mt-2">{loading ? "..." : calculations.length}</p>
          </div>
          <div className="bg-white border-2 border-black rounded-[10px] p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h3 className="text-xs font-bold text-gray-500 uppercase">User Messages</h3>
            <p className="text-3xl font-extrabold text-amber-600 mt-2">{loading ? "..." : contacts.length}</p>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-100 text-red-700 text-center font-semibold rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white border-2 border-black rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.1)] overflow-hidden mb-10">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">
              User Messages ({contacts.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-black text-gray-700 font-bold text-sm">
                  <th className="p-4 w-[110px]">Date</th>
                  <th className="p-4 w-[180px]">User Details</th>
                  <th className="p-4 w-[160px]">Subject</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-center w-[100px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      Loading messages...
                    </td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No customer messages found.
                    </td>
                  </tr>
                ) : (
                  contacts.map((msg) => (
                    <tr key={msg.id} className="hover:bg-gray-50 align-top">
                      <td className="p-4 text-gray-500 text-xs whitespace-nowrap">
                        {formatDate(msg.createdAt || msg.createdAtISO)}
                      </td>
                      <td className="p-4 break-words max-w-[180px]">
                        <div className="font-bold text-gray-900">
                          {msg.userName || msg.name || "Guest Account"}
                        </div>
                        {msg.userEmail && msg.userEmail !== "N/A" && (
                          <div className="text-xs text-gray-500">{msg.userEmail}</div>
                        )}
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase rounded border border-black mt-1 ${
                            msg.userRole === "admin"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {msg.userRole || "guest"}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-blue-600 break-words max-w-[160px]">
                        {msg.subject}
                      </td>
                      <td className="p-4 text-gray-600 max-w-[300px] break-words">
                        {msg.description}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteContact(msg.id)}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 border border-black rounded-[6px] transition cursor-pointer shadow-sm"
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

        <div className="bg-white border-2 border-black rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.1)] overflow-hidden mb-10">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">
              Calculation History ({calculations.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-black text-gray-700 font-bold text-sm">
                  <th className="p-4">Type</th>
                  <th className="p-4">Calculated By</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">Bulbs</th>
                  <th className="p-4">Cost ($)</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      Loading calculation data...
                    </td>
                  </tr>
                ) : calculations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No saved calculations found yet.
                    </td>
                  </tr>
                ) : (
                  calculations.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 align-top">
                      <td className="p-4 font-bold text-blue-700">
                        {c.type || "Lighting"}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900">
                          {c.userName || c.userEmail || "Guest Account"}
                        </div>
                        {c.userEmail && (
                          <div className="text-xs text-gray-500">{c.userEmail}</div>
                        )}
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase rounded border border-black mt-1 ${
                            c.userRole === "admin"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {c.userRole || "user"}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">
                        {c.area} m² ({c.length}m x {c.width}m)
                      </td>
                      <td className="p-4 font-semibold text-gray-800">
                        {c.buluCount} Bulbs ({c.bulwatt}W)
                      </td>
                      <td className="p-4 font-bold text-green-700">
                        ${Number(c.costUSD || 0).toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteCalc(c.id)}
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

        <div className="bg-white border-2 border-black rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Admin & User Accounts ({users.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-black text-gray-700 font-bold text-sm">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      Loading user data...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No user accounts found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-900">
                        {u.name || "N/A"}
                      </td>
                      <td className="p-4 text-gray-600">{u.email}</td>
                      <td className="p-4">
                        <select
                          value={u.role || "user"}
                          onChange={(e) =>
                            handleRoleChange(u.id, e.target.value)
                          }
                          className={`font-bold px-3 py-1 rounded-[6px] border border-black cursor-pointer ${
                            u.role === "admin"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="p-4 text-gray-500">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
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

      <footer className="w-full bg-gray-300 py-4 border-t border-gray-400/40 text-center mt-auto">
        <p className="text-gray-700 font-biorhyme text-xs sm:text-sm">
          2026 C-E-R. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default AdminDashboard;