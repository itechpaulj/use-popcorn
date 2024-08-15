import { ReactNode } from "react";

interface IsChildrenMain {
  children: ReactNode;
}
/** Parent [Main] Movie */
function Main({ children }: IsChildrenMain) {
  return <main className="main">{children}</main>;
}
export default Main;
