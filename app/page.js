import Image from "next/image"
import GameComponent from "@/components/gamecomponent"

export default async function Home() {
  let subject = await fetch(`${process.env.FETCH_URL}/api/subject`).then(res => res.json())
  const res = await fetch(`https://theunitedstates.io/images/congress/original/${subject['bioguide_id']}.jpg`)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Phrenology</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <GameComponent subject={subject} key={subject['bioguide_id']}/>
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