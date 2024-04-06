import React, { useEffect, useState } from 'react';

function useDebounced(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handlerDebounced = setTimeout(() => {
            setDebounceValue(value);
        }, delay)

        return () => {
            clearTimeout(handlerDebounced);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return debounceValue
}

export default useDebounced;