// import DataPeople from "./dataPeople";
// import { Download } from "lucide-react";
// export const runtime = "edge";
// export default async function DemoPage() {
//   return (
//     <div className="container mx-auto py-10">
//       <div className="flex justify-end">
//         <button className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition">
//           <Download className="w-4 h-4" />
//           Download File
//         </button>
//       </div>
//       <h1 className="font-bold text-2xl">Sacraments</h1>
//       <DataPeople />
//     </div>
//   );
// }

import DataPeople from "./dataPeople";
import DownloadSacramentsFile from "./DownloadSacramentsFile";

export const runtime = "edge";

export default function DemoPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <DownloadSacramentsFile /> {/* client component */}
      </div>
      <h1 className="font-bold text-2xl mb-4">Sacraments</h1>
      <DataPeople />
    </div>
  );
}

