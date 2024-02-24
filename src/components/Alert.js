import { Notification, toaster } from "rsuite";

function Alert({ children, type }) {
  return toaster.push(
    <Notification type={type} header={type}>
      {children}
    </Notification>,
    {
      duration: 4000,
    }
  );
}

export default Alert;
