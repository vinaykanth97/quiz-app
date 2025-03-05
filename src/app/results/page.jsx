import { quizDatas } from "../getFile";







export default async function page(req) {

    let getParams = Object.fromEntries(new URLSearchParams(await req.searchParams))
    let convertArray = Object.entries(getParams).map(([key, value]) => {
        let formattedValue;
        if (value.indexOf(",") !== -1) {
            formattedValue = value.split(",")
        } else {
            formattedValue = value
        }
        return {
            [key]: formattedValue
        }
    })
    let getFormattedArr = Object.assign(...convertArray)
    let quizData = await quizDatas()
    return (
        <>
            {quizData.map((data, i) => {


                let checkTypeAnswer =
                    typeof getFormattedArr?.[data?.uniquename] === "string" && typeof data.answer === "string" ? data?.answer === getFormattedArr?.[data?.uniquename].answer
                        : getFormattedArr?.[data?.uniquename] !== undefined ? getFormattedArr?.[data?.uniquename]?.sort().toString() === data?.answer?.sort()?.toString() : ""

                return (
                    <div key={i}>
                        <h2>{data.question}</h2>
                        <p>{checkTypeAnswer.toString()}</p>
                    </div>
                )
            })}
        </>
    )
}
