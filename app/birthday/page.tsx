import DataPeople from "./dataBirthday";
import NextMonthBirthday from "./nextMonthBirthday";
import DownloadBirthdayFile from "./DownloadBirthdayFile";
export const runtime = "edge";
export default async function Birthday() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end">
        <DownloadBirthdayFile />
      </div>

      <DataPeople />
      <NextMonthBirthday />
    </div>
  );
}
