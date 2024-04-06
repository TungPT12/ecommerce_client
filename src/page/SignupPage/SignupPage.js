import SignUp from "../../components/SignUp/SignUp";
import styles from './SignupPage.module.css'
function RegisterPage() {
    return (
        <div className={`${styles['register-page']}`}>
            <SignUp />
        </div>
    );
}

export default RegisterPage;