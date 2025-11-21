import React from "react";

export default function PolicyPage() {
  const sections = [
    {
      title: "Shipping Policy",
      content:
        "We deliver nationwide using trusted courier partners (Courier Guy, Fastway, CourierIT). Standard delivery takes 2–4 business days in major centers and 3–7 days in outlying areas. Bulky items such as distribution boards and cable drums may carry a handling surcharge. Delivery fees are calculated at checkout based on weight, dimensions, and region. We currently do not offer international shipping.",
    },
    {
      title: "Returns & Warranty Policy",
      content:
        "If you are not satisfied with your purchase, you may return unused and unopened items within 7 days for a refund or exchange. Electrical consumables and cut-to-length cables are non-returnable unless faulty. All products are covered by the manufacturer’s warranty (typically 12–24 months). Warranty claims require proof of purchase and may involve inspection before approval.",
    },
    {
      title: "Privacy Policy (POPIA Compliance)",
      content:
        "We respect your privacy and comply with the Protection of Personal Information Act (POPIA). We collect customer information only to process orders, manage accounts, and communicate offers. We will never sell or share your information without consent. You may request access, correction, or deletion of your data at any time by contacting our Information Officer.",
    },
    {
      title: "Terms & Conditions",
      content:
        `By using lumoelectrical.co.za, you agree to the following terms:\n- All orders are subject to stock availability and acceptance.\n- Prices include VAT unless otherwise stated.\n- Errors and omissions excepted (E&OE).\n- Risk in goods passes to the customer upon delivery.\n- Lumo Electrical is not liable for indirect or consequential damages.\n- Disputes will be handled under South African law.`,
    },
  ];

  return (
    <div className="min-h-screen  py-12 px-4 md:px-10 lg:px-20 mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Policies</h1>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
