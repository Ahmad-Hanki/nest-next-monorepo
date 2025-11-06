import { PropsWithChildren } from "react";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";

type Props = PropsWithChildren;
const NavbarContainer = (props: Props) => {
  return (
    <div className="relative">
      <DesktopNavbar>{props.children}</DesktopNavbar>
      <MobileNavbar>{props.children}</MobileNavbar>
    </div>
  );
};

export { NavbarContainer };
