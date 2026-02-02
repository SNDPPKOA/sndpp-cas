"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  baptism?: string;
  communion?: string;
  kumpil?: string;
}

export default function DownloadSacramentsFile() {
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const users: Person[] = snapshot.docs.map((doc) => {
        const user = doc.data();
        const birthday = user.birthday || "";
        const age = birthday ? new Date().getFullYear() - new Date(birthday).getFullYear() : 0;
        return {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          age,
          baptism: user.baptism || "No",
          communion: user.communion || "No",
          kumpil: user.kumpil || "No",
        };
      });
      setData(users);
    };
    fetchData();
  }, []);

  const downloadFile = async () => {
    // ... your table generation logic here (same as before)
    if (!data.length) return;

    const noBaptism = data.filter((p) => p.baptism === "No");
    const noCommunion = data.filter((p) => p.communion === "No");
    const noKumpil = data.filter((p) => p.kumpil === "No");

    const buildTable = (title: string, data: Person[]) => {
      if (!data.length) return [];
      const rows: TableRow[] = [
        new TableRow({
          children: ["No.", "Name", "Age"].map(
            (text) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text, bold: true })] })],
              }),
          ),
        }),
        ...data.map(
          (p, i) =>
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph(String(i + 1))] }),
                new TableCell({ children: [new Paragraph(`${p.firstName} ${p.lastName}`)] }),
                new TableCell({ children: [new Paragraph(String(p.age))] }),
              ],
            }),
        ),
      ];
      return [
        new Paragraph({ children: [new TextRun({ text: title, bold: true })], spacing: { before: 400, after: 200 } }),
        new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }),
      ];
    };

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: "Sacraments - Missing Records", bold: true, size: 32 })], spacing: { after: 400 } }),
            ...buildTable("No Baptism", noBaptism),
            ...buildTable("No First Communion", noCommunion),
            ...buildTable("No Kumpil", noKumpil),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Sacraments_Missing_Records.docx");
  };

  return (
    <Button
      onClick={downloadFile}
      className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition"
    >
      <Download className="w-4 h-4" />
      Download File
    </Button>
  );
}
