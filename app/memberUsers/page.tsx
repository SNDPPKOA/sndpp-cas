import { UserSideBar } from "@/components/userSideBar";
import DataPeopleUser from "./dataUserPeople";

export const runtime = "edge";

export default async function UserMemberPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold flex text-2xl">All Members</h1>
      <UserSideBar />
      <DataPeopleUser />
    </div>
  );
}
