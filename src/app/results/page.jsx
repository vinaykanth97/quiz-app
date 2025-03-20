import { quizDatas } from "../getFile";







export default async function page(req) {

    let getParams = Object.fromEntries(new URLSearchParams(await req.searchParams))
    let convertArray = Object.entries(getParams).map(([key, value]) => {
        return {
            [key]: value.indexOf(",") !== -1 ? value.split(",") : [value]
        }
    })
    let getFormattedArr = Object.assign(...convertArray)


    let quizData = await quizDatas()


    return (
        <>
            {quizData.map((data, i) => {
                let covtArr = typeof data.answer !== "object" ? [data.answer] : data.answer

                let checkTypeAnswer = getFormattedArr?.[data?.uniquename]?.sort().toString() === covtArr?.sort()?.toString() ? "Correct" : "Incorrect"

                return (
                    <div key={i}>
                        <h2>{data.question}</h2>
                        <p>{checkTypeAnswer}</p>
                    </div>
                )
            })}
        </>
    )
}
