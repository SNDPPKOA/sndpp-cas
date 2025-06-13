import { UserSideBar } from "@/components/userSideBar";
import ViewProfile from "@/components/viewProfile";
export const runtime = "edge";
export default function View() {
 
  return (
      <><UserSideBar /><ViewProfile /></>
 
  );
}
