// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from 'next/image';


// export default function Home() {
//   return (
//     <div>
//       <h1 className="font-bold text-2xl">Dashboard</h1>
//       <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">

//       <Card className="flex justify-center items-center flex-col w-full sm:w-[48%] lg:w-[30%] p-4 rounded ">
//         <Image 
//           src="/partMass.jpg" 
//           alt="CAS Logo"
//           width={500} 
//           height={500}
//           className="rounded-t-lg"
//         />
//           <CardTitle className="mt-6">
//             <p>Part of the Mass</p>
//           </CardTitle >
//           <CardDescription className="mt-6">The Mass in the Catholic Church is structured into four main parts: Introductory Rites,
//              Liturgy of the Word, Liturgy of the Eucharist, and Concluding Rites</CardDescription>
//       </Card>

//     <Card className="flex justify-center items-center flex-col w-full sm:w-[48%] lg:w-[30%] p-4 rounded ">
//         <Image 
//           src="/partChurch.jpg" 
//           alt="CAS Logo"
//           width={500} 
//           height={500}
//           className="rounded-t-lg"
//         />
//           <CardTitle className="mt-6">
//             <p>Part of the Church</p>
//           </CardTitle>
//           <CardDescription className="mt-6">The Mass in the Catholic Church is structured into four main parts: Introductory Rites,
//              Liturgy of the Word, Liturgy of the Eucharist, and Concluding Rites</CardDescription>
//       </Card>

//       <Card className="flex justify-center items-center flex-col w-full sm:w-[48%] lg:w-[30%] p-4 rounded ">
//         <Image 
//           src="/partMass.jpg" 
//           alt="CAS Logo"
//           width={500} 
//           height={500}
//           className="rounded-t-lg"
//         />
//           <CardTitle className="mt-6">
//             <p>Part of the Mass</p>
//           </CardTitle >
//           <CardDescription className="mt-6">The Mass in the Catholic Church is structured into four main parts: Introductory Rites,
//              Liturgy of the Word, Liturgy of the Eucharist, and Concluding Rites</CardDescription>
//       </Card>

//       <Card className="flex justify-center items-center flex-col w-full sm:w-[48%] lg:w-[30%] p-4 rounded ">
//         <Image 
//           src="/partMass.jpg" 
//           alt="CAS Logo"
//           width={500} 
//           height={500}
//           className="rounded-t-lg"
//         />
//           <CardTitle className="mt-6">
//             <p>Part of the Mass</p>
//           </CardTitle >
//           <CardDescription className="mt-6">The Mass in the Catholic Church is structured into four main parts: Introductory Rites,
//              Liturgy of the Word, Liturgy of the Eucharist, and Concluding Rites</CardDescription>
//       </Card>


//      <Card className="flex justify-center items-center flex-col w-full sm:w-[48%] lg:w-[30%] p-4 rounded ">
//         <Image 
//           src="/partMass.jpg" 
//           alt="CAS Logo"
//           width={500} 
//           height={500}
//           className="rounded-t-lg"
//         />
//           <CardTitle className="mt-6">
//             <p>Part of the Mass</p>
//           </CardTitle >
//           <CardDescription className="mt-6">The Mass in the Catholic Church is structured into four main parts: Introductory Rites,
//              Liturgy of the Word, Liturgy of the Eucharist, and Concluding Rites</CardDescription>
//       </Card>

//     </div>

//    </div>


//   )
// }


import Image from 'next/image';

import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start items-center">
          <Image 
            src="/casLogo.jpg" 
            alt="CAS Logo"
            width={50} 
            height={50}
            className="rounded-t-lg"
          />
          <h1 className="font-bold">SNDPP-CAS</h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/koa.jpg"
          alt="Image"
          fill
          className="object-cover"
          priority={true} // optional: preload this image for better LCP
        />
      </div>
    </div>
  )
}
