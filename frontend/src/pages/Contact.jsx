import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If you want to send to backend later, replace alert with fetch()
    alert("Message sent! We'll get back to you shortly.");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        Have questions or need a fast mobile auto technician? Reach out below —
        we respond quickly!
      </p>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

        {/* LEFT SIDE — CONTACT INFO */}
        <div className="bg-white shadow rounded-xl p-8 space-y-6">

          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

          <div className="flex items-center gap-4">
            <Phone className="text-yellow-500" size={28} />
            <a href="tel:+17195106453" className="text-lg font-semibold">
              (719) 510-6453
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-yellow-500" size={28} />
            <a href="mailto:service@lagzautotechmobile.com" className="text-lg">
              service@lagzautotechmobile.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Clock className="text-yellow-500" size={28} />
            <p className="text-lg">Mon–Sun: 8:00 AM – 7:00 PM</p>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-yellow-500" size={28} />
            <p className="text-lg">Colorado Springs, CO</p>
          </div>

          {/* Call to action */}
          <a
            href="tel:+17195106453"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded mt-6 hover:bg-gray-800 transition"
          >
            <Phone size={18} /> Call Now
          </a>
        </div>

        {/* RIGHT SIDE — CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold">Send a Message</h2>

          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 rounded border focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 rounded border focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="font-semibold">Your Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 mt-1 rounded border focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:bg-yellow-300 transition flex justify-center items-center gap-2"
          >
            <Send size={18} /> Send Message
          </button>
        </form>
      </div>

      {/* MAP SECTION */}
      <div className="mt-16 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d315332.35225664037!2d-104.955!3d38.845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87134c348e1a7f3f%3A0xdeadbeef123456!2sColorado%20Springs%2C%20CO!5e0!3m2!1sen!2sus!4v0000000000000"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
