import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const TELEGRAM_BOT_TOKEN =
    import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
    "8931193476:AAGzIYnMbW3Y2yzz8FiPEOouL_U6q8gPJ_4";
  const TELEGRAM_CHAT_ID =
    import.meta.env.VITE_TELEGRAM_CHAT_ID || "1451081391";

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      if (currentUser.displayName) {
        setFormData((prev) => ({ ...prev, name: currentUser.displayName }));
      } else if (currentUser.email) {
        setFormData((prev) => ({
          ...prev,
          name: currentUser.email.split("@")[0],
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const escapeHTML = (str) => {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Please login first to send a message.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      let userRole = "user";
      let userName = formData.name || currentUser.displayName || currentUser.email.split("@")[0];
      let userEmail = currentUser.email || "N/A";

      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        userRole = userDoc.data().role || "user";
        if (userDoc.data().name && !formData.name) {
          userName = userDoc.data().name;
        }
      }

      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        subject: formData.subject,
        description: formData.description,
        userId: currentUser.uid,
        userName: userName,
        userEmail: userEmail,
        userRole: userRole,
        createdAt: serverTimestamp(),
        createdAtISO: new Date().toISOString(),
      });

      const telegramMessage = `
<b>📩 New Contact Message</b>

<b>👤 Name:</b> ${escapeHTML(formData.name)}
<b>📧 Email:</b> ${escapeHTML(userEmail)}
<b>🔑 Role:</b> ${escapeHTML(userRole)}
<b>📌 Subject:</b> ${escapeHTML(formData.subject)}
<b>📝 Description:</b>
${escapeHTML(formData.description)}
      `.trim();

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        },
      );

      if (response.ok) {
        alert("Your message has been sent successfully!");
        setFormData({ name: "", subject: "", description: "" });
      } else {
        const errorData = await response.json();
        alert(
          `Saved to Firestore, but Telegram alert failed: ${errorData.description}`,
        );
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to submit message. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center pt-24">
        <h1 className="font-adlam text-3xl sm:text-4xl">
          <u>Contact Me</u>
        </h1>
        <br />
        <p className="font-biorhyme text-gray-700 max-w-lg mx-auto px-4">
          Everyone can fill information if you have any problems or ideas to
          upgrade this project. Thank you!
        </p>
      </div>
      <br />
      <br />
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-[420px] mx-auto border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold text-gray-800 mb-1">
              Enter name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-lg p-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Purpose"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-lg p-2.5 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-lg p-2.5 outline-none focus:border-blue-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Contact;