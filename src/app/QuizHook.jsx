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

export function SubmitValidation(e, checkboxValue, setCheckErrors, checkErrors) {
    e.preventDefault()
    let convertObj = new URLSearchParams(checkboxValue).toString()
    setCheckErrors({
        ...checkErrors,
        submitTrigger: true
    })

    let getTrueVal = Object.values(checkErrors).every(err => {
        return err.containsValue !== false
    })
    return {
        checkFilled: getTrueVal,
        urlParam: convertObj
    }
}