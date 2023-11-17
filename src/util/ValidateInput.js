const validatePassword = (password) => {
    if (password.length >= 8) {
        return true;
    }
    return false;
}

const validateEmail = (email) => {
    const pattern = /^[\d | \w]+@\w+\.\w+/
    const isEmail = pattern.test(email)
    if (isEmail) {
        return true;
    }
    return false;
}

const validateEmptyInput = (text) => {
    if (text) {
        return true
    }
    return false;
}

const validatePhoneNumber = (phone) => {
    const pattern = /^\d{10,11}$/
    const isPhone = pattern.test(phone)
    if (isPhone) {
        return true
    }
    return false;
}

export {
    validateEmail,
    validatePassword,
    validateEmptyInput,
    validatePhoneNumber
}