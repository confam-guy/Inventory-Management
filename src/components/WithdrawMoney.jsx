import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../Components/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

const cards = [
  { id: 1, type: 'Visa', lastDigits: '9147', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
  { id: 2, type: 'Mastercard', lastDigits: '8947', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { id: 3, type: 'Visa', lastDigits: '5114', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
];

const WithdrawMoney = () => {
  const { currentUser } = useAuth();
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return toast.error('Enter a valid withdrawal amount');
    }

    const selected = cards.find((c) => c.id === selectedCard);

    try {
      setLoading(true);
      await addDoc(collection(db, 'withdrawals'), {
        userId: currentUser?.uid || 'anonymous',
        amount: parseFloat(amount),
        cardType: selected.type,
        lastDigits: selected.lastDigits,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });

      toast.success(`$${amount} withdrawal requested`);
      setAmount('');
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen font-sans">
      <Toaster position="top-right" />
      <Sidebar currentUser={currentUser} />

      <div className="flex-1 p-4 sm:p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Withdraw Money</h1>

        {/* Account Summary */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <p className="text-gray-600">Available Balance</p>
            <p className="text-3xl font-bold text-green-600">$425.35</p>
          </div>
          <p className="text-sm text-gray-400 mt-4 sm:mt-0">Last updated: 01 August 2025</p>
        </motion.div>

        {/* Card Selection */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select a card</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card.id)}
                className={`border rounded-lg p-4 flex items-center justify-between ${
                  selectedCard === card.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                } hover:border-blue-500`}
              >
                <div>
                  <p className="font-semibold text-gray-800">{card.type} Card</p>
                  <p className="text-sm text-gray-500">•••• {card.lastDigits}</p>
                </div>
                <img src={card.logo} alt={card.type} className="w-10 h-6 object-contain" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Withdrawal Form */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter amount to withdraw</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$0.00"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Withdraw Now'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
