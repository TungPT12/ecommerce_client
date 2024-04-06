import { useEffect, useState } from 'react';
import useInput from '../../hook/use-input';
import { isEmptyInput, isShowWarning, validPassword, validatePhoneNumber, validatedEmail } from '../../util/input';
import alertMessage from '../../util/warningMessage';
import styles from './SignUp.module.css'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../apis/authn';

function SignUp() {
    const [isDuplicateUserName, setIsDuplicateUserName] = useState(false);
    const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
    const navigate = useNavigate();

    const {
        isValid: isValidFullName,
        input: inputFullName,
        isTouch: isTouchFullName,
        onTouched: onTouchedFullName,
        setInput: setInputFullName,
    } = useInput(isEmptyInput, '');
    const {
        isValid: isValidPassword,
        input: inputPassword,
        isTouch: isTouchPassword,
        onTouched: onTouchedPassword,
        setInput: setInputPassword,
    } = useInput(validPassword, '');
    const {
        isValid: isValidEmail,
        input: inputEmail,
        isTouch: isTouchEmail,
        onTouched: onTouchedEmail,
        setInput: setInputEmail,
    } = useInput(validatedEmail, '');
    const {
        isValid: isValidPhoneNumber,
        input: inputPhoneNumber,
        isTouch: isTouchPhoneNumber,
        onTouched: onTouchedPhoneNumber,
        setInput: setInputPhoneNumber,
    } = useInput(validatePhoneNumber, '');

    const isValidSubmit = isValidFullName && isValidPassword && isValidEmail && isValidPhoneNumber;

    const onSubmitSignup = (e) => {
        e.preventDefault();
        const user = {
            fullName: inputFullName.trim(),
            password: inputPassword.trim(),
            phoneNumber: inputPhoneNumber.trim(),
            email: inputEmail.trim(),
        }
        signup(user).then((response) => {
            if (response.status !== 200) {
                setIsDuplicateEmail(false);
                setIsDuplicateUserName(false);
                if (response.data.message === "Duplicate User Name" || response.data.message === "Duplicate Email") {
                    if (response.data.message === "Duplicate User Name") {
                        setIsDuplicateUserName(true)
                    } else if (response.data.message === "Duplicate Email") {
                        setIsDuplicateEmail(true)
                    }
                    throw new Error(response.data.message);
                } else {
                    throw new Error(response.data.message);
                }
            }
            alert('Successfully')
            return;
        }).then(() => {
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className={`container w-fit-content ${styles['sign-up']}`}>
            <h3 className={`${styles['title']}`}>Sign Up</h3>
            <form onSubmit={isValidSubmit ? onSubmitSignup : (e) => {
                e.preventDefault();
                onTouchedEmail(true);
                onTouchedFullName(true);
                onTouchedPassword(true);
                onTouchedPhoneNumber(true);
            }} className={` d-flex flex-column ${styles['sign-up-form']}`}>
                <input type='text' onBlur={onTouchedFullName} placeholder='Full Name'
                    value={inputFullName}
                    onChange={(e) => {
                        setInputFullName(e.target.value)
                    }}
                />
                {isShowWarning(isValidFullName, isTouchFullName) ? alertMessage("Please enter your full name!") : <></>}
                <input type='email' onBlur={onTouchedEmail} placeholder='Email'
                    value={inputEmail}
                    onChange={(e) => {
                        setInputEmail(e.target.value)
                    }}
                />
                {isShowWarning(isValidEmail, isTouchEmail) ? alertMessage("Please enter your email! (abc@gmail.com)") : <></>}
                <input type='password' onBlur={onTouchedPassword} placeholder='Password'
                    value={inputPassword}
                    onChange={(e) => {
                        setInputPassword(e.target.value)
                    }}
                />
                {isShowWarning(isValidPassword, isTouchPassword) ? alertMessage("Please enter password at least 8 character!") : <></>}
                <input type='phone' placeholder='Phone'
                    value={inputPhoneNumber}
                    onChange={(e) => {
                        setInputPhoneNumber(e.target.value)
                    }}
                    onBlur={onTouchedPhoneNumber}
                />
                {isShowWarning(isValidPhoneNumber, isTouchPhoneNumber) ? alertMessage("Please enter your phone number!") : <></>}
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