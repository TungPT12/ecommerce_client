import { useDispatch, useSelector } from "react-redux";
import BannerOfPage from "../../components/BannerOfPage/BannerOfPage";
import styles from './OrderPage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faLongArrowAltRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import formatPrice from "../../util/FormatPrice";
import { authnAction } from "../../store/slice/authn";
import { checkIsLoginApi } from "../../apis/authn";
import { useEffect, useState } from "react";
import { cartAction } from "../../store/slice/cart";
import { addToCartApi, } from "../../apis/cart";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { getOrdersApi } from "../../apis/order";

function HistoryOrderPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthn, token } = useSelector(state => state.authn);
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])
    // const [cart, setCart] = useState({
    //     items: [],
    //     totalQuantity: 0
    // })
    // window.scrollTo(0, 0)

    // const increaseQuantity = (productId) => {
    //     // let newCart = cart;
    //     let items = newCart.items;
    //     // timf kiem vị trí món hàng
    //     const itemPosition = items.findIndex((item) => {
    //         return item.product._id.toString() === productId;
    //     });
    //     items[itemPosition].quantity = items[itemPosition].quantity + 1;
    //     newCart.totalQuantity = newCart.totalQuantity + 1;
    //     setCart({
    //         items: newCart.items,
    //         totalQuantity: newCart.totalQuantity
    //     })
    // }


    // dispatch(cartAction.decreaseProductInCart(productId))
    // let newCart = cart;
    // let items = newCart.items;
    //     // timf kiem vị trí món hàng
    //     const itemPosition = items.findIndex((item) => {
    //         return item.product._id.toString() === productId;
    //     });
    //     items[itemPosition].quantity = items[itemPosition].quantity - 1;
    //     newCart.totalQuantity = newCart.totalQuantity - 1;
    //     setCart({
    //         items: newCart.items,
    //         totalQuantity: newCart.totalQuantity
    //     })
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
                throw new Error(response.data.message);
            }
            dispatch(authnAction.login(response.data))
            dispatch(cartAction.setCart(response.data.cart))
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

    // const deleteItemInCartState = (productId) => {
    //     let newCart = cart;
    //     let items = newCart.items;

    //     // timf kiem vị trí món hàng
    //     const itemPosition = items.findIndex((item) => {
    //         return item.product._id.toString() === productId;
    //     });
    //     const quantityItem = items[itemPosition].quantity;
    //     items.splice(itemPosition, 1)
    //     newCart.totalQuantity = newCart.totalQuantity - quantityItem;
    //     setCart({
    //         items: newCart.items,
    //         totalQuantity: newCart.totalQuantity
    //     })
    // }

    const getOrders = () => {
        getOrdersApi(token).then((response) => {
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
            console.log(data.results)
            setOrders(data.results)
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
                authnAction.logout();
            } else {
                alert('Sorry something went wrong!')
            }
        });
        dispatch(cartAction.addToCart({
            productId: id,
            quantity: quantity
        }));
    }

    // const deleteItemInCart = (productId) => {
    //     deleteProductInCartApi(token, productId).then((response) => {
    //         if (response.status === 500) {
    //             throw new Error('/500');
    //         }
    //         if (response.status === 400) {
    //             throw new Error('/400');
    //         }
    //         if (response.status === 404) {
    //             throw new Error('/404');
    //         }
    //         if (response.status === 403 || response.status === 401) {
    //             throw new Error('/403');
    //         }
    //     }).then(() => {
    //         // deleteItemInCartState(productId)
    //         dispatch(cartAction.deleteProductInCart(productId))
    //     }).catch((error) => {
    //         if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
    //             navigate(error.message)
    //         } else if (error.message === '/403') {
    //             dispatch(cartAction.setCart({
    //                 items: [],
    //                 totalQuantity: 0
    //             }))
    //             dispatch(authnAction.logout())
    //             navigate('/login')
    //         } else {
    //             getCart();
    //             alert('Sorry something went wrong!')
    //         }
    //     })
    // }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        } else {
            getOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    // const isThanOne = (productId) => {
    //     let items = cart.items;
    //     // timf kiem vị trí món hàng
    //     const itemPosition = items.findIndex((item) => {
    //         return item.product._id.toString() === productId;
    //     });
    //     return items[itemPosition].quantity > 1 ? true : false;


    // }

    // const renderItems = (items) => {
    //     return items.map((item) => {
    //         return <div key={item.product._id} className="d-flex align-items-center">
    //             <div className="flex-1">
    //                 <img className="w-100" alt={item.product.name} src={`${item.product.images[0].includes("http") ? item.product.images[0] : process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${item.product.images[0]}`} />
    //             </div>
    //             <h5 className="flex-2 text-center font-italic mx-1">{item.product.name}</h5>
    //             <span className={`flex-1 text-center mx-1 ${styles['price']} user-select-none`}>{formatPrice(item.product.price.toString())} VND</span>
    //             <div className="d-flex flex-1 mx-1 justify-content-center">
    //                 <button disabled={!isThanOne(item.product._id)} className="px-2 border-0 bg-white" onClick={() => {
    //                     if (isThanOne(item.product._id)) {
    //                         decreaseQuantity(item.product._id, true)
    //                     }
    //                 }}>
    //                     <FontAwesomeIcon icon={faCaretLeft} className={`${styles['caret-left-icon']}`} />
    //                 </button>
    //                 <span className={`${styles['quantity-number']} user-select-none`}>{item.quantity}</span>
    //                 <button className="px-2 border-0 bg-white" onClick={() => {
    //                     addToCart(item.product._id, 1);
    //                 }}>
    //                     <FontAwesomeIcon icon={faCaretRight} className={`${styles['caret-right-icon']}`} />
    //                 </button>
    //             </div>
    //             <span className={`flex-1 mx-1 text-center ${styles['total-price']} user-select-none`}>{formatPrice((parseFloat(item.product.price) * item.quantity).toString())} VND</span>
    //             <div className={`${styles['remove-item']} flex-1 text-center`}
    //                 onClick={() => {
    //                     deleteItemInCart(item.product._id)
    //                 }}
    //             >
    //                 <FontAwesomeIcon icon={faTrash} className={`${styles['trash-icon']}`} />
    //             </div>
    //         </div>
    //     })
    // }

    const totalPrice = (items) => {
        return items.reduce((totalPrice, item) => {
            return totalPrice + (parseFloat(item.product.price) * item.quantity)
        }, 0)
    }

    return (
        <>
            <div className="container pb-3">
                <BannerOfPage
                    bigTitle="HISTORY"
                    subtitle="HISTORY"
                />
                {
                    isAuthn ? (isLoading ? <LoadingSpinner /> : <div>
                        <div className="d-flex">
                            <div className={`${styles['list-item']}`}>
                                <div className={`${styles['title']} d-flex text-center text-uppercase font-italic py-2`}>
                                    <span className="flex-4 mx-1 my-1">id order</span>
                                    <span className="flex-4 mx-1 my-1">id user</span>
                                    <span className="flex-2 mx-1 my-1">name</span>
                                    <span className="flex-2 mx-1 my-1">phone</span>
                                    <span className="flex-2 mx-1 my-1" >address</span>
                                    <span className="flex-2 mx-1 my-1" >total</span>
                                    <span className="flex-2 mx-1 my-1" >delivery</span>
                                    <span className="flex-2 mx-1 my-1" >status</span>
                                    <span className="flex-2 mx-1 my-1" >detail</span>
                                </div>
                                <div className="d-flex flex-column mb-3 text-center">
                                    <div className={`d-flex align-items-center font-italic break-word ${styles['row']}`}>
                                        <div className="flex-4  mx-1 my-1">
                                            5jkdf9NE223QNSdfdsfsdfds
                                        </div>
                                        <div className={` flex-4 my-1`}>
                                            5jkdf9NE223QNSdfdsfsdfds
                                        </div>
                                        <div className="d-flex my-1 flex-2 mx-1 justify-content-center">
                                            Phamj tahnh Tujng
                                        </div>
                                        <div className="d-flex flex-2 mx-1 my-1 justify-content-center">
                                            0925215202
                                        </div>
                                        <span className={`flex-2 mx-1 my-1 text-center`}>41 Ham Nghi Tuy phong</span>
                                        <span className={`flex-2 text-center my-1 mx-1`}>12.323.827 VND</span>
                                        <div className={`my-1 flex-2 mx-1 text-center`} >
                                            Wating for progress
                                        </div>
                                        <div className={`my-1 flex-2 mx-1 text-center`} >
                                            wating for pay
                                        </div>
                                        <div className={`my-1 flex-2 mx-1 text-center`} >
                                            <Link className={`px-1 py-1  text-decoration-none ${styles['detail-button']}`}>
                                                View
                                                <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-3 text-black" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={`d-flex align-items-center font-italic break-word ${styles['row']}`}>
                                        <div className="flex-4  mx-1 my-1">
                                            5jkdf9NE223QNSdfdsfsdfds
                                        </div>
                                        <div className={` flex-4 my-1`}>
                                            5jkdf9NE223QNSdfdsfsdfds
                                        </div>
                                        <div className="d-flex my-1 flex-2 mx-1 justify-content-center">
                                            Phamj tahnh Tujng
                                        </div>
                                        <div className="d-flex flex-2 mx-1 my-1 justify-content-center">
                                            0925215202
                                        </div>
                                        <span className={`flex-2 mx-1 my-1 text-center`}>41 Ham Nghi Tuy phong</span>
                                        <span className={`flex-2 text-center my-1 mx-1`}>12.323.827 VND</span>
                                        <div className={`my-1 flex-2 mx-1 text-center`} >
                                            Wating for progress
                                        </div>
                                        <div className={`my-1 flex-2 mx-1 text-center`} >
                                            wating for pay
                                        </div>
                                        <div className={`my-1 flex-2 mx-1 text-center`} >
                                            <Link className={`px-1 py-1  text-decoration-none ${styles['detail-button']}`}>
                                                View
                                                <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-3 text-black" />
                                            </Link>
                                        </div>
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

export default HistoryOrderPage;