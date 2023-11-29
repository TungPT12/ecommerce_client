import SignIn from "../../components/SignIn/SignIn";
import styles from './SigninPage.module.css'

function SigninPage() {
    return (
        <div className={`${styles['login-page']}`}>
            <SignIn />
        </div>
    );
}

export default SigninPage;