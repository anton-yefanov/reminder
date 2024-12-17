import { createRoot } from 'react-dom/client';
import '@src/index.css';
import { Notification } from './Notification';

function init() {
  const notificationContainer = document.querySelector('#notification-root');
  if (!notificationContainer) {
    throw new Error('Can not find #notification-root');
  }
  const root = createRoot(notificationContainer);

  root.render(<Notification />);
}

init();
