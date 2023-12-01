import ReactDOM from "react-dom";

export const Portal : React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const portalRoot = document.getElementById("root") as HTMLElement;
  return ReactDOM.createPortal(children, portalRoot);
};
