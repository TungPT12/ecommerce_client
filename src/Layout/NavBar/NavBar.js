import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './NavBar.module.css'
import { useSelector } from "react-redux";

function NavBar() {
    const { isAuthn, cart, fullName } = useSelector(state => state.authn)
    console.log(isAuthn)
    const totalQuantity = cart.items.reduce((total, item) => {
        return total + item.quantity;
    }, 0)
    return (
        <div className={`container ${styles['navbar']} mb-2 pt-2`}>
            <div className="row">
                <div className="col">
                    <NavLink to="/"
                        className={`hover-link text-decoration-none font-italic ${styles.active} me-3 text-capitalize`}>
                        Home
                    </NavLink>
                    <NavLink to="/shop"
                        className={`hover-link text-decoration-none font-italic text-black me-3 text-capitalize`}>
                        Shop
                    </NavLink>
                </div>
                <div className={`${styles['logo']} col text-center text-uppercase`}>boutique</div>
                <div className="col d-flex justify-content-end">
                    <NavLink to="/cart"
                        className={`hover-link text-decoration-none font-italic text-black me-3 text-capitalize`}>
                        <span className="position-relative">
                            <p className={`position-absolute ${styles['quantity-item-cart']}`}>{totalQuantity}</p>
                            <FontAwesomeIcon icon={faCartShopping} className="opacity-50 me-1" />
                        </span>
                        Cart
                    </NavLink>
                    {isAuthn ? <>
                        <NavLink
                            className={`hover-link text-decoration-none font-italic text-black me-3 text-capitalize`}>
                            <FontAwesomeIcon icon={faUser} className="opacity-50 me-1" />{fullName}
                        </NavLink>
                        <NavLink to="/login" onClick={() => {
                            // dispatch(logout())
                            // let carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : []
                            // const email = userLogin.email;
                            // const positionCartUser = carts.findIndex((cartUser) => {
                            //     return cartUser.email === email;
                            // })
                            // if (positionCartUser < 0) {
                            //     carts.push({
                            //         email: email,
                            //         cart: listCart
                            //     })
                            //     localStorage.setItem("carts", JSON.stringify(carts))
                            // } else {
                            //     carts[positionCartUser] = {
                            //         email: email,
                            //         cart: listCart
                            //     }
                            //     localStorage.setItem("carts", JSON.stringify(carts))
                            // }
                            // localStorage.removeItem("cart")
                        }} className="hover-link text-decoration-none me-3 text-black font-italic">
                            (Logout)
                        </NavLink>
                    </> : <></>}
                    {isAuthn ?
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