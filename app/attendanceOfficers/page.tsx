import { AttendanceListOfficers } from "@/components/attendanceListOfficers";
import { Logout } from "@/components/ui/lougoutButton";

export default async function AttendanceOfficers() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="font-bold text-xl sm:text-3xl md:text-4xl mb-4 text-center">
        Attendance Page (Officers Only)
      </h1>

      <div className="flex ">
        <Logout />
      </div>

      <AttendanceListOfficers />
    </div>
  );
}
