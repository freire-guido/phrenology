"use client"
import React from "react"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function({subject}) {
    const [locked, setLocked] = React.useState(false)
    const [slider, setSlider] = React.useState(50)

    const guessedDem = slider <= 50
    const isDem = subject['party'] == 'Democrat'
    
    return (<>
        {locked ? <h2>{subject['bioname']} - {subject['party']}</h2> : <h2>&nbsp;</h2>}
        <div className="relative">
            <img
                className='h-96'
                src={`https://theunitedstates.io/images/congress/original/${subject['bioguide_id']}.jpg`}
                />
            {locked && <div className="flex flex-col place-content-center items-center absolute top-0 left-0 right-0 bottom-0 text-9xl">
                <span className="flip">
                    {guessedDem == isDem ? '✅' : '🚫'}
                </span>
            </div>}
        </div>
        <div className="flex flex-row w-72 gap-2">
            <a>Dem</a>
            <Slider defaultValue={[50]} max={100} step={10} onValueCommit={(v) => setSlider(v)}></Slider>
            <a>Rep</a>
        </div>
        {locked ?
            <Button onClick={() => window.location.reload()}>Next</Button> :
            <Button onClick={() => setLocked(true)}>Lock in</Button>
        }
    </>)
}