import * as Toast from "@radix-ui/react-toast";
import React, { useEffect, useState } from "react";
import "./styles.css";

type NotificationToastProps = {
  content: Toast.ToastProps['content'];
  type: 'success' | 'error';
}

const NotificationToast: React.FC<NotificationToastProps> = ({ content, type }) => {
  return (
    <Toast.Root type="foreground" className={`Toast ${type}`} duration={3000}>
      <Toast.Description>{content}</Toast.Description>
    </Toast.Root>
  );
};

NotificationToast.displayName = "NotificationToast";

class NotificationToastManager {
  public toasts: React.ReactElement<typeof NotificationToast>[];

  constructor() {
    this.toasts = [];
  }

  public notify(newToastProps: NotificationToastProps) {
    this.toasts.push(<NotificationToast {...newToastProps} />);
  }
}

const notificationToastManager = new NotificationToastManager();

const Wrapper: React.FC = () => {
  const manager = notificationToastManager;
  const [notificationToasts, setNotificationsToasts] = useState(manager.toasts);

  useEffect(() => {
    console.log('toast added')
    setNotificationsToasts(manager.toasts);
  }, [manager.toasts])

  return (
    <>{notificationToasts.map((toast) => toast)}</>
  )
}

const ToastNotificationManager = {
  Provider: Toast.Provider,
  Viewport: Toast.Viewport,
  Main: Wrapper
}

export const notify = notificationToastManager.notify;

export default ToastNotificationManager;
