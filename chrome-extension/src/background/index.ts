import 'webextension-polyfill';
import { reminderStorage } from '../../../packages/storage/lib/impl/remindersStorage';

// Background script logic
console.log('Background script loaded.');

// Function to check reminders and trigger notifications
async function checkReminders() {
  const reminders = await reminderStorage.get(); // Fetch reminders from storage
  const now = new Date();

  for (const reminder of reminders) {
    const reminderTime = new Date(reminder.time);
    // Check if the reminder time has passed and it's recent (within a 1 minute window)
    if (
      reminderTime <= now &&
      now.getTime() - reminderTime.getTime() <= 60000 // 1 minute tolerance
    ) {
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

// Set up periodic alarm to check reminders
chrome.alarms.create('checkReminders', { periodInMinutes: 0.5 });

// Listen for the alarm event
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'checkReminders') {
    console.log('Checking reminders...');
    checkReminders();
  }
});

// Optional: Check immediately on startup
checkReminders();
