import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css'
import { validateEmail, validateEmptyInput } from '../../util/ValidateInput';
import useInput from '../../hook/use-input';
import FindUserByEmail from '../../util/FindUserByEmail';
import { useDispatch } from 'react-redux';
import { login } from '../../store/action/AuthenticationAction';
import { setCartUserLogin } from '../../store/action/CartAction';
function SignIn() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {
        input: inputEmail,
        isTouched: isTouchedEmail,
        isValid: isValidEmail,
        setInput: setInputEmail,
        onTouched: onTouchedEmail
    } = useInput(validateEmail);

    const {
        input: inputPassword,
        isTouched: isTouchedPassword,
        isValid: isValidPassword,
        setInput: setInputPassword,
        onTouched: onTouchedPassword
    } = useInput(validateEmptyInput);

    const isValidSubmit = isValidPassword && isValidEmail

    const isShowMsg = (isTouched, isValid) => {
        if (isTouched) {
            return isValid ? false : true
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let userArr = localStorage.getItem("userArr") ? JSON.parse(localStorage.getItem("userArr")) : [];
        const position = FindUserByEmail(userArr, inputEmail)
        if (position > -1) {
            const carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [];
            const email = userArr[position].email
            let cartUser = carts.find((carts) => {
                return carts.email === email
            })
            let cart = []
            if (cartUser) {
                cart = cartUser.cart
            }
            dispatch(login(userArr[position]))
            dispatch(setCartUserLogin(cart))
            navigate("/")
        } else {
            alert("Wrong email or password")
        }
    }

    return (
        <div className={`container w-fit-content bg-light ${styles['sign-in']}`}>
            <h3 className={`${styles['title']}`}>Sign In</h3>
            <form onSubmit={isValidSubmit ? onSubmit : (e) => {
                e.preventDefault()
            }} className={` d-flex flex-column ${styles['sign-in-form']}`}>
                <input type='email' placeholder='Email' required
                    value={inputEmail}
                    onChange={(e) => {
                        setInputEmail(e.target.value)
                    }}
                    onBlur={onTouchedEmail} />
                {isShowMsg(isTouchedEmail, isValidEmail) ? <p className='ps-2 text-danger bg-danger-subtle mt-1 font-italic'>* Email must have format abc @xyz.abc !</p> : <></>}
                <input type='password' required placeholder='Password'
                    value={inputPassword}
                    onChange={(e) => {
                        setInputPassword(e.target.value)
                    }}
                    onBlur={onTouchedPassword}
                />
                {isShowMsg(isTouchedPassword, isValidPassword) ? <p className='ps-2 text-danger bg-danger-subtle mt-1 font-italic'>* Password can not empty!</p> : <></>}
                <button className={`${styles['sign-in_btn']} h-100`}>Sign In</button>
            </form>
            <div className={`${styles['sign-up-link']} text-center mt-5 opacity-75  font-italic`}>
                <span className='opacity-50'>Create an account?</span>
                <Link to="/register" className='text-decoration-none ms-1'>
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default SignIn;