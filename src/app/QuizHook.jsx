"use client"
import { useState } from "react"
export function QuizHook(value) {
    const [checkboxValue, setcheckboxValue] = useState(value)
    const [checkErrors, setCheckErrors] = useState(value)
    return [
        checkboxValue,
        setcheckboxValue,
        checkErrors,
        setCheckErrors
    ]
}

export function SubmitValidation(e, checkboxValue, setCheckErrors, checkErrors, router) {
    e.preventDefault()
    sessionStorage.setItem("quizanswers", JSON.stringify(checkboxValue))
    setCheckErrors({
        ...checkErrors,
        submitTrigger: true
    })

    let getTrueVal = Object.values(checkErrors).every(err => {
        return err.containsValue !== false
    })
    if (getTrueVal) {
        router.push(
            `/results`,
        )
    }
    return {
        checkFilled: getTrueVal,
    }
}