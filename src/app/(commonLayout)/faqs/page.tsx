import React from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept PayFast (cards, Instant EFT, SnapScan) and Yoco.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "2–4 business days for major centers, and 3–7 business days for outlying areas.",
    },
    {
      question: "Can I return items?",
      answer:
        "Yes, items can be returned within 7 days if unused and unopened. Cut-to-length cables are excluded.",
    },
    {
      question: "Do you offer trade pricing?",
      answer:
        "Yes, approved trade customers qualify for tiered discounts.",
    },
    {
      question: "Do your products come with warranty?",
      answer:
        "Yes, most products come with a 12–24 month manufacturer warranty.",
    },
  ];

  return (
    <div className="min-h-screen  py-12 px-4 md:px-10 lg:px-20 mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
