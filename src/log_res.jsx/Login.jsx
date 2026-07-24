import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      let userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const existingDoc = querySnapshot.docs[0];
          const existingData = existingDoc.data();

          if (existingData.role === "admin") {
            navigate("/admin");
            setLoading(false);
            return;
          }
        }

        const username = user.displayName || email.split("@")[0];
        await setDoc(userDocRef, {
          uid: user.uid,
          name: username,
          email: user.email,
          role: "user",
          createdAt: serverTimestamp(),
        }, { merge: true });
        userSnap = await getDoc(userDocRef);
      }

      if (userSnap.exists() && userSnap.data().role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log("Firebase Error Code:", err.code);

      if (err.code === "auth/too-many-requests") {
        setError("Too many login attempts! Please wait a few minutes or click Register below.");
      } else if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential" ||
        err.code === "auth/invalid-email"
      ) {
        navigate("/register", { state: { email, pass } });
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password! Please try again.");
      } else {
        setError("Login failed. If you don't have an account, please Register.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-[110px]">
      <div className="flex-grow px-4 pb-12">
        <div className="grid grid-cols-1 max-w-[500px] w-full p-5 sm:p-8 justify-center items-center mx-auto border-2 border-white rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.3)] bg-white">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-adlam">Welcome to C-E-R</h1>
            <p className="font-biorhyme mt-1">Login to your account</p>
          </div>
          <br />

          <form onSubmit={handleLogin} className="flex flex-col w-full max-w-[400px] mx-auto gap-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-[10px] text-sm text-center font-inter font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="font-inter font-bold">Email Address</label>
              <input
                type="email"
                required
                placeholder="Your@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-black h-[50px] w-full rounded-[10px] p-2 font-inter mt-1 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="font-inter font-bold">Password</label>
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Your password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="border-2 border-black h-[50px] w-full rounded-[10px] p-2 font-inter mt-1 focus:outline-none focus:border-blue-600"
              />

              <div className="flex items-center mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="showpass-login"
                  checked={showPass}
                  onChange={(e) => setShowPass(e.target.checked)}
                  className="w-4 h-4 border-2 border-black cursor-pointer"
                />
                <label
                  htmlFor="showpass-login"
                  className="px-2 text-gray-500 font-inter select-none cursor-pointer text-sm"
                >
                  Show password
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="border-2 border-black h-[45px] w-full rounded-[10px] bg-blue-600 text-white font-bold hover:bg-green-500 transition duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Checking..." : "Sign In"}
            </button>
          </form>
          <br />

          <div className="text-center">
            <p className="font-inter">
              Don't have an account?{" "}
              <Link to="/register" state={{ email, pass }}>
                <span className="text-green-700 font-bold cursor-pointer hover:underline">
                  Register Now!
                </span>
              </Link>
            </p>
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

export default Login;