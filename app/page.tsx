import Link from "next/link";
import {
  Building2,
  User,
  CreditCard,
  Car,
  Home as HomeIcon,
  Landmark,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail
} from "lucide-react";

const services = [
  {
    id: "business-loan",
    title: "Business Loan",
    description: "Fuel your business growth with flexible financing options tailored to your needs.",
    icon: Building2,
    features: ["Quick approval", "Flexible terms", "Competitive rates"]
  },
  {
    id: "personal-loan",
    title: "Personal Loan",
    description: "Get instant funds for your personal needs with minimal documentation.",
    icon: User,
    features: ["Instant approval", "No collateral", "Easy EMI"]
  },
  {
    id: "balance-transfer",
    title: "Balance Transfer",
    description: "Transfer your existing loans and save on interest with better rates.",
    icon: CreditCard,
    features: ["Lower interest", "Save money", "Simple process"]
  },
  {
    id: "car-loan",
    title: "Car Loan",
    description: "Drive your dream car home with attractive interest rates and flexible tenure.",
    icon: Car,
    features: ["Up to 90% funding", "Quick disbursal", "Flexible repayment"]
  },
  {
    id: "home-loan",
    title: "Home Loan",
    description: "Make your dream home a reality with our affordable home loan solutions.",
    icon: HomeIcon,
    features: ["Low interest rates", "Long tenure", "Tax benefits"]
  },
  {
    id: "loan-against-property",
    title: "Loan Against Property",
    description: "Unlock the value of your property with high-value loans at competitive rates.",
    icon: Landmark,
    features: ["High loan amount", "Flexible usage", "Competitive rates"]
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Landmark className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">FinanceHub</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="#services" className="text-gray-600 hover:text-blue-600 transition">Services</Link>
            <Link href="#about" className="text-gray-600 hover:text-blue-600 transition">About</Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition">Contact</Link>
          </div>
          <Link
            href="#contact"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Your Trusted Financial Partner
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get instant approval on loans with competitive rates and flexible terms.
          We make financing simple and accessible for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#services"
            className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition text-lg font-semibold flex items-center justify-center gap-2"
          >
            Explore Services <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#contact"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition text-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quick Approval</h3>
              <p className="text-blue-100">Get approved in minutes, not days</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Rates</h3>
              <p className="text-blue-100">Competitive interest rates in the market</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Minimal Paperwork</h3>
              <p className="text-blue-100">Simple documentation process</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
              <p className="text-blue-100">Dedicated relationship managers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose from our wide range of financial products designed to meet your specific needs
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-8 border border-gray-100"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.id}`}
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Ready to get started? Contact us today and our experts will assist you
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="bg-blue-600 text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-blue-100">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-blue-100">info@financehub.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Landmark className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-blue-100">123 Finance Street, Mumbai</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form className="bg-white rounded-xl p-8 shadow-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Service Interest</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option>Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>{service.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Landmark className="h-6 w-6" />
                <span className="text-xl font-bold">FinanceHub</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for all financial needs.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#services" className="hover:text-white">Services</Link></li>
                <li><Link href="#about" className="hover:text-white">About Us</Link></li>
                <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/business-loan" className="hover:text-white">Business Loan</Link></li>
                <li><Link href="/services/personal-loan" className="hover:text-white">Personal Loan</Link></li>
                <li><Link href="/services/home-loan" className="hover:text-white">Home Loan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+91 98765 43210</li>
                <li>info@financehub.com</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
