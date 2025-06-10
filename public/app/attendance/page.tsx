import { AttendanceList } from "@/components/attendanceList";

export default async function Attendance() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-xl sm:text-3xl md:text-4xl mb-4 text-center">
        Attendance Page (Admin)
      </h1>
      <AttendanceList />
    </div>
  );
}
