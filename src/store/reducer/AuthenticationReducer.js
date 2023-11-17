



const userLogin = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")) : null
const initialState = {
    userLogin: userLogin,
    isLogin: userLogin ? true : false
}
function authentication(state = initialState, action) {
    switch (action.type) {
        case "ON_LOGIN":
            const user = action.user
            localStorage.setItem("userLogin", JSON.stringify(user))
            state = {
                userLogin: user,
                isLogin: true,
            }
            return state;
        case "ON_LOGOUT":
            localStorage.removeItem("userLogin")
            state = {
                userLogin: null,
                isLogin: false,
            }
            return state
        default:
            return state
    }
}

export default authentication;