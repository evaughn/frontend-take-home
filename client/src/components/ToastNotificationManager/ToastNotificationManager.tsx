import * as Toast from "@radix-ui/react-toast";
import React, { useEffect, useState } from "react";
import "./styles.css";

type NotificationToastProps = {
  content: Toast.ToastProps['content'];
  type: 'success' | 'error';
}

const NotificationToast: React.FC<NotificationToastProps> = ({ content, type }) => {
  return (
    <Toast.Root type="foreground" className={`ToastRoot ${type}`} duration={3000}>
      <Toast.Description className="ToastDescription">{content}</Toast.Description>
    </Toast.Root>
  );
};

NotificationToast.displayName = "NotificationToast";

class NotificationToastManager {
  private _toasts: React.ReactElement<typeof NotificationToast>[];
  public addEvent: string;

  constructor() {
    this._toasts = [];
    this.addEvent = 'toast:add';
  }

  get toasts(): typeof this._toasts {
    return this._toasts;
  }

  private dispatch = (eventName: string) => {
    window && window.dispatchEvent(new Event(eventName));
  }

  public notify = (newToastProps: NotificationToastProps): void => {
    this.toasts.push(<NotificationToast {...newToastProps} />);
    this.dispatch(this.addEvent);
  }
}

const notificationToastManager = new NotificationToastManager();

const Wrapper: React.FC<{ manager?: NotificationToastManager }> = ({ manager = notificationToastManager }) => {
  const [notificationToasts, setNotificationsToasts] = useState(manager.toasts);
  console.log(manager)

  useEffect(() => {
    const updateToasts = () => setNotificationsToasts(manager.toasts);
    window.addEventListener(manager.addEvent, updateToasts)
    return () => {
      window.removeEventListener(manager.addEvent, updateToasts)
    }
  }, [manager]);

  return (
    <>{notificationToasts.map((Toast) => Toast)}</>
  )
}

const ToastNotificationManager = {
  Provider: Toast.Provider,
  Viewport: Toast.Viewport,
  Main: Wrapper,
}

export default ToastNotificationManager;
export const { notify } = notificationToastManager;
