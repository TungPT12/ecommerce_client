import { useCallback, useState } from "react"

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const sendRequest = useCallback((requestConfig, callbackForDataResponse, otherCallBack) => {
        setIsLoading(true);
        setError("");
        fetch(requestConfig.link, {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        }).then((response) => {
            if (!response.ok) {
                const error = response.json()
                throw new Error(JSON.stringify(error))
            }
            const data = response.json();
            return data
        }).then((data) => {
            setIsLoading(false)
            if (callbackForDataResponse) {
                callbackForDataResponse(data)
            }
            if (otherCallBack) {
                otherCallBack()
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return {
        sendRequest,
        isLoading,
        error
    }
}

export default useHttp