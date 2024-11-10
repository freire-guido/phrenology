"use client"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ChartContainer } from "@/components/ui/chart"
import { onLocked } from "@/components/locked"

import { Bar, BarChart } from "recharts"
import { useEffect, useState } from "react"


export default function GameComponent({subject}) {
    const [locked, setLocked] = useState(false)
    const [slider, setSlider] = useState(50)
    const [hist, setHist] = useState()

    useEffect(() => {
        async function checkImage() {
            const res = await fetch(`https://theunitedstates.io/images/congress/original/${subject['bioguide_id']}.jpg`)
            if (res.status != 200) {
                window.location.reload()
            }
        }
        checkImage()
    }, [subject])

    const chartConfig = {
        _id: { label: "slider" }
    }
    const guessedDem = slider <= 50
    const isDem = subject['party'] == 'Democrat'
    // const streak = localStorage.setItem("streak", 10)

    return (<>
        {locked ? <h2>{subject['bioname']} - {subject['party']}</h2> : <h2>&nbsp;</h2>}
        <div className={locked && (guessedDem != isDem) ? "ripped rippable" : "rippable"} style={{ position: "relative", height: "30vh" }}>
            <img className="left-ripped" src={`https://theunitedstates.io/images/congress/original/${subject['bioguide_id']}.jpg`} />
            <img className="right-ripped" src={`https://theunitedstates.io/images/congress/original/${subject['bioguide_id']}.jpg`} />
            {locked && <div className="flex flex-col place-content-center items-center absolute top-0 left-0 right-0 bottom-0 text-9xl">
                <span className="flip">
                    {guessedDem == isDem ? '✅' : '🚫'}
                </span>
            </div>}
        </div>
        <div className="flex flex-row w-72 gap-2">
            <a>Dem</a>
            <div className="flex flex-col">
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart data={hist}>
                        <Bar dataKey='count'></Bar>
                    </BarChart>
                </ChartContainer>
                <Slider disabled={locked} defaultValue={[50]} max={100} step={10} onValueCommit={(v) => setSlider(v[0])}></Slider>
            </div>
            <a>Rep</a>
        </div>
        {locked ?
            <Button onClick={() => window.location.reload()}>Next</Button> :
            <Button onClick={async () => {
                setLocked(true)
                setHist(await onLocked(subject, slider))
            }}>Lock in</Button>
        }
    </>)
}