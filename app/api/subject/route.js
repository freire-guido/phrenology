import {promises as fs} from 'fs'

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    
    const file = await fs.readFile(process.cwd() + '/app/data/subjects.json')
    const subjects = JSON.parse(file)


    return Response.json(subjects[Math.floor(Math.random() * subjects.length)])
}