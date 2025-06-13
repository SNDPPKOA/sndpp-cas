import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
        <Link href="./vesselsVestments" className="w-full sm:w-[48%] lg:w-[30%]">
          <Card className="flex flex-col justify-center items-center p-4 rounded cursor-pointer hover:bg-gray-600 hover:text-black h-full">
            <Image
              src="/liturgicalObject.png"
              alt="CAS Logo"
              width={500}
              height={500}
              className="rounded-t-lg w-full h-auto object-cover"
            />
            <CardTitle className="mt-6">
              <p>Vessels and Vestments</p>
            </CardTitle>
            <CardDescription className="mt-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit magnam quidem ipsam voluptatum temporibus, nobis possimus quia dolorem doloribus sequi odit qui velit enim ea, autem eaque similique perferendis totam?
            </CardDescription>
          </Card>
        </Link>

        <div className="w-full sm:w-[48%] lg:w-[30%]">
          <Card className="flex flex-col justify-center items-center p-4 rounded h-full">
            <Image
              src="/partChurch.jpg"
              alt="CAS Logo"
              width={500}
              height={500}
              className="rounded-t-lg w-full h-auto object-cover"
            />
            <CardTitle className="mt-6">
              <p>Part of the Church</p>
            </CardTitle>
            <CardDescription className="mt-6">
              The Mass in the Catholic Church is structured into four main
              parts: Introductory Rites, Liturgy of the Word, Liturgy of the
              Eucharist, and Concluding Rites
            </CardDescription>
          </Card>
        </div>

  
      </div>
    </div>
  );
}
