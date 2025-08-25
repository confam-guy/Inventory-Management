import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../Components/AuthContext';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import ReminderCard from '../components/ReminderCard';
// import { db } from '../firebase'; // ✅ Make sure this import is correct

const Reminder = () => {
  const { currentUser } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // ✅ Fetch reminders on page load
  useEffect(() => {
    const fetchReminders = async () => {
      if (!currentUser?.uid) return;
      try {
        const q = query(collection(db, 'reminders'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setReminders(data);
      } catch (error) {
        toast.error('Failed to load reminders');
      }
    };

    fetchReminders();
  }, [currentUser]);

  // ✅ Add reminder
  const handleAddReminder = async (e) => {
    e.preventDefault();
    if (!title || !date) {
      toast.error('Title and date are required');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'reminders'), {
        userId: currentUser.uid,
        title,
        description,
        date,
        createdAt: serverTimestamp()
      });

      setReminders((prev) => [
        ...prev,
        { id: docRef.id, title, description, date }
      ]);

      toast.success('Reminder added');
      setTitle('');
      setDescription('');
      setDate('');
    } catch (error) {
      toast.error('Failed to add reminder');
    }
  };

  // ✅ Delete reminder
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'reminders', id));
      setReminders((prev) => prev.filter((r) => r.id !== id));
      toast.success('Deleted');
    } catch (error) {
      toast.error('Error deleting reminder');
    }
  };

  // ✅ Update reminder
  const handleUpdate = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'reminders', id), updatedData);
      setReminders((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
      );
      toast.success('Updated');
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Reminders</h1>

        {/* Add Reminder Form */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleAddReminder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
                placeholder="Optional description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Reminder
            </button>
          </form>
        </motion.div>

        {/* Reminder List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <p className="text-gray-600">No reminders found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reminder;
