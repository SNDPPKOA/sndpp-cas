
"use client";

import { useState } from "react";
import { BackMember } from "../../../components/ui/back-to-member";
import {
  Card,

} from "@/components/ui/card";
import Image from "next/image";

import { useMemo } from "react";


export function UserProfile({ user }: { user: any }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [monthJoin, setMonthJoin] = useState(user.monthJoin);
  const [yearJoin, setYearJoin] = useState(user.yearJoin);



  const joinDuration = useMemo(() => {
    if (!monthJoin || !yearJoin) return null;

    const joinDate = new Date(Number(yearJoin), Number(monthJoin) - 1); // Month is 0-indexed
    const now = new Date();

    const yearsDiff = now.getFullYear() - joinDate.getFullYear();
    const monthsDiff = now.getMonth() - joinDate.getMonth();

    const totalMonths = yearsDiff * 12 + monthsDiff;

    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;

    return `${displayYears} year(s), ${displayMonths} month(s)`;
  }, [monthJoin, yearJoin]);

  const allLiturgicalObjects = [
    { name: "Thurible and Boat", image: "/thuribleBoat.jpg" },
    { name: "Crucifix", image: "/crucifix.jpg" },
    { name: "Candles", image: "/candles.jpg" },
    { name: "Sanctus Bell", image: "/sanctus.jpg" },
    { name: "Solo Bell", image: "/soloBell.png" },
    { name: "Sanctuary Bell", image: "/sanctuaryBell.png" },
    { name: "Rotating Bell", image: "/rotatingBell.jpg" },
    { name: "Kampanaryo", image: "/kampanaryo.jpg" },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="p-6">
      <div className="flex gap-4">
        <BackMember />
      </div>
   
      <div className="flex flex-col mt-12 gap-4 ">
        <Card className="w-full flex  justify-between items-start p-2">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <Image
                className="rounded-full object-cover"
                src="/defaultProfile.png"
                alt="Profile picture"
                fill
                priority
              />
            </div>

            <div className="flex flex-col text-center sm:text-left">
              <h1 className="text-2xl font-bold mb-2">
                {firstName} {lastName}
              </h1>
              <p className="font-semibold">
                Birthday:{" "}
                {new Date(user.birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p className="font-semibold">Age: {user.age}</p>
            </div>
          </div>

   
        </Card>

        <div className=" w-full flex flex-col sm:flex-row gap-4">
          <Card className="w-full flex flex-col p-4">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-bold mb-12">Service Information</h1>
           
            </div>

            <div className="flex gap-4 mb-4">
              <p className="font-bold">Date of Join: </p>{" "}
              <p>
                {user.monthJoin ? monthNames[Number(user.monthJoin) - 1] : ""},{" "}
                {user.yearJoin}
              </p>
            </div>

            <div className="flex gap-4 mb-4">
              <p className="font-bold">Status: </p> <p>{user.memberStatus}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <p className="font-bold">Member for: </p>{" "}
              {joinDuration && <p>Member for: {joinDuration}</p>}
            </div>

            <div className="flex gap-4 mb-4">
              <p className="font-bold">Baptism: </p> <p>{user.baptism}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <p className="font-bold">First Communion: </p>{" "}
              <p>{user.communion}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <p className="font-bold">Kumpil:</p> <p> {user.kumpil}</p>
            </div>
          </Card>

        </div>

        {user.liturgicalObj && (
          <>
            <h1 className="text-2xl font-bold mb-4">Liturgical Objects</h1>

            <div className="flex gap-4 flex-col sm:flex-row flex-wrap">
              {allLiturgicalObjects
                .filter((obj) => {
                  const userObjects = Array.isArray(user.liturgicalObj)
                    ? user.liturgicalObj
                    : user.liturgicalObj
                        .split(",")
                        .map((item: string) => item.trim());

                  return userObjects.includes(obj.name);
                })
                .map((obj, index) => (
                  <Card
                    key={index}
                    className="flex justify-center items-center flex-col w-full sm:w-[48%] lg:w-[30%] p-4 rounded"
                  >
                    <Image
                      src={obj.image}
                      alt={obj.name}
                      width={100}
                      height={100}
                      className="rounded-t-lg"
                    />
                    <p className="mt-6">{obj.name}</p>
                  </Card>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
