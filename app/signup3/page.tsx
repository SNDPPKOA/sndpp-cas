

import { GalleryVerticalEnd } from "lucide-react"
import Image from 'next/image';

import { SignUpForm3 } from "@/components/signup3-form"

export default function SignUpPage2() {
  return (

      <div className="flex flex-wrap flex-col gap-4 p-6 md:p-10">
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
            <SignUpForm3 />
          </div>
        </div>
        
      </div>

  )
}
