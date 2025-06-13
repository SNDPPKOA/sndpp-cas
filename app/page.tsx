
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
