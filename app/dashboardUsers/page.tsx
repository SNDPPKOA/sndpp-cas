import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { UserSideBar } from "@/components/userSideBar";
import Image from "next/image";
export const runtime = "edge";
export default function DashboardUsers() {
  return (
    <div>
      <UserSideBar />
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
        <a
          href="https://www.canva.com/design/DAGqyCtN2vA/sCnOS_1WXIm67I29EXuoGg/view?utm_content=DAGqyCtN2vA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h45a81a7217#1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-[48%] lg:w-[30%]"
        >
          <Card className="flex flex-col justify-center items-center p-4 rounded cursor-pointer hover:bg-gray-600 hover:text-black h-full">
            <Image
              src="/liturgicalObject.png"
              alt="CAS Logo"
              width={500}
              height={500}
              className="rounded-t-lg w-full h-auto object-cover"
            />
            <CardTitle className="mt-6">
              <p>Liturgical Objects</p>
            </CardTitle>
            <CardDescription className="mt-6">
              Ang mga liturgical objects ay mga bagay na ginagamit sa mga
              seremonya at pagsamba sa simbahan. Sila ay tumutulong sa mga tao
              na makilala at sambahin si Diyos sa mga espesyal na paraan.
            </CardDescription>
          </Card>
        </a>

        <a
          href="https://www.canva.com/design/DAGqycD8lPg/KPX1huOKVCcOzYZ3etbTPQ/view?utm_content=DAGqycD8lPg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4ca6c25de5"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-[48%] lg:w-[30%]"
        >
          <Card className="flex flex-col justify-center items-center p-4 rounded cursor-pointer hover:bg-gray-600 hover:text-black h-full">
            <Image
              src="/partMass2.png"
              alt="CAS Logo"
              width={500}
              height={500}
              className="rounded-t-lg w-full h-auto object-cover"
            />
            <CardTitle className="mt-6">
              <p>Part of the Mass </p>
            </CardTitle>
            <CardDescription className="mt-6">
              Ang Misa ay binubuo ng mga bahagi na ginagamit sa seremonya ng
              pagsamba. Tinutulungan tayo ng mga ito na mas makilala at sambahin
              si Diyos sa banal na paraan.
            </CardDescription>
          </Card>
        </a>

        <a
          href="https://www.canva.com/design/DAGqykZ5_MQ/GzKMuCNf-Hs3oLXdKjvxIQ/view?utm_content=DAGqykZ5_MQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf19e81515a"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-[48%] lg:w-[30%]"
        >
          <Card className="flex flex-col justify-center items-center p-4 rounded cursor-pointer hover:bg-gray-600 hover:text-black h-full">
            <Image
              src="/sacraments.png"
              alt="CAS Logo"
              width={500}
              height={500}
              className="rounded-t-lg w-full h-auto object-cover"
            />
            <CardTitle className="mt-6">
              <p>Seven Sacraments </p>
            </CardTitle>
            <CardDescription className="mt-6">
              Ang Pitong Sakramento ay mga banal na tanda ng biyaya na itinatag
              ni Cristo. Tinutulungan nila tayong lumago sa pananampalataya at
              mas mapalapit sa Diyos.
            </CardDescription>
          </Card>
        </a>

        <a
          href="https://www.canva.com/design/DAGqykZ5_MQ/GzKMuCNf-Hs3oLXdKjvxIQ/view?utm_content=DAGqykZ5_MQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf19e81515a"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-[48%] lg:w-[30%]"
        >
          <Card className="flex flex-col justify-center items-center p-4 rounded cursor-pointer hover:bg-gray-600 hover:text-black h-full">
            <Image
              src="/altar-servers.jpg"
              alt="CAS Logo"
              width={500}
              height={500}
              className="rounded-t-lg w-full h-auto object-cover"
            />
            <CardTitle className="mt-6">
              <p>5 Ideals of Altar Servers </p>
            </CardTitle>
            <CardDescription className="mt-6">
              Ang Pitong Sakramento ay mga banal na tanda ng biyaya na itinatag
              ni Cristo. Tinutulungan nila tayong lumago sa pananampalataya at
              mas mapalapit sa Diyos.
            </CardDescription>
          </Card>
        </a>
      </div>
    </div>
  );
}
