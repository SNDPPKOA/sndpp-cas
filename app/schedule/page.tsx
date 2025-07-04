import ScheduleMaker from "@/components/scheduleMaker";

export const runtime = "edge";
export default function Schedule() {
  return (
    <div className="flex flex-wrap flex-col gap-4 p-6 md:p-10">
      <h1 className="font-bold text-2xl">Mass Schedule</h1>
      <ScheduleMaker/>
    </div>
  );
}
