import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { signin } from '../../apis/authn';
import { authnAction } from '../../store/slice/authn';
import { cartAction } from '../../store/slice/cart';
function SignIn() {
    const { isAuthn } = useSelector(state => state.authn)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongUser, setWrongUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn])

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
            dispatch(cartAction.setCart(data.cart))
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