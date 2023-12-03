import { useDispatch, useSelector } from "react-redux";
import BannerOfPage from "../../components/BannerOfPage/BannerOfPage";
import styles from './CartPage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faGift, faLongArrowAltLeft, faLongArrowAltRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import formatPrice from "../../util/FormatPrice";
import { authnAction } from "../../store/slice/authn";
import { checkIsLoginApi } from "../../apis/authn";
import { useEffect } from "react";
import { cartAction } from "../../store/slice/cart";
// import format
function CartPage({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthn } = useSelector(state => state.authn);
    const cart = useSelector(state => state.cart)
    // const { items, totalQuantity } = useSelector(state => state.cart)
    console.log(cart)
    // window.scrollTo(0, 0)

    // const increaseQuantity = (id, actionUpdate) => {
    //     dispatch(updateItemInCart(id, actionUpdate))
    // }

    // const decreaseQuantity = (id, actionUpdate) => {
    //     dispatch(updateItemInCart(id, actionUpdate))
    // }

    const checkIsLogin = () => {
        checkIsLoginApi().then((response) => {
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
                // return
                throw new Error(response.data.message);
            }
            dispatch(authnAction.login(response.data))
            dispatch(cartAction.setCart(response.data.cart))
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                navigate('/login')
            }
        })
    }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    const renderCart = (listCart) => {
        return listCart.map((item) => {
            return <div key={item.id} className="d-flex align-items-center">
                <div className="flex-1">
                    <img className="w-100" alt={item.name} src={item.img} />
                </div>
                <h5 className="flex-2 text-center font-italic mx-1">{item.name}</h5>
                <span className={`flex-1 text-center mx-1 ${styles['price']} user-select-none`}>{formatPrice(item.price.toString())} VND</span>
                <div className="d-flex flex-1 mx-1 justify-content-center">
                    <div className="px-2" onClick={() => {
                        // decreaseQuantity(item.id, "DECREASE")
                    }}>
                        <FontAwesomeIcon icon={faCaretLeft} className={`${styles['caret-left-icon']}`} />
                    </div>
                    <span className={`${styles['quantity-number']} user-select-none`}>{item.quantity}</span>
                    <div className="px-2" onClick={() => {
                        // increaseQuantity(item.id, "INCREASE")
                    }}>
                        <FontAwesomeIcon icon={faCaretRight} className={`${styles['caret-right-icon']}`} />
                    </div>
                </div>
                <span className={`flex-1 mx-1 text-center ${styles['total-price']} user-select-none`}>{formatPrice((parseFloat(item.price) * item.quantity).toString())} VND</span>
                <div className={`${styles['remove-item']} flex-1 text-center`}
                    onClick={() => {
                        // dispatch(deleteItemInCart(item.id))
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} className={`${styles['trash-icon']}`} />
                </div>
            </div>
        })
    }



    const totalPrice = (listCart) => {
        return listCart.reduce((totalPrice, item) => {
            return totalPrice + (parseFloat(item.price) * item.quantity)
        }, 0)
    }

    return (
        <>
            {/* {children} */}
            <div className="container pb-3">
                <BannerOfPage
                    bigTitle="CART"
                    subtitle="CART"
                />
                <div>
                    <h3 className="text-uppercase font-italic mb-4">shopping cart</h3>
                    <div className="d-flex">
                        <div className={`${styles['list-item']} me-4`}>
                            <div className={`${styles['title']} d-flex text-center text-uppercase font-italic py-2`}>
                                <span className="flex-1">image</span>
                                <span className="flex-2 mx-1"  >product</span>
                                <span className="flex-1 mx-1" >price</span>
                                <span className="flex-1 mx-1" >quantity</span>
                                <span className="flex-1 mx-1" >total</span>
                                <span className="flex-1" >remove</span>
                            </div>
                            <div className="d-flex flex-column row-gap-3 mb-3">
                                {/* {renderCart(listCart)} */}
                            </div>
                            <div className={`d-flex ps-3 pe-5 py-3 justify-content-between ${styles['shopping-checkout']}`}>
                                <Link to="/shop" className={`${styles['continue-shopping']} font-italic`}>
                                    <FontAwesomeIcon icon={faLongArrowAltLeft} className="me-3 text-black" />
                                    Continue shopping
                                </Link>
                                <Link to="/checkout" className={`${styles['proceed-checkout']} font-italic`}>
                                    Proceed to checkout
                                    <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-3 text-black" />
                                </Link>
                            </div>
                        </div>
                        <div className={`${styles['provisional-bill']} h-fit-content`}>
                            <h4 className="w-100 text-uppercase  font-italic opacity-75 mb-4">cart total</h4>
                            <div className={`d-flex font-italic justify-content-between pb-2 ${styles['sub-total']}`}>
                                <h6 className="text-uppercase mb-0">subtotal</h6>
                                <span className={`${styles['provisional-bill__sub-price']}`}>{formatPrice((0).toString())} VND</span>
                            </div>
                            <div className={`d-flex font-italic justify-content-between mt-2 ${styles['total']}`}>
                                <h6 className="text-uppercase mb-0">total</h6>
                                {/* <span className={`${styles['provisional-bill__total-price']}`}>{formatPrice(0)} VND</span> */}
                            </div>
                            <div className={`${styles['coupon']} mt-3`}>
                                <input className="w-100 p-2 " placeholder="Enter your coupon" />
                                <div className="bg-dark text-light text-center py-2 ">
                                    <FontAwesomeIcon icon={faGift} />
                                    Apply coupon
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPage;