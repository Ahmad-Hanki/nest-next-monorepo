import { PropsWithChildren } from "react";
import { SideBar } from "./ui/side-bar";
import { LineSquiggle } from "lucide-react";

type Props = PropsWithChildren;
const MobileNavbar = (props: Props) => {
  return (
    <div className="md:hidden">
      <SideBar
        triggerIcon={<LineSquiggle className="w-4" />}
        triggerClassName="absolute top-2 left-2"
      >
        {props.children}
      </SideBar>
    </div>
  );
};

export { MobileNavbar };
