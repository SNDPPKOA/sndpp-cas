
import InactiveMembersPage from "./inactiveMembers";
export const runtime = "edge";
export default async function Inactive() {

  return (
    <div className="container mx-auto py-10">
      <InactiveMembersPage/>
    </div>
  )
}



