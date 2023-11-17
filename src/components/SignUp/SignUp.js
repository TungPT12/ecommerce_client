import useInput from '../../hook/use-input';
import FindUserByEmail from '../../util/FindUserByEmail';
import { validateEmail, validateEmptyInput, validatePassword, validatePhoneNumber } from '../../util/ValidateInput';
import styles from './SignUp.module.css'
import { Link, useNavigate } from 'react-router-dom';
let userArr = localStorage.getItem("userArr") ? JSON.parse(localStorage.getItem("userArr")) : [];

function SignUp() {
    const navigate = useNavigate()
    const {
        input: inputFullName,
        isTouched: isTouchedFullName,
        isValid: isValidFullName,
        setInput: setInputFullName,
        onTouched: onTouchedFullName
    } = useInput(validateEmptyInput);
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
    } = useInput(validatePassword);

    const {
        input: inputPhone,
        isTouched: isTouchedPhone,
        isValid: isValidPhone,
        setInput: setInputPhone,
        onTouched: onTouchedPhone
    } = useInput(validatePhoneNumber);

    const isValidSubmit = isValidFullName && isValidPassword && isValidPhone && isValidEmail

    const isShowMsg = (isTouched, isValid) => {
        if (isTouched) {
            return isValid ? false : true
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const user = {
            fullName: inputFullName,
            email: inputEmail,
            password: inputPassword,
            phone: inputPhone,
        }
        const position = FindUserByEmail(userArr, inputEmail)
        if (position < 0) {
            userArr.push(user)
            localStorage.setItem("userArr", JSON.stringify(userArr))
            navigate('/login')
        } else {
            alert("This email is exist!")
        }
    }

    return (
        <div className={`container w-fit-content ${styles['sign-up']}`}>
            <h3 className={`${styles['title']}`}>Sign Up</h3>
            <form onSubmit={isValidSubmit ? onSubmit : (e) => {
                e.preventDefault()
            }} className={` d-flex flex-column ${styles['sign-up-form']}`}>
                <input type='text' required placeholder='Full Name'
                    value={inputFullName}
                    onChange={(e) => {
                        setInputFullName(e.target.value)
                    }}
                    onBlur={onTouchedFullName}
                />
                {isShowMsg(isTouchedFullName, isValidFullName) ? <p className='ps-2 text-danger bg-danger-subtle mt-1 font-italic'>* Full Name can not empty!</p> : <></>}
                <input type='email' required placeholder='Email'
                    value={inputEmail}
                    onChange={(e) => {
                        setInputEmail(e.target.value)
                    }}
                    onBlur={onTouchedEmail}
                />
                {isShowMsg(isTouchedEmail, isValidEmail) ? <p className='ps-2 text-danger bg-danger-subtle mt-1 font-italic'>* Email must have format abc @xyz.abc !</p> : <></>}
                <input type='password' required placeholder='Password'
                    value={inputPassword}
                    onChange={(e) => {
                        setInputPassword(e.target.value)
                    }}
                    onBlur={onTouchedPassword}
                />
                {isShowMsg(isTouchedPassword, isValidPassword) ? <p className='ps-2 text-danger bg-danger-subtle mt-1 font-italic'>* Password must have at least 8 character!</p> : <></>}
                <input type='phone' required placeholder='Phone'
                    value={inputPhone}
                    onChange={(e) => {
                        setInputPhone(e.target.value)
                    }}
                    onBlur={onTouchedPhone}
                />
                {isShowMsg(isTouchedPhone, isValidPhone) ? <p className='ps-2 text-danger bg-danger-subtle mt-1 font-italic'>* Phone is not valid!</p> : <></>}
                <button className={`${styles['sign-up_btn']} h-100`}>Sign Up</button>
            </form>
            <div className={`${styles['sign-in-link']} text-center mt-5 opacity-75  font-italic`}>
                <span className='opacity-50'>Login?</span>
                <Link to="/login" className='text-decoration-none ms-1'>
                    Click
                </Link>
            </div>
        </div>
    );
}

export default SignUp;