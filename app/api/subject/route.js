import {promises as fs} from 'fs'

export async function GET(request) {
    const file = fs.readFile(process.cwd() + '/app/data/subjects.json')
    const subjects = JSON.parse(await file)

    return Response.json(subjects[Math.floor(Math.random() * subjects.length)])
}