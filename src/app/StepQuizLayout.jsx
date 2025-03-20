"use client"
import { useState } from "react"
import { QuizHook, SubmitValidation } from "./QuizHook"



export default function StepQuizLayout({ quizDatas }) {
    const [checkErrors, setCheckErrors] = QuizHook([])
    const [stepCount, setstepCount] = useState(0)
    const NextStepHandler = () => {
        setstepCount(prev => {
            return prev + 1
        })
    }

    const PrevStepHandler = () => {
        setstepCount(prev => {
            return prev - 1
        })

    }
    return (
        <form className="quizwrapper">
            {quizDatas?.map((datas, index) => {
                return (
                    stepCount === index && (
                        <div className="quizbox" key={index}>
                            <h3>{datas.question}</h3>
                            <div className='choiceswrap'>
                                {datas.choices?.map((choice, j) => {
                                    return (
                                        datas.singleChoice ?
                                            <div className='inputWrap' key={j}>
                                                <input type="radio" name={datas.uniquename} id={choice.name} value={choice.text} onInput={(e) => SelectHandler(e, datas.singleChoice)} />
                                                <label htmlFor={choice.name}>{choice.text}</label>
                                            </div>

                                            : <div className='inputWrap' key={j}>
                                                <input type="checkbox" name={datas.uniquename} id={choice.name} value={choice.text} onInput={(e) => SelectHandler(e, datas.singleChoice)} />
                                                <label htmlFor={choice.name}>{choice.text}</label>
                                            </div>

                                    )
                                })}
                                <p className="">{checkErrors?.submitTrigger && !checkErrors?.[datas.uniquename]?.containsValue && "Kindly Fill this"}</p>
                            </div>
                            {stepCount > 0 && (
                                <button type="button" onClick={PrevStepHandler}>Prev</button>
                            )
                            }
                            {stepCount !== quizDatas.length - 1 && (
                                <button type="button" onClick={NextStepHandler}>Next</button>
                            )}
                            {stepCount === quizDatas.length - 1 && <button type="submit">Submit</button>}
                        </div>
                    )

                )
            })}

        </form>
    )
}
