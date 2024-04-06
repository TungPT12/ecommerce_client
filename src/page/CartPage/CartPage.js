import { useDispatch, useSelector } from "react-redux";
import BannerOfPage from "../../components/BannerOfPage/BannerOfPage";
import styles from './CartPage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faGift, faLongArrowAltLeft, faLongArrowAltRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import formatPrice from "../../util/FormatPrice";
import { authnAction } from "../../store/slice/authn";
import { checkIsLoginApi } from "../../apis/authn";
import { useEffect, useState } from "react";
import { cartAction } from "../../store/slice/cart";
import { addToCartApi, decreaseProductInCartApi, deleteProductInCartApi, getCartApi } from "../../apis/cart";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

function CartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthn, token } = useSelector(state => state.authn);
    console.log(isAuthn)
    const [isLoading, setIsLoading] = useState(true)
    const [cart, setCart] = useState({
        items: [],
        totalQuantity: 0
    })

    const increaseQuantity = (productId) => {
        let newCart = cart;
        let items = newCart.items;
        // timf kiem vị trí món hàng
        const itemPosition = items.findIndex((item) => {
            return item.product._id.toString() === productId;
        });
        items[itemPosition].quantity = items[itemPosition].quantity + 1;
        newCart.totalQuantity = newCart.totalQuantity + 1;
        setCart({
            items: newCart.items,
            totalQuantity: newCart.totalQuantity
        })
    }

    const decreaseQuantity = (productId, isCallApi) => {
        if (isCallApi) {
            decreaseProductInCartApi(token, productId).then((response) => {
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
            }).catch((error) => {
                if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                    navigate(error.message)
                } else if (error.message === '/403') {
                    dispatch(cartAction.setCart({
                        items: [],
                        totalQuantity: 0
                    }))
                    dispatch(authnAction.logout())
                    navigate('/login')
                } else {
                    // cartAction.setCart(cart)
                    alert('Sorry something went wrong!')
                }
            })
        }

        dispatch(cartAction.decreaseProductInCart(productId))
        let newCart = cart;
        let items = newCart.items;
        // timf kiem vị trí món hàng
        const itemPosition = items.findIndex((item) => {
            return item.product._id.toString() === productId;
        });
        items[itemPosition].quantity = items[itemPosition].quantity - 1;
        newCart.totalQuantity = newCart.totalQuantity - 1;
        setCart({
            items: newCart.items,
            totalQuantity: newCart.totalQuantity
        })
    }

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
                throw new Error(response.data.message);
            }
            return response.data;
        }).then((data) => {
            dispatch(authnAction.login(data))
            dispatch(cartAction.setCart(data.cart))
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                dispatch(cartAction.setCart({
                    items: [],
                    totalQuantity: 0
                }))
                dispatch(authnAction.logout())
                navigate('/login')
            }
        })
    }

    const deleteItemInCartState = (productId) => {
        let newCart = cart;
        let items = newCart.items;

        // timf kiem vị trí món hàng
        const itemPosition = items.findIndex((item) => {
            return item.product._id.toString() === productId;
        });
        const quantityItem = items[itemPosition].quantity;
        items.splice(itemPosition, 1)
        newCart.totalQuantity = newCart.totalQuantity - quantityItem;
        setCart({
            items: newCart.items,
            totalQuantity: newCart.totalQuantity
        })
    }

    const getCart = () => {
        getCartApi(token).then((response) => {
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
            return response.data
        }).then((data) => {
            setCart(data.cart)
            setIsLoading(false);
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else if (error.message === '/403') {
                dispatch(cartAction.setCart({
                    items: [],
                    totalQuantity: 0
                }))
                dispatch(authnAction.logout())
                navigate('/login')
            } else {
                // cartAction.setCart(cart)
                alert('Sorry something went wrong!')
            }
        })
    }

    const addToCart = (id, quantity) => {
        addToCartApi(token, id, quantity).then((response) => {
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
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else if (error.message === '/403') {
                dispatch(setCart({
                    items: [],
                    totalQuantity: 0
                }))
                dispatch(authnAction.logout())
                navigate('/login')
            } else {
                cartAction.setCart(cart)
                alert('Sorry something went wrong!')
            }
        });
        dispatch(cartAction.addToCart({
            productId: id,
            quantity: quantity
        }));
        increaseQuantity(id)
    }

    const deleteItemInCart = (productId) => {
        deleteProductInCartApi(token, productId).then((response) => {
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
            deleteItemInCartState(productId)
            dispatch(cartAction.deleteProductInCart(productId))
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else if (error.message === '/403') {
                dispatch(cartAction.setCart({
                    items: [],
                    totalQuantity: 0
                }))
                dispatch(authnAction.logout())
                navigate('/login')
            } else {
                getCart();
                alert('Sorry something went wrong!')
            }
        })
    }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        } else {
            getCart();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    const isThanOne = (productId) => {
        let items = cart.items;
        // timf kiem vị trí món hàng
        const itemPosition = items.findIndex((item) => {
            return item.product._id.toString() === productId;
        });
        return items[itemPosition].quantity > 1 ? true : false;


    }

    const renderItems = (items) => {
        return items.map((item) => {
            return <div key={item.product._id} className="d-flex align-items-center">
                <div className="flex-1">
                    <img className="w-100" alt={item.product.name} src={`${item.product.images[0].includes("http") ? item.product.images[0] : process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${item.product.images[0]}`} />
                </div>
                <h5 className="flex-2 text-center font-italic mx-1">{item.product.name}</h5>
                <span className={`flex-1 text-center mx-1 ${styles['price']} user-select-none`}>{formatPrice(item.product.price.toString())} VND</span>
                <div className="d-flex flex-1 mx-1 justify-content-center">
                    <button disabled={!isThanOne(item.product._id)} className="px-2 border-0 bg-white" onClick={() => {
                        if (isThanOne(item.product._id)) {
                            decreaseQuantity(item.product._id, true)
                        }
                    }}>
                        <FontAwesomeIcon icon={faCaretLeft} className={`${styles['caret-left-icon']}`} />
                    </button>
                    <span className={`${styles['quantity-number']} user-select-none`}>{item.quantity}</span>
                    <button className="px-2 border-0 bg-white" onClick={() => {
                        addToCart(item.product._id, 1);
                    }}>
                        <FontAwesomeIcon icon={faCaretRight} className={`${styles['caret-right-icon']}`} />
                    </button>
                </div>
                <span className={`flex-1 mx-1 text-center ${styles['total-price']} user-select-none`}>{formatPrice((parseFloat(item.product.price) * item.quantity).toString())} VND</span>
                <div className={`${styles['remove-item']} flex-1 text-center`}
                    onClick={() => {
                        deleteItemInCart(item.product._id)
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} className={`${styles['trash-icon']}`} />
                </div>
            </div>
        })
    }

    const totalPrice = (items) => {
        return items.reduce((totalPrice, item) => {
            return totalPrice + (parseFloat(item.product.price) * item.quantity)
        }, 0)
    }

    return (
        <>
            <div className="container pb-3">
                <BannerOfPage
                    bigTitle="CART"
                    subtitle="CART"
                />
                {
                    isAuthn ? (isLoading ? <LoadingSpinner /> : <div>
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
                                    {renderItems(cart.items)}
                                </div>
                                <div className={`d-flex ps-3 pe-5 py-3 justify-content-between ${styles['shopping-checkout']}`}>
                                    <Link to="/shop" className={`${styles['continue-shopping']} font-italic`}>
                                        <FontAwesomeIcon icon={faLongArrowAltLeft} className="me-3 text-black" />
                                        Continue shopping
                                    </Link>
                                    {
                                        cart.items.length !== 0 ? <Link to="/checkout" className={`${styles['proceed-checkout']} font-italic`}>
                                            Proceed to checkout
                                            <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-3 text-black" />
                                        </Link> : <></>
                                    }
                                </div>
                            </div>
                            <div className={`${styles['provisional-bill']} h-fit-content`}>
                                <h4 className="w-100 text-uppercase  font-italic opacity-75 mb-4">cart total</h4>
                                <div className={`d-flex font-italic justify-content-between pb-2 ${styles['sub-total']}`}>
                                    <h6 className="text-uppercase mb-0">subtotal</h6>
                                    <span className={`${styles['provisional-bill__sub-price']}`}>{formatPrice(totalPrice(cart.items).toString())} VND</span>
                                </div>
                                <div className={`d-flex font-italic justify-content-between mt-2 ${styles['total']}`}>
                                    <h6 className="text-uppercase mb-0">total</h6>
                                    <span className={`${styles['provisional-bill__total-price']}`}>{formatPrice(totalPrice(cart.items).toString())} VND</span>
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
                    </div>) : <></>
                }
            </div>
        </>
    );
}

export default CartPage;