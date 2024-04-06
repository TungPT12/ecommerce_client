import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faSortDesc, faArrowRightToBracket, faCoins } from '@fortawesome/free-solid-svg-icons'
import styles from './NavBar.module.css'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../apis/authn";
import { authnAction } from "../../store/slice/authn";
import { cartAction } from "../../store/slice/cart";
import LoadingSpinnerModal from "../../components/LoadingSpinnerModal/LoadingSpinnerModal";
import './Navbar.css';
import { useState } from "react";
import Tippy from '@tippyjs/react/headless';// import 'tippy.js/dist/tippy.css'; // optional
function NavBar() {
    const { isAuthn, fullName } = useSelector(state => state.authn)
    const { totalQuantity } = useSelector(state => state.cart)
    const [isLoadingSpinnerModal, setIsLoadingSpinnerModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            {
                isLoadingSpinnerModal ? <LoadingSpinnerModal /> : <></>
            }
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
                                className={`d-flex text-decoration-none font-italic position-relative text-black align-items-baseline text-capitalize`}>
                                <FontAwesomeIcon icon={faUser} className="opacity-50 me-1 justify-content-center " />{fullName}
                            </NavLink>
                            <Tippy render={(attrs) => (
                                <div {...attrs} tabIndex="-1" className={`${styles['navbar-popup']} popup-navbar p-2`}>
                                    <NavLink to="/order" className={`${styles['order']} d-flex align-items-center py-1 text-decoration-none`}>
                                        <div className="d-block me-1">
                                            <FontAwesomeIcon icon={faCoins} />
                                        </div>
                                        Order
                                    </NavLink>
                                    <NavLink onClick={() => {
                                        setIsLoadingSpinnerModal(true);
                                        logout().then((response) => {
                                            if (response.status === 500) {
                                                throw new Error('/500');
                                            }
                                            if (response.status === 400) {
                                                throw new Error('/400');
                                            }
                                            if (response.status === 404) {
                                                throw new Error('/404');
                                            }
                                            if (response.status === 403 || response.status === 401) {
                                                throw new Error('/403');
                                            }
                                        }).then(() => {
                                            dispatch(cartAction.setCart({
                                                items: [],
                                                totalQuantity: 0
                                            }));
                                            dispatch(authnAction.logout());
                                            setIsLoadingSpinnerModal(false);
                                            navigate('/login')
                                        }).catch((error) => {
                                            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                                                navigate(error.message)
                                            } else if (error.message === '/403') {
                                                setIsLoadingSpinnerModal(false);
                                                dispatch(cartAction.setCart({
                                                    items: [],
                                                    totalQuantity: 0
                                                }))
                                                dispatch(authnAction.logout())
                                                setIsLoadingSpinnerModal(false);
                                                navigate('/login');
                                            }
                                        });
                                    }} className={`text-decoration-none w-100 d-flex align-items-center py-1 ${styles['logout']}`}>
                                        <div className="d-block">
                                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                                        </div>
                                        <div className="ps-1">(Logout)</div>
                                    </NavLink>
                                </div>
                            )} placement="left-end" delay={100} interactive>
                                <div className={`${styles['show-popup-icon']}  show-popup`}>
                                    <FontAwesomeIcon icon={faSortDesc} className={`ms-1 d-flex ${styles['icon-show-popup']}`} />

                                </div>
                            </Tippy>
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
        </>
    );
}

export default NavBar;