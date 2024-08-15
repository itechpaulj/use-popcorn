import { ReactNode } from "react";

interface IsChildrenNav {
  children: ReactNode;
}
function Nav({ children }: IsChildrenNav) {
  return <nav className="nav-bar">{children}</nav>;
}

export default Nav;
