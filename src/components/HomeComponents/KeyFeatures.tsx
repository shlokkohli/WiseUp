import React from 'react';
import { BarChart3, Sparkles, PiggyBank, CalendarClock } from 'lucide-react';
import FeatureCard from './FeatureCard';

const KeyFeatures = () => {
  const features = [
    {
      title: "Interactive Visualizations",
      description: "Transform complex financial data into beautiful, interactive charts that reveal spending patterns and growth opportunities at a glance.",
      icon: <BarChart3 size={24} />,
      color: "bg-primary-100 text-primary-700",
      delay: 0,
    },
    {
      title: "AI-Powered Insights",
      description: "Let our smart AI analyze your transactions to find savings opportunities, unusual spending, and personalized financial advice.",
      icon: <Sparkles size={24} />,
      color: "bg-secondary-100 text-secondary-700",
      delay: 100,
    },
    {
      title: "Monthly Budget Tracking",
      description: "Create custom budgets for different categories and track your progress with visual indicators that keep you accountable.",
      icon: <PiggyBank size={24} />,
      color: "bg-success-50 text-success-900",
      delay: 200,
    },
    {
      title: "Recurring Payments",
      description: "Never miss a bill again. Set up and manage recurring payments with smart reminders and automatic categorization.",
      icon: <CalendarClock size={24} />,
      color: "bg-accent-100 text-accent-700",
      delay: 300,
    },
  ];

  return (
    <section id='features' className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-mitr font-semibold md:text-4xl text-violet-600  mb-4">Powerful Features for Complete Financial Control</h2>
          <p className="text-lg text-neutral-600">Everything you need to manage, analyze, and optimize your finances in one elegant platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              colorClass={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;