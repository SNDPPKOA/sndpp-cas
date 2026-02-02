"use client";
import { Download } from "lucide-react";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
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

interface Person {
  firstName: string;
  lastName: string;
  birthdayRaw: string;
}

function isBirthdayInMonth(birthStr: string, month: number) {
  try {
    return new Date(birthStr).getMonth() === month;
  } catch {
    return false;
  }
}

function formatBirthday(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function sortByDayAscending(data: Person[]) {
  return [...data].sort((a, b) => {
    const dayA = new Date(a.birthdayRaw).getDate();
    const dayB = new Date(b.birthdayRaw).getDate();
    return dayA - dayB;
  });
}

export default function DownloadBirthdayFile() {
  const [thisMonth, setThisMonth] = useState<Person[]>([]);
  const [nextMonth, setNextMonth] = useState<Person[]>([]);

  const today = new Date();
  const currentMonth = today.getMonth();
  const upcomingMonth = (currentMonth + 1) % 12;

  const monthName = new Date(0, currentMonth).toLocaleString("default", {
    month: "long",
  });

  const nextMonthName = new Date(0, upcomingMonth).toLocaleString("default", {
    month: "long",
  });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "users"));

      const people: Person[] = snapshot.docs.map((doc) => {
        const user = doc.data();
        return {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          birthdayRaw: user.birthday || "",
        };
      });

      setThisMonth(
        people.filter((p) => isBirthdayInMonth(p.birthdayRaw, currentMonth)),
      );

      setNextMonth(
        people.filter((p) => isBirthdayInMonth(p.birthdayRaw, upcomingMonth)),
      );
    };

    fetchData();
  }, []);

  const buildTable = (title: string, data: Person[]) => {
    if (data.length === 0) return [];

    const sortedData = sortByDayAscending(data);

    const rows: TableRow[] = [
      // Header
      new TableRow({
        children: ["No.", "Name", "Birthday"].map(
          (text) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text, bold: true })],
                }),
              ],
            }),
        ),
      }),

      // Data
      ...sortedData.map(
        (p, i) =>
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph(String(i + 1))],
              }),
              new TableCell({
                children: [new Paragraph(`${p.firstName} ${p.lastName}`)],
              }),
              new TableCell({
                children: [new Paragraph(formatBirthday(p.birthdayRaw))],
              }),
            ],
          }),
      ),
    ];

    return [
      new Paragraph({
        children: [new TextRun({ text: title, bold: true })],
        spacing: { before: 400, after: 200 },
      }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows,
      }),
    ];
  };

  const downloadFile = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Birthday Celebrants",
                  bold: true,
                  size: 32,
                }),
              ],
              spacing: { after: 400 },
            }),

            ...buildTable(monthName, thisMonth),
            ...buildTable(nextMonthName, nextMonth),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    const safeFileName =
      `${monthName}_${nextMonthName}_Birthday_Celebrants`.replace(
        /[^a-z0-9]/gi,
        "_",
      );

    saveAs(blob, `${safeFileName}.docx`);
  };

  return (
    <button
      onClick={downloadFile}
      className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition"
    >
      <Download className="w-4 h-4" />
      Download File
    </button>
  );
}
