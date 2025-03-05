"use client"
import { useState } from "react"

export default function QuizHook(value) {
    const [checkboxValue, setcheckboxValue] = useState(value)
    return [
        checkboxValue,
        setcheckboxValue
    ]
}

