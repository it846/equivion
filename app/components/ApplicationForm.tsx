"use client";

import { useState } from "react";

interface ApplicationFormProps {
  serviceTitle: string;
}

export default function ApplicationForm({ serviceTitle }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanAmount: "",
    employmentType: "Salaried",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "application",
          service: serviceTitle,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          loanAmount: "",
          employmentType: "Salaried",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Something went wrong. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9+\s\-()]+"
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <label htmlFor="loanAmount" className="block text-gray-700 font-semibold mb-2">
          Loan Amount <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="loanAmount"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          placeholder="₹ 5,00,000"
        />
      </div>
      <div>
        <label htmlFor="employmentType" className="block text-gray-700 font-semibold mb-2">
          Employment Type <span className="text-red-500">*</span>
        </label>
        <select
          id="employmentType"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
        >
          <option value="Salaried">Salaried</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Business Owner">Business Owner</option>
        </select>
      </div>

      {submitStatus.type && (
        <div
          className={`p-3 rounded-lg text-sm ${
            submitStatus.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 rounded-lg transition font-semibold shadow-lg shadow-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
