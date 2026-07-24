import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Contact() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const TELEGRAM_BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID; 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    setStatus("Sending...");

    try {
      const text = `New Contact Form Message:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
      
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center pt-32 font-inter">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen pt-[110px] px-4 pb-12">
      <div className="max-w-[600px] w-full mx-auto p-6 border-2 border-black rounded-[10px] bg-white shadow-md">
        <h1 className="text-3xl font-adlam text-center mb-4">Contact Us</h1>
        
        {status && (
          <div className="mb-4 p-2 text-center text-sm font-semibold rounded bg-gray-100 border border-gray-300">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-inter font-bold">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border-2 border-black h-[45px] w-full rounded-[10px] p-2 mt-1 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="font-inter font-bold">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-black h-[45px] w-full rounded-[10px] p-2 mt-1 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="font-inter font-bold">Message</label>
            <textarea
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="border-2 border-black w-full rounded-[10px] p-2 mt-1 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="border-2 border-black h-[45px] w-full rounded-[10px] bg-blue-600 text-white font-bold hover:bg-green-500 transition duration-200 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;