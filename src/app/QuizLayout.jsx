"use client"
import { useEffect, useState } from "react"
import { QuizHook, SubmitValidation } from "./QuizHook"
import { useRouter } from 'next/navigation'

export const QuizLayout = ({ quizDatas }) => {
    const router = useRouter()
    const [checkboxValue, setcheckboxValue, checkErrors, setCheckErrors] = QuizHook([])

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
    useEffect(() => {
        quizDatas?.map((datas, i) => {
            setCheckErrors((prev) => {
                return {
                    ...prev,
                    [datas.uniquename]: {
                        containsValue: false
                    }
                }
            })
        })
    }, [])


    return (
        <form onSubmit={(e) => SubmitValidation(e, checkboxValue, setCheckErrors, checkErrors, router)}>
            {quizDatas?.map((datas, i) => {
                return (
                    <div key={i}>
                        <h2>{datas.question}</h2>
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
                    </div>
                )
            })}
            <button type='submit'>Submit</button>
        </form>

    )
}

