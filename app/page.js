import Image from "next/image";
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default async function Home() {
  let subject = await fetch(`${process.env.FETCH_URL}/api/subject`).then(res => res.json())
  console.log(subject)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h2>{subject['bioname']}</h2>
        <Image
            aria-hidden
            src="/Walt_Minnick.jpg"
            alt="Walt Minnick"
            width={250}
            height={250}
          />
        <div className="flex flex-row w-72 gap-2">
          <a>Dem</a>
          <Slider defaultValue={[50]} max={100} step={10}></Slider>
          <a>Rep</a>
        </div>
        <Button variant="outline">Lock in</Button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          GeneralSemiotics
        </a>
      </footer>
    </div>
  );
}