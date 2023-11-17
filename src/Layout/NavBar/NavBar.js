import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './NavBar.module.css'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/action/AuthenticationAction";

function NavBar() {
    const dispatch = useDispatch()
    const { listCart, totalQuantity } = useSelector(state => state.cart)
    const { userLogin, isLogin } = useSelector(state => state.authentication)
    return (
        <div className={`container ${styles['navbar']} mb-2 pt-2`}>
            <div className="row">
                <div className="col">
                    <Link to="/"
                        className={`hover-link text-decoration-none font-italic ${styles.active} me-3 text-capitalize`}>
                        Home
                    </Link>
                    <Link to="/shop"
                        className={`hover-link text-decoration-none font-italic text-black me-3 text-capitalize`}>
                        Shop
                    </Link>
                </div>
                <div className={`${styles['logo']} col text-center text-uppercase`}>boutique</div>
                <div className="col d-flex justify-content-end">
                    <Link to="/cart"
                        className={`hover-link text-decoration-none font-italic text-black me-3 text-capitalize`}>
                        <span className="position-relative">
                            <p className={`position-absolute ${styles['quantity-item-cart']}`}>{totalQuantity}</p>
                            <FontAwesomeIcon icon={faCartShopping} className="opacity-50 me-1" />
                        </span>
                        Cart
                    </Link>
                    {isLogin ? <>
                        <Link
                            className={`hover-link text-decoration-none font-italic text-black me-3 text-capitalize`}>
                            <FontAwesomeIcon icon={faUser} className="opacity-50 me-1" />{userLogin.fullName}
                        </Link>
                        <Link to="/login" onClick={() => {
                            dispatch(logout())
                            let carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : []
                            const email = userLogin.email;
                            const positionCartUser = carts.findIndex((cartUser) => {
                                return cartUser.email === email;
                            })
                            if (positionCartUser < 0) {
                                carts.push({
                                    email: email,
                                    cart: listCart
                                })
                                localStorage.setItem("carts", JSON.stringify(carts))
                            } else {
                                carts[positionCartUser] = {
                                    email: email,
                                    cart: listCart
                                }
                                localStorage.setItem("carts", JSON.stringify(carts))
                            }
                            localStorage.removeItem("cart")
                        }} className="hover-link text-decoration-none me-3 text-black font-italic">
                            (Logout)
                        </Link>
                    </> : <></>}
                    {isLogin ?
                        <></> :
                        <Link to="/login"
                            className={`text-decoration-none font-italic text-black text-capitalize`}>
                            Login
                        </Link>}
                </div>
            </div>
        </div>
    );
}

export default NavBar;