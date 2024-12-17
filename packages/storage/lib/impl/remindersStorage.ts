import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

export type Reminder = {
  id: string; // Unique ID for identifying reminders
  title: string;
  time: string;
};

type ReminderStorage = BaseStorage<Reminder[]> & {
  addReminder: (reminder: Reminder) => Promise<void>;
  removeReminder: (id: string) => Promise<void>;
};

const storage = createStorage<Reminder[]>('reminders-storage-key', [], {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// Extended storage for reminders
export const reminderStorage: ReminderStorage = {
  ...storage,
  addReminder: async (reminder: Reminder) => {
    await storage.set(currentReminders => {
      return [...currentReminders, reminder];
    });
  },
  removeReminder: async (id: string) => {
    await storage.set(currentReminders => {
      return currentReminders.filter(reminder => reminder.id !== id);
    });
  },
};
