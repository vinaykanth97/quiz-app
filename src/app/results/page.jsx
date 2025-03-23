

import { quizDatas } from "../getFile";
import { ResultsLayout } from "../ResultsLayout";







export default async function page(req) {


    return (
        <>
            <ResultsLayout quizData={await quizDatas()} />
        </>
    )
}
