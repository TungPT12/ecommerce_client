// import { useState } from "react"

// const useInput = (callbackCheckValidation) => {
//     const [input, setInput] = useState("");
//     const [isTouched, setIsTouched] = useState(false);
//     const isValid = callbackCheckValidation(input);

//     const onTouched = () => {
//         setIsTouched(true);
//     }

//     return {
//         input,
//         isTouched,
//         isValid,
//         setInput,
//         onTouched
//     }
// }

// export default useInput

import { useState } from "react";

const useInput = (callback, initValue) => {
    const [isTouch, setIsTouch] = useState(false);
    const [input, setInput] = useState(initValue);
    const isValid = callback(input);

    const onTouched = () => {
        setIsTouch(true);
    }

    const resetInput = () => {
        setInput(initValue);
        setIsTouch(false);
    }

    return {
        isValid,
        input,
        isTouch,
        onTouched,
        setInput,
        resetInput
    }
}

export default useInput;