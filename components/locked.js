"use server"

import { mongoDBP } from "@/app/lib/mongodb"

export async function onLocked(subject, slider) {
    const db = await mongoDBP
    const statsDB = db.collection('stats')
    await statsDB.insertOne({
        bioguide_id: subject['bioguide_id'],
        slider: slider
    })
}