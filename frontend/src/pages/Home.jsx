import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fast. Reliable. Mobile Auto Repair.
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Professional mobile mechanic serving Colorado Springs — we come to you!
          </p>
          <Link
            to="/book"
            className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            Book a Service
          </Link>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">
            Popular Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Diagnostics</h3>
              <p className="text-gray-600">
                Full engine scans + troubleshooting delivered to your location.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Brake Repair</h3>
              <p className="text-gray-600">
                Brake pads, rotors, and inspections done onsite.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Oil Change</h3>
              <p className="text-gray-600">
                Fast and clean oil changes at your home or office.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="text-primary font-semibold hover:underline"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-6">
            What Customers Are Saying
          </h2>
          <p className="text-gray-600 mb-8">
            Real reviews from customers in Colorado Springs.
          </p>

          {/* Elfsight Google Review Widget */}
          <div className="flex justify-center">
            <div
              className="elfsight-app-6804c029-52ee-4caf-8961-2c5ff367b5c0 w-full"
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
        <p className="text-lg mb-6">Call now for fast mobile auto repair service.</p>
        <a
          href="tel:7195106453"
          className="bg-white text-primary font-semibold px-6 py-3 rounded-lg text-lg"
        >
          Call (719) 510-6453
        </a>
      </section>
    </div>
  );
}
