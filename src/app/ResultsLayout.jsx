"use client"

export const ResultsLayout = ({ quizData }) => {

    let quizAnswers = JSON.parse(sessionStorage.getItem('quizanswers'))


    return (
        <>
            {
                quizData.map((data, i) => {
                    return (
                        <div key={i}>
                            <h2>{data.question}</h2>
                            <p>{typeof quizAnswers[data.uniquename] === "object" ? quizAnswers[data.uniquename]?.sort()?.toString() === data.answer.sort()?.toString() ? "Correct" : "InCorrect" : quizAnswers[data.uniquename] === data.answer ? "Correct" : "InCorrect"}</p>
                        </div>
                    )
                })
            }
        </>
    )
}
