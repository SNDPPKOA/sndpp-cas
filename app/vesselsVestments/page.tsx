import Image from "next/image";
import { BackMember } from "@/components/ui/back-to-member";

import { title } from "process";
import { Description } from "@radix-ui/react-dialog";
import { UserSideBar } from "@/components/userSideBar";

export default function VesselsVestments() {
  const liturgicalBooks = [
    {
      Image: "/romanMissal.png",
      title: "Roman Missal",
      description:
        "Nagbibigay ng Instructions at Guidance para sa ginaganap na misa.",
    },
    {
      Image: "/gospelBook.png",
      title: "Gospel Book",
      description: "Ginagamit ng pari upang maghayag ng salita ng Diyos.",
    },

    {
      Image: "/lectionary.png",
      title: "Lectionary",
      description: "Ito ang librong binabasa ang Readings at Responsial Psalm.",
    },
    {
      Image: "/ordo.png",
      title: "Ordo",
      description:
        "Ito ang libro na pinagbabatayan ng buong simbahan kung ano ang pinagdiwang.",
    },
    {
      Image: "/misalette.png",
      title: "Misalette",
      description:
        "Ito ang libro na pinagbabatayan ng buong simbahan kung ano ang pinagdiwang.",
    },
  ];

  const liturgicalVessels = [
    {
      Image: "/chalice.png",
      title: "Chalice",
      description:
        "Ginagamit bilang inuman na naglalaman ng banal na dugo ni Hesus sa loob ng misa.",
    },
    {
      Image: "/paten.png",
      title: "Paten",
      description:
        "Ito ay platito-laki na nilalagyan ng Ostiya o Katawan ni Hesus.",
    },
    {
      Image: "/ciborium.png",
      title: "Ciborium",
      description: "Ito ay sisidlan/lagayan ng Ostiya upang ipamahagi sa tao.",
    },
    {
      Image: "/communionPlate.png",
      title: "Communion Plate",
      description: "Saluhan ng mga particles ng Ostiya.",
    },
    {
      Image: "/monstrance.png",
      title: "Monstrance",
      description: "Ito ay ginagamit upang ipakita ang katawan ni Kristo.",
    },
    {
      Image: "/aspergilliumAspersorium .png",
      title: "Aspergillium and Aspersorium ",
      description: "Ginagamit bilang pambasbas na naglalaman ng holy water.",
    },
    {
      Image: "/cruets.png",
      title: "Cruets",
      description:
        "Ito ay lagayan ng alak at tubig na gagamitin at iaalay sa misa.",
    },

    {
      Image: "/sacredOils.png",
      title: "Sacred Oils",
      description:
        "Ginagamit sa mga sakramento ng binyag, kumpil, banal na orden at pagpapahid ng langis sa may sakit. Sila ay karaniwang inilalagay sa Chrismatory o Chrismarium.",
    },
  ];

  const others = [
    {
      Image: "/crossCandles.png",
      title: "Processional Cross and Candles",
      description: ".",
    },
    {
      Image: "/thuribleBoat.png",
      title: "Thurible and Incensce Boat",
      description:
        "Ang usok na lumalabas mula sa Thurible ay sumisimbolo sa mga panalangin na iniaakyat sa langit. Incense boat naman ang lagayan ng insenso na ginagamit sa misa.",
    },
    {
      Image: "/bookStand.png",
      title: "Book Stand",
      description: "Ginagamit upang madaling mabasa ang Roman Missal",
    },
    {
      Image: "/paschalCandle.png",
      title: "Paschal Candle",
      description: "Sumisimbolo kay Hesus bilang liwanag ng mundo.",
    },
    {
      Image: "/altarCandles.png",
      title: "Altar Candles",
      description: ".",
    },
    {
      Image: "/sanctus.jpg",
      title: "Mass Bells",
      description:
        "Ginagamit bilang pantawag atensyon sa mga dumadalo ng banal na misa.",
    },
  ];

  const linens = [
    {
      Image: "/altarCloth.png",
      title: "Altar Cloth",
      description: "Ito ang telang nakapatong sa ibabaw ng altar.",
    },
    {
      Image: "/corporal.png",
      title: "Corporal",
      description: "Ito ay telang saluhan ng sagradong particle ng Ostiya.",
    },
    {
      Image: "/pall.png",
      title: "Pall",
      description: "Nagpapanatili ng kalinisan ng nilalaman ng Kalis.",
    },
    {
      Image: "/purificator.png",
      title: "Purificator",
      description: "Nagpapanatili ng kalinisan ng nilalaman ng Kalis.",
    },
    {
      Image: "/lavaboTowel.png",
      title: "Lavabo and Towel",
      description: "Dito naglilinis ng kamay ang pari sa loob ng misa.",
    },
    {
      Image: "/arrangementsChalice.png",
      title: "Arrangements Chalice",
      description: "",
    },
  ];

  const vestments = [
    {
      Image: "/stole.png",
      title: "Stole or Stola",
      description: "",
    },
    {
      Image: "/chasuble.png",
      title: "Chasuble",
      description: "",
    },
    {
      Image: "/sutana.png",
      title: "Sutana & Surplice",
      description: "",
    },
    {
      Image: "/alb.png",
      title: "Alb & Cincture",
      description: "",
    },
    {
      Image: "/mitre.png",
      title: "Mitre",
      description: "",
    },
    {
      Image: "/cope.png",
      title: "Cope",
      description: "",
    },
    {
      Image: "/crozier.png",
      title: "Crozier",
      description: "",
    },
  ];
  return (
    <div className="p-4">
      <BackMember />
      <UserSideBar/>

      <div className=" flex flex-col mt-12 gap-4">
        <h1 className="font-bold text-xl sm:text-3xl md:text-4xl mb-4 text-center">
          Litugical Vessels and Vestments
        </h1>
        <div className="relative h-[400px] w-full overflow-hidden rounded-t-lg">
          <Image
            src="/liturgicalObject.png"
            alt="CAS Logo"
            fill
            className="object-cover opacity-60"
          />
        </div>

        <div className="flex flex-col gap-8">
          <p className="font-bold text-lg sm:text-xl">
            Intended Learning Outcomes (ILOs) - Inaasahang Matututuhan bilang
            Isang Lingkod Dambana
          </p>

          <ul className="list-disc pl-5 mb-12 space-y-2 text-base sm:text-lg">
            <li>
              Matukoy ang mga pangunahing kasangkapang ginagamit sa pagdiriwang
              ng Banal na Misa.
            </li>
            <li>
              Maipaliwanag ang kahalagahan ng bawat kagamitang liturhikal sa
              pagsasagawa ng mga sakramento.
            </li>
            <li>
              Makilala ang pagkakaiba-iba ng mga liturgical vessels tulad ng
              chalice, paten, ciborium, at iba pa.
            </li>
            <li>
              Maisabuhay ang respeto at paggalang sa mga kagamitang ginagamit sa
              liturhiya bilang bahagi ng pananampalataya.
            </li>
            <li>
              Makabuo ng isang presentasyon o proyekto na nagpapakita ng wastong
              paggamit ng liturgical vessels sa simbahan.
            </li>
          </ul>

          <p className="font-bold text-xl sm:text-2xl text-center">
            Ano ba ang mga Liturgical Objects?
          </p>

          <p className="text-base sm:text-lg text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            iusto, facere quibusdam suscipit asperiores rem ipsam nisi corporis
            doloribus totam eum aut consectetur perferendis numquam atque quos
            recusandae repudiandae quasi.Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Accusantium iusto, facere quibusdam suscipit
            asperiores rem ipsam nisi corporis doloribus totam eum aut
            consectetur perferendis numquam atque quos recusandae repudiandae
            quasi.
          </p>

          <p className="font-bold text-xl sm:text-2xl text-start">
            Liturgical Books
          </p>

          {liturgicalBooks.map((liturgicalBooks, index) => (
            <div
              key={index}
              className="flex gap-4 flex-col sm:flex-row items-center"
            >
              <div className="relative h-[300px] w-[250px]  overflow-hidden rounded-t-lg">
                <Image
                  src={liturgicalBooks.Image}
                  alt="CAS Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-lg sm:text-xl text-start">
                  {liturgicalBooks.title}
                </p>
                <p className="text-base sm:text-lg text-justify">
                  {liturgicalBooks.description}
                </p>
              </div>
            </div>
          ))}

          <p className="font-bold text-xl sm:text-2xl text-start mt-12">
            Liturgical Vessels
          </p>

          {liturgicalVessels.map((liturgicalVessels, index) => (
            <div
              key={index}
              className="flex gap-4 flex-col sm:flex-row items-center"
            >
              <div className="relative h-[320px] w-[250px]  overflow-hidden rounded-t-lg">
                <Image
                  src={liturgicalVessels.Image}
                  alt="CAS Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-lg sm:text-xl text-start">
                  {liturgicalVessels.title}
                </p>
                <p className="text-base sm:text-lg text-justify">
                  {liturgicalVessels.description}
                </p>
              </div>
            </div>
          ))}

          <p className="font-bold text-xl sm:text-2xl text-start mt-12">
            Other Liturgical Objects
          </p>

          {others.map((others, index) => (
            <div
              key={index}
              className="flex gap-4 flex-col sm:flex-row items-center"
            >
              <div className="relative h-[320px] w-[250px]  overflow-hidden rounded-t-lg">
                <Image
                  src={others.Image}
                  alt="CAS Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-lg sm:text-xl text-start">
                  {others.title}
                </p>
                <p className="text-base sm:text-lg text-justify">
                  {others.description}
                </p>
              </div>
            </div>
          ))}

          <p className="font-bold text-xl sm:text-2xl text-start mt-12">
            Altar Linens
          </p>

          {linens.map((linens, index) => (
            <div
              key={index}
              className="flex gap-4 flex-col sm:flex-row items-center"
            >
              <div className="relative h-[320px] w-[270px]  overflow-hidden rounded-t-lg">
                <Image
                  src={linens.Image}
                  alt="CAS Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-lg sm:text-xl text-start">
                  {linens.title}
                </p>
                <p className="text-base sm:text-lg text-justify">
                  {linens.description}
                </p>
              </div>
            </div>
          ))}
          <p className="font-bold text-xl sm:text-2xl text-start mt-12">
            Liturgical Vestments
          </p>

          {vestments.map((vestments, index) => (
            <div
              key={index}
              className="flex gap-4 flex-col sm:flex-row items-center"
            >
              <div className="relative h-[360px] w-[270px]  overflow-hidden rounded-t-lg">
                <Image
                  src={vestments.Image}
                  alt="CAS Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-lg sm:text-xl text-start">
                  {vestments.title}
                </p>
                <p className="text-base sm:text-lg text-justify">
                  {vestments.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
