import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/action/AuthenticationAction';
import { setCartUserLogin } from '../../store/action/CartAction';
import { useEffect, useState } from 'react';
import alertMessage from '../../util/warningMessage';
import { signin } from '../../apis/authn';
import { authnAction } from '../../store/reducer/authn';
function SignIn() {

    // const {
    //     input: inputEmail,
    //     isTouched: isTouchedEmail,
    //     isValid: isValidEmail,
    //     setInput: setInputEmail,
    //     onTouched: onTouchedEmail
    // } = useInput(validateEmail);

    // const {
    //     input: inputPassword,
    //     isTouched: isTouchedPassword,
    //     isValid: isValidPassword,
    //     setInput: setInputPassword,
    //     onTouched: onTouchedPassword
    // } = useInput(validateEmptyInput);

    // const isValidSubmit = isValidPassword && isValidEmail

    // const isShowMsg = (isTouched, isValid) => {
    //     if (isTouched) {
    //         return isValid ? false : true
    //     }
    // }



    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     let userArr = localStorage.getItem("userArr") ? JSON.parse(localStorage.getItem("userArr")) : [];
    //     const position = FindUserByEmail(userArr, inputEmail)
    //     if (position > -1) {
    //         const carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [];
    //         const email = userArr[position].email
    //         let cartUser = carts.find((carts) => {
    //             return carts.email === email
    //         })
    //         let cart = []
    //         if (cartUser) {
    //             cart = cartUser.cart
    //         }
    //         dispatch(login(userArr[position]))
    //         dispatch(setCartUserLogin(cart))
    //         navigate("/")
    //     } else {
    //         alert("Wrong email or password")
    //     }
    // }

    // const { isAuthn } = useSelector(state => state.authn)
    const { isAuthn } = useSelector(state => state.authn)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongUser, setWrongUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (isAuthn) {
    //         navigate('/');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isAuthn])

    const onSubmitLogin = async (e) => {
        try {
            e.preventDefault();
            const response = await signin(email, password);
            if (response.status === 401) {
                setWrongUser(true);
                return;
            }
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            const data = response.data;
            dispatch(authnAction.login(data));
            navigate('/')
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <div className={`container w-fit-content bg-light ${styles['sign-in']}`}>
            <h3 className={`${styles['title']}`}>Sign In</h3>
            {wrongUser ? <p>Wrong username or password</p> : <></>}
            <form onSubmit={onSubmitLogin} className={` d-flex flex-column ${styles['sign-in-form']}`}>
                <input type='email' placeholder='Email' required value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}

                />
                <input type='password' required placeholder='Password' value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <button className={`${styles['sign-in_btn']} h-100`}>Sign In</button>
            </form>
            <div className={`${styles['sign-up-link']} text-center mt-5 opacity-75  font-italic`}>
                <span className='opacity-50'>Create an account?</span>
                <Link to="/signup" className='text-decoration-none ms-1'>
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default SignIn;