import { quizDatas } from "../getFile"
import StepQuizLayout from "../StepQuizLayout"


export default async function page() {
    return (
        <StepQuizLayout quizDatas={await quizDatas()} />
    )
}
