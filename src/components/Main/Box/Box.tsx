import { ReactNode } from "react";

interface IsChildrenMain {
  children: ReactNode;
}
function Box({ children }: IsChildrenMain) {
  return <div className="box">{children}</div>;
}

export default Box;
