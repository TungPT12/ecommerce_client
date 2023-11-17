
const login = (user) => {
    return {
        type: "ON_LOGIN",
        user: user,
    }
}
const logout = () => {
    return {
        type: "ON_LOGOUT",
    }
}

export {
    login,
    logout
}