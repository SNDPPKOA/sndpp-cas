"use client"

import { Calendar } from "@/components/ui/calendar"
import React from "react"


export function CalendarPicker() {

    const [date, setDate] = React.useState<Date | undefined>(new Date())
      return (

        <div className="w-full">
           <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full"
            />
        </div>


      )
}