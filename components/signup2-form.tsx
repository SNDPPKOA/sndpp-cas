// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// import { Label } from "@/components/ui/label";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export function SignUpForm2({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"form">) {

//   const router = useRouter();
//   const [form, setForm] = useState({
//     monthJoin: "",
//     yearJoin: "",
//     memberStatus: "",
//     liturgicalObj: [] as string[],
//     baptism: "",
//     communion: "",
//     kumpil: "",
//   });

//   const toggleCheckBox = (value: string) => {
//     setForm((prev) => ({
//       ...prev,
//       liturgicalObj: prev.liturgicalObj.includes(value)
//         ? prev.liturgicalObj.filter((t) => t !== value)
//         : [...prev.liturgicalObj, value],
//     }));
//   };
//   const handleNext = (e: React.FormEvent) => {
//     e.preventDefault();
//     const prevData = JSON.parse(localStorage.getItem("signupData") || "{}");
//     const mergedData = { ...prevData, ...form };
//     localStorage.setItem("signupData", JSON.stringify(mergedData));

//     router.push("/signup3");
//   };

//   return (
//     <form
//       className={cn("flex flex-col justify-center gap-6 ", className)}
//       {...props}
//       onSubmit={handleNext}
//     >
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl text-muted-foreground font-bold">
//           CREATE YOUR ACCOUNT
//         </h1>
//         <p className="text-xl  font-semibold">Service Information</p>
//       </div>

//       <div className="flex justify-between items-center gap-1">
//         <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//         <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//         <div className="bg-[#FEFEFE] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//       </div>

//       <div className="grid gap-6">
//         <Label htmlFor="dateJoin">Date of Join</Label>
//         <div className=" flex flex-col sm:flex-row  justify-between  gap-2">
//           <select
//             id="monthJoin"
//             name="monthJoin"
//             value={form.monthJoin}
//             onChange={(e) => setForm({ ...form, monthJoin: e.target.value })}
//             className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white"
//           >
//             <option value="">-- Choose Month --</option>
//             <option value="01">January</option>
//             <option value="02">February</option>
//             <option value="03">March</option>
//             <option value="04">April</option>
//             <option value="05">May</option>
//             <option value="06">June</option>
//             <option value="07">July</option>
//             <option value="08">August</option>
//             <option value="09">September</option>
//             <option value="10">October</option>
//             <option value="11">November</option>
//             <option value="12">December</option>
//           </select>

//           <select
//             id="yearJoin"
//             name="yearJoin"
//             value={form.yearJoin}
//             onChange={(e) => setForm({ ...form, yearJoin: e.target.value })}
//             className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white"
//             required
//           >
//             <option value="">-- Choose Year --</option>
//             {Array.from(
//               { length: new Date().getFullYear() - 1998 + 1 },
//               (_, i) => {
//                 const year = 1998 + i;
//                 return (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 );
//               }
//             )}
//           </select>
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="lastName">Member Status</Label>
//           <select
//             id="memberStatus"
//             name="memberStatus"
//             value={form.memberStatus}
//             onChange={(e) => setForm({ ...form, memberStatus: e.target.value })}
//             required
//             className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white"
//           >
//             <option value="">-- Choose Status --</option>
//             <option value="Aspirant">Aspirant</option>
//             <option value="Neophytes">Neophytes</option>
//             <option value="Junior">Junior</option>
//             <option value="Senior">Senior</option>
//           </select>
//         </div>

//         <Label htmlFor="object">Liturgical Object you used</Label>
//         <div className="grid gap-2">
//           <div className="flex flex-row justify-between items-center">
//             <div className="flex items-center gap-1">
//               <input
//                 type="checkbox"
//                 checked={form.liturgicalObj.includes("Crucifix")}
//                 onChange={() => toggleCheckBox("Crucifix")}
//                 id="crucifix"
//                 name="crucifix"
//                 className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Crucifix
//               </p>
//             </div>
//             <div className="flex items-center gap-1">
//               <input
//                 type="checkbox"
//                 checked={form.liturgicalObj.includes("Thurible and Boat")}
//                 onChange={() => toggleCheckBox("Thurible and Boat")}
//                 id="thuribleBoat"
//                 name="thuribleBoat"
//                 className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Thurible and Boat
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-row justify-between items-center">
//             <div className="flex items-center gap-1">
//               <input
//                 type="checkbox"
//                 checked={form.liturgicalObj.includes("Candles")}
//                 onChange={() => toggleCheckBox("Candles")}
//                 id="candles"
//                 name="candles"
//                 className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Candles
//               </p>
//             </div>
//             <div className="flex items-center gap-1 ">
//               <input
//                 type="checkbox"
//                 checked={form.liturgicalObj.includes("Sanctuary Bell")}
//                 onChange={() => toggleCheckBox("Sanctuary Bell")}
//                 id="sanctuary"
//                 name="sanctuary"
//                 className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Sanctuary Bell
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-row justify-between items-center">
//             <div className="flex items-center gap-1">
//               <input
//                 type="checkbox"
//                 checked={form.liturgicalObj.includes("Rotating Bell")}
//                 onChange={() => toggleCheckBox("Rotating Bell")}
//                 id="rotating"
//                 name="rotating"
//                 className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Rotating Bell
//               </p>
//             </div>
//             <div className="flex items-center gap-1 ">
//               <input
//                 type="checkbox"
//                 checked={form.liturgicalObj.includes("Sanctus Bell")}
//                 onChange={() => toggleCheckBox("Sanctus Bell")}
//                 id="sanctus"
//                 name="sanctus"
//                 className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Sanctus Bell
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-row justify-between items-center">
//             <div className="flex items-center gap-1">
//               <input
//                 type="checkbox"
//                 checked={form.liturgicalObj.includes("Kampanaryo")}
//                 onChange={() => toggleCheckBox("Kampanaryo")}
//                 id="kampanaryo"
//                 name="kampanaryo"
//                 className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Kampanaryo
//               </p>
//             </div>
//             <div className="flex items-center gap-1 ">
//               <input
//                 type="checkbox"
//                 checked={form.liturgicalObj.includes("Solo Bell")}
//                 onChange={() => toggleCheckBox("Solo Bell")}
//                 id="solo"
//                 name="solo"
//                 className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//               />
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 Solo Bell
//               </p>
//             </div>
//           </div>
//         </div>

//         <label htmlFor="baptism-yes">Have Baptism?</label>
//         <div className="flex justify-center items-center gap-4">
//           <div className="flex gap-2">
//             <label htmlFor="baptism-yes">Yes</label>
//             <input
//               type="radio"
//               id="baptism-yes"
//               name="baptism"
//               value="Yes"
//               checked={form.baptism === "Yes"}
//               onChange={(e) => setForm({ ...form, baptism: e.target.value })}
//               required
//               className="w-[20px]"
//             />
//           </div>

//           <div className="flex gap-2">
//             <label htmlFor="baptism-no">No</label>
//             <input
//               type="radio"
//               id="baptism-no"
//               name="baptism"
//               value="No"
//               checked={form.baptism === "No"}
//               onChange={(e) => setForm({ ...form, baptism: e.target.value })}
//               required
//               className="w-[20px]"
//             />
//           </div>
//         </div>

//         <label htmlFor="communion-yes">Have First Communion?</label>
//         <div className="flex justify-center items-center gap-4">
//           <div className="flex gap-2">
//             <label htmlFor="communion-yes">Yes</label>
//             <input
//               type="radio"
//               id="communion-yes"
//               name="communion"
//               value="Yes"
//               checked={form.communion === "Yes"}
//               onChange={(e) => setForm({ ...form, communion: e.target.value })}
//               required
//               className="w-[20px]"
//             />
//           </div>

//           <div className="flex gap-2">
//             <label htmlFor="communion-no">No</label>
//             <input
//               type="radio"
//               id="communion-no"
//               name="communion"
//               value="No"
//               checked={form.communion === "No"}
//               onChange={(e) => setForm({ ...form, communion: e.target.value })}
//               required
//               className="w-[20px]"
//             />
//           </div>
//         </div>

//         <label htmlFor="kumpil-yes">Have Kumpil?</label>
//         <div className="flex justify-center items-center gap-4">
//           <div className="flex gap-2">
//             <label htmlFor="kumpil-yes">Yes</label>
//             <input
//               type="radio"
//               id="kumpil-yes"
//               name="kumpil"
//               value="Yes"
//               checked={form.kumpil === "Yes"}
//               onChange={(e) => setForm({ ...form, kumpil: e.target.value })}
//               required
//               className="w-[20px]"
//             />
//           </div>

//           <div className="flex gap-2">
//             <label htmlFor="kumpil-no">No</label>
//             <input
//               type="radio"
//               id="kumpil-no"
//               name="kumpil"
//               value="No"
//               checked={form.kumpil === "No"}
//               onChange={(e) => setForm({ ...form, kumpil: e.target.value })}
//               required
//               className="w-[20px]"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
//           <Button type="submit" className="flex-1">
//             Back
//           </Button>

//           <Button type="submit" className="flex-1  bg-[#972D06] text-[#FEFEFE]">
//             Next
//           </Button>
//         </div>
//       </div>
//       <div className="text-center text-sm">
//         Don&apos;t have an account?{" "}
//         <a href="./login" className="underline underline-offset-4">
//           Sign up
//         </a>
//       </div>
//     </form>
//   );
// }

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ✅ Sanitize basic input to prevent script injection
function sanitizeInput(str: string) {
  return str.replace(/[<>]/g, "").trim();
}

export function SignUpForm2({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const [form, setForm] = useState({
    monthJoin: "",
    yearJoin: "",
    memberStatus: "",
    liturgicalObj: [] as string[],
    baptism: "",
    communion: "",
    kumpil: "",
  });

  const toggleCheckBox = (value: string) => {
    setForm((prev) => ({
      ...prev,
      liturgicalObj: prev.liturgicalObj.includes(value)
        ? prev.liturgicalObj.filter((t) => t !== value)
        : [...prev.liturgicalObj, value],
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedForm = {
      ...form,
      monthJoin: sanitizeInput(form.monthJoin),
      yearJoin: sanitizeInput(form.yearJoin),
      memberStatus: sanitizeInput(form.memberStatus),
      baptism: sanitizeInput(form.baptism),
      communion: sanitizeInput(form.communion),
      kumpil: sanitizeInput(form.kumpil),
      // ⛔ liturgicalObj is from checkboxes — no need to sanitize unless user can type them
    };

    const prevData = JSON.parse(localStorage.getItem("signupData") || "{}");
    const mergedData = { ...prevData, ...sanitizedForm };

    localStorage.setItem("signupData", JSON.stringify(mergedData));
    router.push("/signup3");
  };

  return (
    <form
      className={cn("flex flex-col justify-center gap-6 ", className)}
      {...props}
      onSubmit={handleNext}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-muted-foreground font-bold">
          CREATE YOUR ACCOUNT
        </h1>
        <p className="text-xl  font-semibold">Service Information</p>
      </div>

      <div className="flex justify-between items-center gap-1">
        <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
        <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
        <div className="bg-[#FEFEFE] flex-1 min-w-[80px]   h-[10px] rounded"></div>
      </div>

      <div className="grid gap-6">
        <Label htmlFor="dateJoin">Date of Join</Label>
        <div className=" flex flex-col sm:flex-row  justify-between  gap-2">
          <select
            id="monthJoin"
            name="monthJoin"
            value={form.monthJoin}
            onChange={(e) => setForm({ ...form, monthJoin: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white"
          >
            <option value="">-- Choose Month --</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <select
            id="yearJoin"
            name="yearJoin"
            value={form.yearJoin}
            onChange={(e) => setForm({ ...form, yearJoin: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white"
            required
          >
            <option value="">-- Choose Year --</option>
            {Array.from(
              { length: new Date().getFullYear() - 1998 + 1 },
              (_, i) => {
                const year = 1998 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              }
            )}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Member Status</Label>
          <select
            id="memberStatus"
            name="memberStatus"
            value={form.memberStatus}
            onChange={(e) => setForm({ ...form, memberStatus: e.target.value })}
            required
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white"
          >
            <option value="">-- Choose Status --</option>
            <option value="Aspirant">Aspirant</option>
            <option value="Neophytes">Neophytes</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <Label htmlFor="object">Liturgical Object you used</Label>
        <div className="grid gap-2">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.liturgicalObj.includes("Crucifix")}
                onChange={() => toggleCheckBox("Crucifix")}
                id="crucifix"
                name="crucifix"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Crucifix
              </p>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.liturgicalObj.includes("Thurible and Boat")}
                onChange={() => toggleCheckBox("Thurible and Boat")}
                id="thuribleBoat"
                name="thuribleBoat"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Thurible and Boat
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.liturgicalObj.includes("Candles")}
                onChange={() => toggleCheckBox("Candles")}
                id="candles"
                name="candles"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Candles
              </p>
            </div>
            <div className="flex items-center gap-1 ">
              <input
                type="checkbox"
                checked={form.liturgicalObj.includes("Sanctuary Bell")}
                onChange={() => toggleCheckBox("Sanctuary Bell")}
                id="sanctuary"
                name="sanctuary"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Sanctuary Bell
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.liturgicalObj.includes("Rotating Bell")}
                onChange={() => toggleCheckBox("Rotating Bell")}
                id="rotating"
                name="rotating"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Rotating Bell
              </p>
            </div>
            <div className="flex items-center gap-1 ">
              <input
                type="checkbox"
                checked={form.liturgicalObj.includes("Sanctus Bell")}
                onChange={() => toggleCheckBox("Sanctus Bell")}
                id="sanctus"
                name="sanctus"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Sanctus Bell
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.liturgicalObj.includes("Kampanaryo")}
                onChange={() => toggleCheckBox("Kampanaryo")}
                id="kampanaryo"
                name="kampanaryo"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Kampanaryo
              </p>
            </div>
            <div className="flex items-center gap-1 ">
              <input
                type="checkbox"
                checked={form.liturgicalObj.includes("Solo Bell")}
                onChange={() => toggleCheckBox("Solo Bell")}
                id="solo"
                name="solo"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Solo Bell
              </p>
            </div>
          </div>
        </div>

        <label htmlFor="baptism-yes">Have Baptism?</label>
        <div className="flex justify-center items-center gap-4">
          <div className="flex gap-2">
            <label htmlFor="baptism-yes">Yes</label>
            <input
              type="radio"
              id="baptism-yes"
              name="baptism"
              value="Yes"
              checked={form.baptism === "Yes"}
              onChange={(e) => setForm({ ...form, baptism: e.target.value })}
              required
              className="w-[20px]"
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor="baptism-no">No</label>
            <input
              type="radio"
              id="baptism-no"
              name="baptism"
              value="No"
              checked={form.baptism === "No"}
              onChange={(e) => setForm({ ...form, baptism: e.target.value })}
              required
              className="w-[20px]"
            />
          </div>
        </div>

        <label htmlFor="communion-yes">Have First Communion?</label>
        <div className="flex justify-center items-center gap-4">
          <div className="flex gap-2">
            <label htmlFor="communion-yes">Yes</label>
            <input
              type="radio"
              id="communion-yes"
              name="communion"
              value="Yes"
              checked={form.communion === "Yes"}
              onChange={(e) => setForm({ ...form, communion: e.target.value })}
              required
              className="w-[20px]"
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor="communion-no">No</label>
            <input
              type="radio"
              id="communion-no"
              name="communion"
              value="No"
              checked={form.communion === "No"}
              onChange={(e) => setForm({ ...form, communion: e.target.value })}
              required
              className="w-[20px]"
            />
          </div>
        </div>

        <label htmlFor="kumpil-yes">Have Kumpil?</label>
        <div className="flex justify-center items-center gap-4">
          <div className="flex gap-2">
            <label htmlFor="kumpil-yes">Yes</label>
            <input
              type="radio"
              id="kumpil-yes"
              name="kumpil"
              value="Yes"
              checked={form.kumpil === "Yes"}
              onChange={(e) => setForm({ ...form, kumpil: e.target.value })}
              required
              className="w-[20px]"
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor="kumpil-no">No</label>
            <input
              type="radio"
              id="kumpil-no"
              name="kumpil"
              value="No"
              checked={form.kumpil === "No"}
              onChange={(e) => setForm({ ...form, kumpil: e.target.value })}
              required
              className="w-[20px]"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
          <Button type="submit" className="flex-1">
            Back
          </Button>

          <Button type="submit" className="flex-1  bg-[#972D06] text-[#FEFEFE]">
            Next
          </Button>
        </div>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
