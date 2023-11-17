import { useState } from "react"

const useInput = (callbackCheckValidation) => {
    const [input, setInput] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const isValid = callbackCheckValidation(input);

    const onTouched = () => {
        setIsTouched(true);
    }

    return {
        input,
        isTouched,
        isValid,
        setInput,
        onTouched
    }
}

export default useInput