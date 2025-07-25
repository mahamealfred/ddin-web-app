'use client';
import React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Phone,
  FileText,
  Tv,
  MessageSquare,
  Globe,
  Building2,
  Landmark,
  Banknote,
  ShieldCheck,
} from 'lucide-react';
import ElectricityPayment from './payment-services/electricity/page';
import RraPayment from './payment-services/rra/page';
import BulkSmsForm from './payment-services/bulk-sms/page';
import AirtimePurchase from './payment-services/airtme/page';
import StartimesPayment from './payment-services/startime/page';

type PaymentService = {
  name: string;
  icon: React.ElementType;
  content: string | React.ReactElement;

};

type AgencyBankingService = {
  name: string;
  icon: React.ElementType;
};

// List of services
const paymentServices: PaymentService[] = [
  { name: 'Electricity Payment', icon: Zap, content: <ElectricityPayment /> },
  { name: 'RRA Payment', icon: FileText, content: <RraPayment/> },
  { name: 'Buy Airtime', icon: Phone, content: <AirtimePurchase/> },
  { name: 'Startimes Payment', icon: Tv, content: <StartimesPayment/>},
  { name: 'Bulk SMS', icon: MessageSquare, content: <BulkSmsForm/> },
  { name: 'Irembo Pay', icon: Globe, content: 'Irembo Pay Form' },
];

const agencyBankingServices: AgencyBankingService[] = [
  { name: 'Ecobank', icon: Banknote },
  { name: 'Bank of Kigali', icon: Building2 },
  { name: 'Equity Bank', icon: Landmark },
  { name: 'GT Bank', icon: ShieldCheck },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardHome() {
  const [selectedService, setSelectedService] = useState<PaymentService | null>(null);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10"
    >
      {/* Dialog */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-lg w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedService.name}
              </h3>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="text-gray-800 dark:text-gray-100">
              {typeof selectedService.content === 'string' ? (
                <p>{selectedService.content}</p>
              ) : (
                selectedService.content
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Services */}
      <section>
        <h2 className="text-2xl font-bold mb-4  text-gray-900 dark:text-white text-center">
          Payment Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paymentServices.map(({ name, icon: Icon, content }) => (
            <motion.div
              key={name}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-4 transition-all duration-300 ease-in-out"
              onClick={() => setSelectedService({ name, icon: Icon, content })}
            >
              <div className="flex flex-col items-start gap-3 group cursor-pointer">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full group-hover:rotate-6 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-base font-medium text-gray-800 dark:text-white group-hover:underline">
                  {name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Agency Banking */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Agency Banking
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {agencyBankingServices.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-4 transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-col items-start gap-3 group">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full group-hover:rotate-6 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-base font-medium text-gray-800 dark:text-white group-hover:underline">
                  {name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
