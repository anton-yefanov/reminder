import { useEffect } from 'react';

export const Notification = ({ title, message }: { title: string; message: string }) => {
  useEffect(() => {
    // Закриття вікна через 5 секунд
    const timer = setTimeout(() => {
      window.close();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};
