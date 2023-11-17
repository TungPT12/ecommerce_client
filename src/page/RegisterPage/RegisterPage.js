import SignUp from "../../components/SignUp/SignUp";
import styles from './RegisterPage.module.css'
function RegisterPage() {
    return (
        <div className={`${styles['register-page']}`}>
            <SignUp />
        </div>
    );
}

export default RegisterPage;