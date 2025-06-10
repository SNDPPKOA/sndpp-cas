"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { People, columns } from "./columns"
import { DataTable } from "./data-table"

function calculateAge(birthdayString: string): number {
  const birthDate = new Date(birthdayString)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age

}


export default function DataPeople() {
  const [data, setData] = useState<People[]>([])


  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"))
      const usersData: People[] = querySnapshot.docs.map((doc) => {
        const user = doc.data()
        const birthday = user.birthday || ""
        const age = birthday ? calculateAge(birthday) : 0
        return {
          id: doc.id,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          memberStatus: user.memberStatus || "",
          age: age.toString(), 
          birthday: birthday,
          liturgicalObj: Array.isArray(user.liturgicalObj) ? user.liturgicalObj : [],

        }
      })
      setData(usersData)
    }

    fetchData()
  }, [])


  return <DataTable columns={columns} data={data} />


}
