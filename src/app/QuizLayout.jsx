"use client"
import { useEffect, useState } from "react"
import QuizHook from "./QuizHook"
import { useRouter } from 'next/navigation'




export const QuizLayout = ({ quizDatas }) => {
    const router = useRouter()
    const [checkboxValue, setcheckboxValue] = QuizHook([])
    const [checkErrors, setCheckErrors] = useState([])
    const SelectHandler = (e, singleChoice) => {
        let { name, value, checked } = e.target

        if (checked) {
            setcheckboxValue((prev) => {
                return {
                    ...prev,
                    [name]: !singleChoice ? [...(prev?.[name] !== undefined ? prev?.[name] : ""), value] : value,
                    containsValue: true
                }
            })
        } else {

            setcheckboxValue((prev) => {

                return {
                    ...prev,
                    [name]: !singleChoice ?
                        [...(prev?.[name] !== undefined ? prev?.[name].filter(nm => nm !== value) : "")]
                        : value,
                    containsValue: prev?.[name].length <= 1 ? false : true
                }
            })
        }
        // console.log(checkboxValue)
    }
    useEffect(() => {


        console.log(checkboxValue);

    }, [checkboxValue])

    const HandleQuizSubmit = (e) => {
        e.preventDefault()
        let convertObj = new URLSearchParams(checkboxValue).toString()


        router.push(
            `/results?${convertObj}`,

        )
    }
    return (
        <form onSubmit={HandleQuizSubmit}>
            {quizDatas?.map((datas, i) => {
                console.log(checkboxValue);
                
                return (
                    <div key={i}>
                        <h2>{datas.question}</h2>
                        <div className='choiceswrap'>
                            {datas.choices?.map((choice, j) => {
                                return (
                                    datas.singleChoice ?

                                        <div className='inputWrap' key={j}>
                                            <input type="radio" name={datas.uniquename} id={choice.name} value={choice.text} onChange={(e) => SelectHandler(e, datas.singleChoice)} />
                                            <label htmlFor={choice.name}>{choice.text}</label>
                                        </div>

                                        : <div className='inputWrap' key={j}>
                                            <input type="checkbox" name={datas.uniquename} id={choice.name} value={choice.text} onChange={(e) => SelectHandler(e, datas.singleChoice)} />
                                            <label htmlFor={choice.name}>{choice.text}</label>
                                        </div>

                                )
                            })}
                            <p className="">{checkboxValue?.[datas.uniquename]?.containsValue?.toString()}</p>
                        </div>
                    </div>
                )
            })}
            <button type='submit'>Submit</button>
        </form>

    )
}

