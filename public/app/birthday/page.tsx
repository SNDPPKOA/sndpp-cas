import DataPeople from "./dataBirthday";
import NextMonthBirthday from "./nextMonthBirthday";

export default async function Birthday() {

  return (
    <div className="container mx-auto py-10">
      <DataPeople/>
      <NextMonthBirthday/>
    </div>
  )
}



