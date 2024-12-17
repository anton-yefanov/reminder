import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import { reminderStorage } from '../../../packages/storage/lib/impl/remindersStorage';

const Popup = () => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  // Get reminders using useStorage
  const reminders = useStorage(reminderStorage);

  const handleAddReminder = async () => {
    if (!title || !time) {
      alert('Please enter both title and time!');
      return;
    }

    const newReminder = {
      id: '1',
      title,
      time,
    };

    await reminderStorage.addReminder(newReminder);
    setTitle('');
    setTime('');
  };

  const handleRemoveReminder = async (id: string) => {
    await reminderStorage.removeReminder(id);
  };

  return (
    <div className="flex flex-col w-64 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-lg font-semibold mb-4 text-center">Add Reminder</h1>

      {/* Title Input */}
      <label className="text-sm font-medium mb-1" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter reminder title"
        className="p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Time Input */}
      <label className="text-sm font-medium mb-1" htmlFor="time">
        Time
      </label>
      <input
        id="time"
        type="datetime-local"
        value={time}
        onChange={e => setTime(e.target.value)}
        className="p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Add Reminder Button */}
      <button
        onClick={handleAddReminder}
        className="btn bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors mb-4">
        Add Reminder
      </button>

      {/* Reminders List */}
      <div>
        <h2 className="text-md font-semibold mb-2">Reminders</h2>
        {reminders.length > 0 ? (
          <ul className="space-y-2">
            {reminders.map(reminder => (
              <li key={reminder.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                <div>
                  <div className="font-medium">{reminder.title}</div>
                  <div className="text-sm text-gray-500">{reminder.time}</div>
                </div>
                <button onClick={() => handleRemoveReminder(reminder.id)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No reminders added yet.</p>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
