'use client';
import React from 'react';

const faqs = [
  {
    question: "What is WiseUp?",
    answer:
      "WiseUp is a personal finance management tool that helps you track spending, manage transactions, and make smarter financial decisions.",
  },
  {
    question: "Is WiseUp free to use?",
    answer:
      "Yes, WiseUp offers a free tier with essential features. We also offer premium plans for users who want advanced insights and features.",
  },
  {
    question: "How do I connect my bank account?",
    answer:
      "Currently there is no feature of connecting a bank account but there will be soon.",
  },
  {
    question: "Can I use WiseUp on mobile?",
    answer:
      "Yes, WiseUp is fully responsive and works great on any device. A dedicated mobile app is also in the works!",
  },
  {
    question: "How secure is my data?",
    answer:
      "We take your privacy seriously. All data is encrypted and securely stored. We follow best practices in data protection and security.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-5 sm:px-10 lg:px-32 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-mitr font-bold text-center text-violet-600 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group border border-gray-200 rounded-lg p-5 bg-white"
            >
              <summary className="flex justify-between items-center cursor-pointer text-lg font-medium text-gray-800">
                {faq.question}
                <span className="ml-2 text-xl transition-transform group-open:rotate-180">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
