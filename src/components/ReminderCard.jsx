import React, { useState } from 'react';
import { FiTrash2, FiEdit3, FiCheck, FiX } from 'react-icons/fi';

const ReminderCard = ({ reminder, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState({
    title: reminder.title,
    description: reminder.description,
    date: reminder.date
  });

  const handleSave = () => {
    onUpdate(reminder.id, edited);
    setEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative hover:shadow-lg transition">
      {editing ? (
        <div className="space-y-2">
          <input
            className="w-full border p-2 rounded"
            value={edited.title}
            onChange={(e) => setEdited({ ...edited, title: e.target.value })}
          />
          <textarea
            className="w-full border p-2 rounded"
            value={edited.description}
            onChange={(e) => setEdited({ ...edited, description: e.target.value })}
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={edited.date}
            onChange={(e) => setEdited({ ...edited, date: e.target.value })}
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleSave} className="text-green-600">
              <FiCheck />
            </button>
            <button onClick={() => setEditing(false)} className="text-gray-500">
              <FiX />
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => onDelete(reminder.id)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          >
            <FiTrash2 />
          </button>
          <button
            onClick={() => setEditing(true)}
            className="absolute top-2 left-2 text-blue-600 hover:text-blue-800"
          >
            <FiEdit3 />
          </button>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{reminder.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{reminder.description}</p>
          <p className="text-sm text-blue-600 font-medium">Due: {reminder.date}</p>
        </>
      )}
    </div>
  );
};

export default ReminderCard;
