import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.equivion.in'),
  title: {
    default: "Equivion - Your Trusted Financial Partner | All Types of Loans",
    template: "%s | Equivion"
  },
  description: "Get instant approval on loans with competitive rates and flexible terms. We offer business loans, personal loans, home loans, car loans, balance transfer, and loan against property with quick processing.",
  keywords: [
    "loans",
    "business loan",
    "personal loan",
    "home loan",
    "car loan",
    "loan against property",
    "balance transfer",
    "EMI calculator",
    "instant loan approval",
    "low interest rate",
    "financial services",
    "loan eligibility",
    "quick loan processing",
    "competitive interest rates",
    "flexible loan terms",
    "Equivion"
  ],
  authors: [{ name: "Equivion LLP" }],
  creator: "Equivion LLP",
  publisher: "Equivion LLP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://equivion.in',
    siteName: 'Equivion',
    title: 'Equivion - Your Trusted Financial Partner | All Types of Loans',
    description: 'Get instant approval on loans with competitive rates and flexible terms. Business loans, personal loans, home loans, car loans, and more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Equivion Financial Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equivion - Your Trusted Financial Partner',
    description: 'Get instant approval on loans with competitive rates and flexible terms.',
    images: ['/twitter-image.jpg'],
    creator: '@equivion',
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://equivion.in',
  },
  category: 'Finance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for Organization
  const organizationSchema = {
    // "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Equivion LLP",
    "alternateName": "Equivion",
    "url": "https://www.equivion.in/",
    "logo": "hhttps://www.equivion.in//logo.png",
    "description": "Leading financial services provider offering business loans, personal loans, home loans, car loans, balance transfer, and loan against property with competitive rates and quick approval.",
    "email": "info@equivion.in",
    "telephone": "+91-98765-43210",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra"
    },
    "sameAs": [
      "https://www.facebook.com/equivion",
      "https://www.twitter.com/equivion",
      "https://www.linkedin.com/company/equivion",
      "https://www.instagram.com/equivion"
    ],
    "areaServed": "IN",
    "priceRange": "₹₹",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Financial Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Loan",
            "description": "Quick business loans up to ₹50 Crores with competitive rates"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Personal Loan",
            "description": "Instant personal loans up to ₹25 lakhs with no collateral"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Loan",
            "description": "Home loans up to ₹5 Crores with tax benefits"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Car Loan",
            "description": "Car financing up to 90% with flexible tenure"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Balance Transfer",
            "description": "Lower your loan interest rates with balance transfer"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Loan Against Property",
            "description": "High value loans up to ₹10 Crores against property"
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
