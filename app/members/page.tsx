import DataPeople from "./dataPeople";
export const runtime = "edge";
export default async function DemoPage() {

  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-2xl">All Members</h1>
      <DataPeople/>
    </div>
  )
}



