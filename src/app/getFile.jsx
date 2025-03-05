"use server"
import { promises as fs } from 'fs';


async function getFile(src) {
    const file = await fs.readFile(process.cwd() + src, 'utf8');
    const requiredData = JSON.parse(file)
    return requiredData
}

export const quizDatas = async () => getFile('/src/app/quiz.json')