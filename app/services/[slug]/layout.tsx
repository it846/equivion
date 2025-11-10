import { Metadata } from "next";

// Service metadata configuration
const servicesMetadata: Record<string, {
  title: string;
  description: string;
  keywords: string[];
}> = {
  "business-loan": {
    title: "Business Loan - Competitive Rates & Quick Approval",
    description: "Get business loans up to ₹50 Crores with interest rates starting from 10.5%. Quick approval in 48 hours, flexible repayment up to 7 years. Minimal documentation required.",
    keywords: [
      "business loan",
      "business financing",
      "SME loan",
      "working capital loan",
      "business loan interest rate",
      "quick business loan approval",
      "business loan eligibility",
      "MSME loan",
      "business expansion loan",
      "machinery loan"
    ]
  },
  "personal-loan": {
    title: "Personal Loan - Instant Approval in 30 Minutes",
    description: "Get personal loans up to ₹25 lakhs instantly with rates from 10.99%. No collateral required, flexible EMI options. Apply online with minimal documentation.",
    keywords: [
      "personal loan",
      "instant personal loan",
      "personal loan online",
      "no collateral loan",
      "quick personal loan",
      "personal loan interest rate",
      "personal loan eligibility",
      "unsecured loan",
      "instant loan approval",
      "salary loan"
    ]
  },
  "balance-transfer": {
    title: "Loan Balance Transfer - Lower Interest Rates & Save More",
    description: "Transfer your existing loans and save on interest with lower rates. Reduce EMI burden, get top-up loans, and enjoy extended tenure options with no foreclosure charges.",
    keywords: [
      "balance transfer",
      "loan balance transfer",
      "home loan balance transfer",
      "personal loan balance transfer",
      "lower interest rate",
      "reduce EMI",
      "loan refinancing",
      "top-up loan",
      "loan consolidation",
      "switch loan"
    ]
  },
  "car-loan": {
    title: "Car Loan - Finance Your Dream Car at 8.5% Interest",
    description: "Get car loans with up to 90% financing at rates starting from 8.5%. Quick disbursal in 48 hours, flexible tenure up to 7 years for new and used cars.",
    keywords: [
      "car loan",
      "auto loan",
      "vehicle loan",
      "new car loan",
      "used car loan",
      "car loan interest rate",
      "car finance",
      "car loan eligibility",
      "quick car loan",
      "low interest car loan"
    ]
  },
  "home-loan": {
    title: "Home Loan - Make Your Dream Home Reality at 8.35%",
    description: "Get home loans up to ₹5 Crores with interest rates from 8.35%. Tenure up to 30 years, tax benefits up to ₹3.5 lakhs, and flexible prepayment options available.",
    keywords: [
      "home loan",
      "housing loan",
      "property loan",
      "home loan interest rate",
      "home loan eligibility",
      "tax benefits home loan",
      "home finance",
      "affordable housing loan",
      "home loan EMI calculator",
      "first time home buyer"
    ]
  },
  "loan-against-property": {
    title: "Loan Against Property - High Value Loans up to ₹10 Crores",
    description: "Get loans against property up to ₹10 Crores at 9.5% interest. Flexible tenure up to 15 years, quick approval, and minimal documentation for residential or commercial property.",
    keywords: [
      "loan against property",
      "property loan",
      "LAP",
      "mortgage loan",
      "secured loan",
      "loan against residential property",
      "loan against commercial property",
      "high value loan",
      "property mortgage",
      "collateral loan"
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const serviceMetadata = servicesMetadata[slug];

  // Default metadata if service not found
  if (!serviceMetadata) {
    return {
      title: "Service Not Found",
      description: "The requested service page could not be found.",
    };
  }

  return {
    title: serviceMetadata.title,
    description: serviceMetadata.description,
    keywords: serviceMetadata.keywords,
    alternates: {
      canonical: `https://equivion.in/services/${slug}`,
    },
    openGraph: {
      title: serviceMetadata.title,
      description: serviceMetadata.description,
      url: `https://equivion.in/services/${slug}`,
      siteName: 'Equivion',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `/og-${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: serviceMetadata.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: serviceMetadata.title,
      description: serviceMetadata.description,
      images: [`/twitter-${slug}.jpg`],
    },
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
  };
}

// Service-specific structured data
const servicesStructuredData: Record<string, any> = {
  "business-loan": {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Business Loan",
    "provider": {
      "@type": "FinancialService",
      "name": "Equivion LLP",
      "url": "https://equivion.in"
    },
    "areaServed": "IN",
    "description": "Get business loans up to ₹50 Crores with interest rates starting from 10.5%. Quick approval in 48 hours.",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "price": "10.5",
        "valueAddedTaxIncluded": false
      },
      "eligibleRegion": "IN"
    }
  },
  "personal-loan": {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Personal Loan",
    "provider": {
      "@type": "FinancialService",
      "name": "Equivion LLP",
      "url": "https://equivion.in"
    },
    "areaServed": "IN",
    "description": "Get personal loans up to ₹25 lakhs instantly with rates from 10.99%. No collateral required.",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "price": "10.99",
        "valueAddedTaxIncluded": false
      },
      "eligibleRegion": "IN"
    }
  },
  "balance-transfer": {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Loan Balance Transfer",
    "provider": {
      "@type": "FinancialService",
      "name": "Equivion LLP",
      "url": "https://equivion.in"
    },
    "areaServed": "IN",
    "description": "Transfer your existing loans and save on interest with lower rates and better terms.",
    "offers": {
      "@type": "Offer",
      "eligibleRegion": "IN"
    }
  },
  "car-loan": {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Car Loan",
    "provider": {
      "@type": "FinancialService",
      "name": "Equivion LLP",
      "url": "https://equivion.in"
    },
    "areaServed": "IN",
    "description": "Get car loans with up to 90% financing at rates starting from 8.5%.",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "price": "8.5",
        "valueAddedTaxIncluded": false
      },
      "eligibleRegion": "IN"
    }
  },
  "home-loan": {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Home Loan",
    "provider": {
      "@type": "FinancialService",
      "name": "Equivion LLP",
      "url": "https://equivion.in"
    },
    "areaServed": "IN",
    "description": "Get home loans up to ₹5 Crores with interest rates from 8.35%. Tenure up to 30 years.",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "price": "8.35",
        "valueAddedTaxIncluded": false
      },
      "eligibleRegion": "IN"
    }
  },
  "loan-against-property": {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Loan Against Property",
    "provider": {
      "@type": "FinancialService",
      "name": "Equivion LLP",
      "url": "https://equivion.in"
    },
    "areaServed": "IN",
    "description": "Get loans against property up to ₹10 Crores at 9.5% interest. Flexible tenure up to 15 years.",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "price": "9.5",
        "valueAddedTaxIncluded": false
      },
      "eligibleRegion": "IN"
    }
  }
};

export default async function ServiceLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const structuredData = servicesStructuredData[slug];

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      {children}
    </>
  );
}
