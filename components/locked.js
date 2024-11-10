"use server"

import { mongoDBP } from "@/app/lib/mongodb"

export async function onLocked(subject, slider) {
    const db = await mongoDBP
    const statsDB = db.collection('stats')
    await statsDB.insertOne({
        bioguide_id: subject['bioguide_id'],
        slider: slider
    })

    let histData = await statsDB.aggregate([
        {'$match': {bioguide_id: subject['bioguide_id']}},
        {
            '$group': {
                '_id': '$slider',
                'count': { '$sum': 1 }
            }
        }]).toArray()

    for (let index = 0; index <= 100; index += 10) {
        if (!histData.find((obj) => obj['_id'] == index)) {
            histData.push({ _id: index, count: 0 })
        }
    }
    histData.sort((a, b) => a['_id'] - b['_id'])
    return histData
}