import 'webextension-polyfill';
import { reminderStorage } from '@extension/storage/lib/impl/remindersStorage';

async function checkReminders() {
  const reminders = await reminderStorage.get(); // Fetch reminders from storage
  const now = new Date();

  for (const reminder of reminders) {
    const reminderTime = new Date(reminder.time);
    const oneMinute = 60000;
    // Check if the reminder time has passed and it's recent (within a 1 minute window)
    if (reminderTime <= now && now.getTime() - reminderTime.getTime() <= oneMinute) {
      // Trigger notification
      chrome.notifications.create(
        `reminder-${reminder.id}`, // Unique ID for the notification
        {
          type: 'basic',
          iconUrl: 'icon-128.png', // Path to your extension icon
          title: 'Reminder',
          message: `It's time for: ${reminder.title}`,
        },
      );

      // Remove the reminder after showing it
      await reminderStorage.removeReminder(reminder.id);
    }
  }
}

chrome.alarms.create('checkReminders', { periodInMinutes: 0.5 });

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'checkReminders') {
    checkReminders();
  }
});

checkReminders();
