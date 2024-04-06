import { useDispatch, useSelector } from "react-redux";
import BannerOfPage from "../../components/BannerOfPage/BannerOfPage";
import styles from './OrderPage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import formatPrice from "../../util/FormatPrice";
import { authnAction } from "../../store/slice/authn";
import { checkIsLoginApi } from "../../apis/authn";
import { useEffect, useState } from "react";
import { cartAction } from "../../store/slice/cart";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { getOrdersApi } from "../../apis/order";

function HistoryOrderPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthn, token } = useSelector(state => state.authn);
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])

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

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        } else {
            getOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    const renderOrders = (orders) => {
        return orders.map((order) => {
            return <div key={order._id} className={`d-flex align-items-center font-italic break-word ${styles['row']} mb-2`}>
                <div className="flex-4  mx-1 my-1">
                    {order._id}
                </div>
                <div className={` flex-4 my-1`}>
                    {order.user}
                </div>
                <div className="d-flex my-1 flex-2 mx-1 justify-content-center">
                    {order.name}
                </div>
                <div className="d-flex flex-2 mx-1 my-1 justify-content-center">
                    {order.phone}
                </div>
                <span className={`flex-2 mx-1 my-1 text-center`}>{order.address}</span>
                <span className={`flex-2 text-center my-1 mx-1`}>{formatPrice(order.totalPrice.toString())} VND</span>
                <div className={`my-1 flex-2 mx-1 text-center`} >
                    {order.delivery.toLowerCase() === 'waiting' ? 'Waiting for progress'
                        : order.delivery.toLowerCase() === 'delivering' ? 'Delivering' : 'Delivered'}
                </div>
                <div className={`my-1 flex-2 mx-1 text-center`} >
                    {order.status ? "Already paid" : "Waiting for pay"}
                </div>
                <div className={`my-1 flex-2 mx-1 text-center`} >
                    <Link to={`/order/${order._id}`} className={`px-1 py-1  text-decoration-none ${styles['detail-button']}`}>
                        View
                        <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-3 text-black" />
                    </Link>
                </div>
            </div>
        })
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
                                    {renderOrders(orders)}
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