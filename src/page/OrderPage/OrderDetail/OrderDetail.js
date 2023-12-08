import React, { useEffect, useState } from 'react';
import styles from './OrderDetail.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoginApi } from '../../../apis/authn';
import { authnAction } from '../../../store/slice/authn';
import { cartAction } from '../../../store/slice/cart';
import { getOrderDetailApi } from '../../../apis/order';
import formatPrice from '../../../util/FormatPrice';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';

function OrderDetail() {
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthn, token } = useSelector(state => state.authn);
    const [isLoading, setIsLoading] = useState(true)
    const [orderDetail, setOrderDetail] = useState({
        user: '',
        name: '',
        phone: '',
        address: '',
        totalPrice: 0,
        items: []
    })

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

    const getOrderDetail = () => {
        getOrderDetailApi(token, id).then((response) => {
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
            setOrderDetail(data)
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
            getOrderDetail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    const renderOrderDetailItems = (orderDetail) => {
        console.log(orderDetail)
        return orderDetail.items.map((item) => {
            return <div key={item.product._id} className={`mt-3 d-flex align-items-center font-italic break-word ${styles['row']} mb-2`}>
                <div className="flex-4  mx-1 my-1">
                    {item.product._id}
                </div>
                <div className={` flex-2 my-1`}>
                    <img className="w-100 mb-3"
                        src={`${item.product.images[0].includes("http") ? item.product.images[0] : process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${item.product.images[0]}`}
                        alt={item.product.name} />
                </div>
                <div className="d-flex my-1 flex-3 mx-1 justify-content-center">
                    {item.product.name}
                </div>
                <div className="d-flex flex-2 mx-1 my-1 justify-content-center">
                    {formatPrice(item.price.toString())} VND
                </div>
                <span className={`flex-1 mx-1 my-1 text-center`}>{item.quantity}</span>
            </div>
        })
    }


    return (
        <div className={`container ${styles['wrapper-order-detail-page']}`}>
            {
                isAuthn ? (
                    isLoading ? <LoadingSpinner /> : <>
                        <div>
                            <h1 className='text-uppercase font-italic'>information order</h1>
                            <div className={`${styles['info-user']}`}>
                                <p>ID USER: {orderDetail.user}</p>
                                <p>Full Name: {orderDetail.name}</p>
                                <p>Phone: {orderDetail.phone}</p>
                                <p>Address: {orderDetail.address}</p>
                                <p>Total: {formatPrice(orderDetail.totalPrice.toString())} VND</p>
                            </div>
                        </div >
                        <div className={`w-100 ${styles['table']}`}>
                            <div className={`${styles['list-item']}`}>
                                <div>
                                    <div className={`${styles['title']} d-flex text-center text-uppercase font-italic py-2`}>
                                        <span className="flex-4 mx-1 my-1 text-uppercase">id product</span>
                                        <span className="flex-2 mx-1 my-1 text-uppercase">image</span>
                                        <span className="flex-3 mx-1 my-1 text-uppercase">name</span>
                                        <span className="flex-2 mx-1 my-1 text-uppercase">price</span>
                                        <span className="flex-1 mx-1 my-1 text-uppercase" >count</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column mb-3 text-center ">
                                    {renderOrderDetailItems(orderDetail)}
                                </div>
                            </div>
                        </div>
                    </>
                ) : <></>
            }
        </div>
    );
}

export default OrderDetail;