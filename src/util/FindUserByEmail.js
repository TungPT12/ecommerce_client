const FindUserByEmail = (array, email) => {
    if (array.length === 0) {
        return -1
    }
    return array.findIndex((currentValue) => {
        return currentValue.email === email
    })
}

export default FindUserByEmail