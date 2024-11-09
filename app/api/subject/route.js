import {promises as fs} from 'fs'

const file = fs.readFile(process.cwd() + '/app/data/subjects.json')

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const subjects = JSON.parse(await file)

    return Response.json(subjects[Math.floor(Math.random() * subjects.length)])
}