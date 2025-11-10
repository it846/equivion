"use client";

import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import {
  Building2,
  User,
  CreditCard,
  Car,
  Home,
  Landmark,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  Calculator,
  ChevronDown
} from "lucide-react";
import ApplicationForm from "../../components/ApplicationForm";

// Services list for navigation
const servicesList = [
  { id: "business-loan", title: "Business Loan", description: "Fuel your business growth" },
  { id: "personal-loan", title: "Personal Loan", description: "Get instant funds" },
  { id: "balance-transfer", title: "Balance Transfer", description: "Save on interest" },
  { id: "car-loan", title: "Car Loan", description: "Drive your dream car" },
  { id: "home-loan", title: "Home Loan", description: "Make your dream home reality" },
  { id: "loan-against-property", title: "Loan Against Property", description: "Unlock property value" }
];

// Service data
const servicesData: Record<string, any> = {
  "business-loan": {
    title: "Business Loan",
    description: "Fuel your business growth with flexible financing options tailored to your business needs.",
    icon: Building2,
    features: [
      "Quick approval within 48 hours",
      "Flexible repayment terms up to 7 years",
      "Competitive interest rates starting from 10.5%",
      "Loan amount up to ₹50 Crores",
      "Minimal documentation required",
      "No hidden charges"
    ],
    eligibility: [
      "Business operational for at least 2 years",
      "Minimum annual turnover of ₹20 lakhs",
      "Good credit score (above 650)",
      "Proper business registration documents"
    ],
    documents: [
      "Business registration certificate",
      "Last 2 years ITR and Financial Statements",
      "Bank statements for last 6 months",
      "Identity and address proof",
      "Business address proof"
    ],
    benefits: [
      "Expand your business operations",
      "Purchase new equipment or machinery",
      "Increase working capital",
      "Open new branches or locations",
      "Tax benefits under Section 80C"
    ]
  },
  "personal-loan": {
    title: "Personal Loan",
    description: "Get instant funds for your personal needs with minimal documentation and quick approval.",
    icon: User,
    features: [
      "Instant approval in 30 minutes",
      "No collateral required",
      "Flexible EMI options",
      "Loan amount up to ₹25 lakhs",
      "Competitive interest rates from 10.99%",
      "Online application process"
    ],
    eligibility: [
      "Age between 21-60 years",
      "Minimum monthly income of ₹25,000",
      "Good credit score (above 700)",
      "Salaried or self-employed"
    ],
    documents: [
      "PAN Card",
      "Aadhaar Card",
      "Last 3 months salary slips",
      "Last 6 months bank statements",
      "Employment proof"
    ],
    benefits: [
      "Wedding expenses",
      "Medical emergencies",
      "Home renovation",
      "Education expenses",
      "Travel and vacation",
      "Debt consolidation"
    ]
  },
  "balance-transfer": {
    title: "Balance Transfer",
    description: "Transfer your existing loans and save on interest with better rates and flexible terms.",
    icon: CreditCard,
    features: [
      "Lower interest rates than existing loan",
      "Reduced EMI burden",
      "Extended loan tenure options",
      "Top-up loan available",
      "Simple transfer process",
      "No foreclosure charges"
    ],
    eligibility: [
      "Existing loan running for at least 12 months",
      "Regular EMI payment history",
      "Good credit score (above 650)",
      "Adequate repayment capacity"
    ],
    documents: [
      "Existing loan account statement",
      "Current loan sanction letter",
      "Recent bank statements",
      "Identity and address proof",
      "Income proof documents"
    ],
    benefits: [
      "Save on interest payments",
      "Reduce monthly EMI amount",
      "Get additional funds as top-up",
      "Single EMI for multiple loans",
      "Better loan terms and conditions"
    ]
  },
  "car-loan": {
    title: "Car Loan",
    description: "Drive your dream car home with attractive interest rates and flexible repayment options.",
    icon: Car,
    features: [
      "Finance up to 90% of car value",
      "Quick disbursal within 48 hours",
      "Flexible tenure up to 7 years",
      "Interest rates starting from 8.5%",
      "New and used car financing",
      "Minimal processing fees"
    ],
    eligibility: [
      "Age between 21-65 years",
      "Minimum annual income of ₹3 lakhs",
      "Valid driving license",
      "Good credit history"
    ],
    documents: [
      "Identity proof (PAN, Aadhaar)",
      "Address proof",
      "Income proof (salary slips/ITR)",
      "Bank statements for 6 months",
      "Car quotation/proforma invoice"
    ],
    benefits: [
      "Own your dream car today",
      "Preserve your savings",
      "Tax benefits for self-employed",
      "Insurance and accessories financing",
      "Easy upgrade options"
    ]
  },
  "home-loan": {
    title: "Home Loan",
    description: "Make your dream home a reality with our affordable home loan solutions and attractive rates.",
    icon: Home,
    features: [
      "Low interest rates starting from 8.35%",
      "Loan amount up to ₹5 Crores",
      "Long repayment tenure up to 30 years",
      "Balance transfer facility available",
      "Part prepayment allowed",
      "Doorstep service available"
    ],
    eligibility: [
      "Age between 21-65 years",
      "Minimum monthly income of ₹30,000",
      "Good credit score (above 700)",
      "Stable employment history"
    ],
    documents: [
      "Identity and address proof",
      "Last 6 months salary slips",
      "Last 2 years ITR (self-employed)",
      "Bank statements for 6 months",
      "Property documents"
    ],
    benefits: [
      "Own your dream home",
      "Tax benefits up to ₹3.5 lakhs",
      "Build wealth through property",
      "Flexible prepayment options",
      "Balance transfer with top-up"
    ]
  },
  "loan-against-property": {
    title: "Loan Against Property",
    description: "Unlock the value of your property with high-value loans at competitive interest rates.",
    icon: Landmark,
    features: [
      "High loan amount up to ₹10 Crores",
      "Competitive interest rates from 9.5%",
      "Flexible tenure up to 15 years",
      "Loan against residential/commercial property",
      "Quick approval and disbursal",
      "Minimal documentation"
    ],
    eligibility: [
      "Age between 24-70 years",
      "Property owner (residential/commercial)",
      "Stable income source",
      "Good credit history"
    ],
    documents: [
      "Property ownership documents",
      "Property valuation report",
      "Identity and address proof",
      "Income proof documents",
      "Bank statements for 6 months"
    ],
    benefits: [
      "Large loan amounts available",
      "Lower interest rates",
      "Flexible end-use",
      "Business expansion",
      "Education or marriage expenses",
      "Debt consolidation"
    ]
  }
};

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">Service Not Found</h1>
          <Link href="/" className="text-teal-400 hover:text-teal-300 transition">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo.jpeg"
              alt="Equivion LLP Logo"
              width={50}
              height={50}
              className="object-contain transition-transform group-hover:scale-110 group-hover:rotate-6"
            />
            <div className="relative">
              <span
                className="text-2xl font-bold text-green-600 transition-all duration-300 tracking-wider uppercase"
                style={{
                  textShadow: '2px 2px 0 rgba(34, 197, 94, 0.2)',
                  WebkitTextStroke: '1px rgba(34, 197, 94, 0.3)'
                }}
              >
                Equivion
              </span>
            </div>
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <div className="relative group">
              <button className="text-gray-700 hover:text-teal-600 transition flex items-center gap-1 font-medium">
                Services
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <div className="py-2">
                  {servicesList.map((svc) => (
                    <Link
                      key={svc.id}
                      href={`/services/${svc.id}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition border-l-2 border-transparent hover:border-teal-500"
                    >
                      <div className="font-semibold">{svc.title}</div>
                      <div className="text-sm text-gray-500">{svc.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/#about" className="text-gray-700 hover:text-teal-600 transition font-medium">About</Link>
            <Link href="/#contact" className="text-gray-700 hover:text-teal-600 transition font-medium">Contact</Link>
          </div>
          <Link
            href="/#contact"
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:from-teal-600 hover:to-cyan-600 transition shadow-lg hover:shadow-xl font-semibold"
          >
            Apply Now
          </Link>
        </nav>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 rounded-2xl shadow-lg">
            <Icon className="h-12 w-12 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              {service.title}
            </h1>
            <p className="text-xl text-gray-700">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Features Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {service.eligibility.map((criteria: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents Required */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">Documents Required</h2>
              <ul className="space-y-3">
                {service.documents.map((doc: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Benefits & Uses</h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar - Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 sticky top-24">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">Apply Now</h3>
              <p className="text-gray-600 mb-6">Get instant approval for your {service.title.toLowerCase()}</p>

              <ApplicationForm serviceTitle={service.title} />

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="h-5 w-5 text-teal-500" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="h-5 w-5 text-teal-500" />
                    <span>info@equivion.com</span>
                  </div>
                </div>
              </div>

              <Link
                href="/#emi-calculator"
                className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg transition font-semibold flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
              >
                <Calculator className="h-5 w-5" />
                EMI Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-16 mt-12 border-t border-teal-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-teal-100">
            Apply now and get instant approval for your {service.title.toLowerCase()}
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-full hover:bg-gray-100 transition text-lg font-semibold shadow-lg shadow-white/20"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-teal-500/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/logo.jpeg"
                  alt="Equivion LLP Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span
                  className="text-xl font-bold text-green-400 tracking-wider uppercase"
                  style={{
                    textShadow: '1px 1px 0 rgba(34, 197, 94, 0.2)',
                    WebkitTextStroke: '0.5px rgba(34, 197, 94, 0.3)'
                  }}
                >
                  Equivion
                </span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for all financial needs.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-teal-400">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#services" className="hover:text-teal-400 transition">Services</Link></li>
                <li><Link href="/#about" className="hover:text-teal-400 transition">About Us</Link></li>
                <li><Link href="/#contact" className="hover:text-teal-400 transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-teal-400">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/business-loan" className="hover:text-teal-400 transition">Business Loan</Link></li>
                <li><Link href="/services/personal-loan" className="hover:text-teal-400 transition">Personal Loan</Link></li>
                <li><Link href="/services/home-loan" className="hover:text-teal-400 transition">Home Loan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-teal-400">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+91 98765 43210</li>
                <li>info@equivion.com</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-teal-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Equivion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
