"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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
  Mail,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import EMICalculator from "./components/EMICalculator";

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

const heroSlides = [
  {
    id: 1,
    title: "Turn Your Dreams Into Reality",
    subtitle: "Get instant loan approval with competitive rates",
    description: "Whether it's a new home, car, or business - we're here to help you achieve your goals.",
    cta: "Apply Now",
    bgGradient: "from-blue-600 to-blue-800",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Business Growth Made Easy",
    subtitle: "Fuel your business with flexible financing",
    description: "Quick approval, minimal documentation, and competitive rates for your business expansion.",
    cta: "Explore Business Loans",
    bgGradient: "from-purple-600 to-purple-800",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Your Dream Home Awaits",
    subtitle: "Affordable home loans with low interest rates",
    description: "Make your dream of owning a home come true with our hassle-free home loan solutions.",
    cta: "Get Home Loan",
    bgGradient: "from-green-600 to-green-800",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop"
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.jpeg"
              alt="Equivion LLP Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-gray-900">Equivion</span>
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1">
                Services
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      <div className="font-semibold">{service.title}</div>
                      <div className="text-sm text-gray-500 truncate">{service.description.substring(0, 50)}...</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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

      {/* Hero Slider Section */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-90`}></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl text-white">
                  <p className="text-xl md:text-2xl mb-4 font-semibold opacity-90">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl">
                    {slide.description}
                  </p>
                  <Link
                    href="#services"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition text-lg font-semibold shadow-lg"
                  >
                    {slide.cta} <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-600 text-white py-20 mt-0">
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
      <section id="services" className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of financial products designed to meet your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const gradients = [
                "from-blue-500 to-blue-600",
                "from-purple-500 to-purple-600",
                "from-green-500 to-green-600",
                "from-orange-500 to-orange-600",
                "from-pink-500 to-pink-600",
                "from-indigo-500 to-indigo-600"
              ];
              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${gradients[index]} p-6 text-white`}>
                    <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {service.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition group-hover:gap-3"
                    >
                      Learn More <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section id="emi-calculator" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            EMI Calculator
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your monthly loan payments instantly. Use our interactive calculator to plan your finances better.
          </p>
        </div>
        <EMICalculator />
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
                      <p className="text-blue-100">info@equivion.com</p>
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
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/logo.jpeg"
                  alt="Equivion LLP Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-xl font-bold">Equivion</span>
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
                <li>info@equivion.com</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Equivion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
