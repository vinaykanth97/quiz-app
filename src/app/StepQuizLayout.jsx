"use client"
import { useState, useEffect } from "react"
import { QuizHook, SubmitValidation } from "./QuizHook"
import { useRouter } from 'next/navigation'


export default function StepQuizLayout({ quizDatas }) {
    const [checkboxValue, setcheckboxValue, checkErrors, setCheckErrors] = QuizHook([])
    const [stepCount, setstepCount] = useState(0)
    const router = useRouter()

    const SelectHandler = (e, singleChoice) => {

        let { name, value, checked } = e.target
        if (checked) {
            setcheckboxValue((prev) => {
                return {
                    ...prev,
                    [name]: !singleChoice ? [value, ...(prev?.[name] !== undefined ? prev?.[name] : "")] : value,
                }
            })
            setCheckErrors({
                ...checkErrors,
                [name]: {
                    containsValue: true
                }
            })
        } else {
            setcheckboxValue((prev) => {
                return {
                    ...prev,
                    [name]:
                        !singleChoice ?
                            [...(prev?.[name] !== undefined ? prev?.[name]?.filter(nm => nm !== value) : "")]
                            : value,

                }
            })
            setCheckErrors(() => {
                return {
                    ...checkErrors,
                    [name]: {
                        containsValue: checkboxValue?.[name]?.length === 1 ? false : true
                    }
                }
            })
        }
    }


    const NextStepHandler = (e, data) => {
        if (checkErrors[data.uniquename]?.containsValue) {
            setstepCount(prev => {
                return prev + 1
            })
        } else {
            setCheckErrors({
                ...checkErrors,
                submitTrigger: {
                    [data.uniquename]: true
                }
            })
        }
    }

    const PrevStepHandler = () => {
        setstepCount(prev => {
            return prev - 1
        })
    }

    useEffect(() => {
        quizDatas?.map((datas, index) => {
            if (stepCount === index) {
                setCheckErrors((prev) => {
                    return {
                        ...prev,
                        [datas.uniquename]: {
                            containsValue: false
                        }
                    }
                })
            }
        })
    }, [])

    return (
        <form className="quizwrapper" onSubmit={(e) => SubmitValidation(e, checkboxValue, setCheckErrors, checkErrors, router)}>
            {quizDatas?.map((datas, index) => {
                return (
                    <div className={`quizbox ${stepCount !== index && 'd-none'}`} key={index}>
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

                            <p className="">{!checkErrors?.[datas.uniquename]?.containsValue && checkErrors?.submitTrigger?.[datas?.uniquename] && "Kindly Fill this"}</p>
                        </div>
                        {stepCount > 0 && (
                            <button type="button" onClick={PrevStepHandler}>Prev</button>
                        )
                        }
                        {stepCount !== quizDatas.length - 1 && (
                            <button type="button" onClick={(e) => NextStepHandler(e, datas)}>Next</button>
                        )}
                        {stepCount === quizDatas.length - 1 && <button type="submit">Submit</button>}
                    </div>


                )
            })}

        </form>
    )
}
