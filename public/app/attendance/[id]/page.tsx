import { BackMember } from "@/components/ui/back-to-member";
import DataPeople from "./dataPeople";

export default async function id() {

  return (
    <div className="container mx-auto py-10">
         <BackMember />
      <DataPeople/>
    </div>
  )
}



