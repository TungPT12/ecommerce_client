import { useDispatch, useSelector } from "react-redux";
import BannerOfPage from "../../components/BannerOfPage/BannerOfPage";
import styles from './CheckoutPage.module.css';
import { checkIsLoginApi } from "../../apis/authn";
import { useEffect, useState } from "react";
import { cartAction } from "../../store/slice/cart";
import { authnAction } from "../../store/slice/authn";
import { useNavigate } from "react-router-dom";
import { getCartApi } from "../../apis/cart";
import formatPrice from "../../util/FormatPrice";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { isEmptyInput, isShowWarning, validatePhoneNumber, validatedEmail } from "../../util/input";
import useInput from "../../hook/use-input";
import alertMessage from "../../util/warningMessage";
import { checkoutApi } from "../../apis/order";
import LoadingSpinnerModal from "../../components/LoadingSpinnerModal/LoadingSpinnerModal";

function CheckoutPage() {
    const navigate = useNavigate();
    const { isAuthn, token, fullName, email, phoneNumber } = useSelector(state => state.authn);
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    const {
        isValid: isValidFullName,
        input: inputFullName,
        isTouch: isTouchFullName,
        onTouched: onTouchedFullName,
        setInput: setInputFullName,
    } = useInput(isEmptyInput, '');
    const {
        isValid: isValidEmail,
        input: inputEmail,
        isTouch: isTouchEmail,
        onTouched: onTouchedEmail,
        setInput: setInputEmail,
    } = useInput(validatedEmail, '');
    const {
        isValid: isValidPhoneNumber,
        input: inputPhoneNumber,
        isTouch: isTouchPhoneNumber,
        onTouched: onTouchedPhoneNumber,
        setInput: setInputPhoneNumber,
    } = useInput(validatePhoneNumber, '');
    const {
        isValid: isValidAddress,
        input: inputAddress,
        isTouch: isTouchAddress,
        onTouched: onTouchedAddress,
        setInput: setInputAddress,
    } = useInput(isEmptyInput, '');

    const isValidSubmit = isValidFullName && isValidEmail && isValidPhoneNumber && isValidAddress;

    const renderItemsBill = (items) => {
        return items.map((item) => {
            return <div className={`d-flex font-italic justify-content-between pb-2 pt-2 ${styles['item']}`}>
                <p className={`${styles['item-name']} flex-1 font-weight-500 mb-0 me-1`}>{item.product.name}</p>
                <span className={`${styles['item-price']} flex-1 font-weight-400 text-black-50`}>{formatPrice((item.product.price).toString())} VND x {item.quantity}</span>
            </div>
        })
    }

    const totalPrice = (items) => {
        return items.reduce((totalPrice, item) => {
            return totalPrice + (parseFloat(item.product.price) * item.quantity)
        }, 0)
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

    const checkout = () => {
        setIsLoadingModal(true);
        const formatItems = items.map((item) => {
            return {
                product: item.product._id,
                price: item.product.price,
                quantity: item.quantity
            }
        })

        const order = {
            name: inputFullName,
            email: inputEmail,
            phone: inputPhoneNumber,
            address: inputAddress,
            totalPrice: totalPrice(items),
            items: items
        };
        checkoutApi(token, order).then((response) => {
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
            dispatch(cartAction.setCart({
                items: [],
                totalQuantity: 0
            }))
            setIsLoadingModal(false);
            navigate('/order')
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
                alert('Sorry something went wrong!')
            }
        })
    }

    const getCartItems = () => {
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
            setItems(data.cart.items)
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
            getCartItems();
            setInputFullName(fullName);
            setInputEmail(email);
            setInputPhoneNumber(phoneNumber);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    return (
        <>

            {
                isLoadingModal ? <LoadingSpinnerModal /> : <></>
            }
            <div className="container pb-3">
                <BannerOfPage
                    bigTitle="CHECKOUT"
                    subtitle="CHECKOUT"
                    orderTitle="HOME / CART / "
                />
                <div className="mt-5">
                    {
                        isAuthn ? (
                            isLoading ? <LoadingSpinner /> : <>
                                <h3 className="text-uppercase font-italic mb-4 ">billing details</h3>
                                <div className="d-flex">
                                    <div className={`${styles['checkout-info']} me-4`}>
                                        <div className="mb-3">
                                            <div className="mb-3">
                                                <label className={`mb-1 text-uppercase text-black-50 font-family-Ubuntu font-italic`}>full name:</label>
                                                <input onBlur={onTouchedFullName}
                                                    value={inputFullName}
                                                    onChange={(e) => {
                                                        setInputFullName(e.target.value)
                                                    }}
                                                    className={`${styles['input-info']} w-100 px-3 py-3`} placeholder="Enter Your Full Name Here!" />
                                                {isShowWarning(isValidFullName, isTouchFullName) ? alertMessage("Please enter your full name!") : <></>}
                                            </div>
                                            <div className="mb-3">
                                                <label className={`mb-1 text-uppercase text-black-50 font-family-Ubuntu font-italic`}>email:</label>
                                                <input
                                                    onBlur={onTouchedEmail}
                                                    value={inputEmail}
                                                    onChange={(e) => {
                                                        setInputEmail(e.target.value)
                                                    }}
                                                    className={`${styles['input-info']} w-100 px-3 py-3`} placeholder="Enter Your Email Here!" />
                                                {isShowWarning(isValidEmail, isTouchEmail) ? alertMessage("Please enter your email! (abc@gmail.com)") : <></>}
                                            </div>
                                            <div className="mb-3">
                                                <label className={`mb-1 text-uppercase text-black-50 font-family-Ubuntu font-italic`}>phone number:</label>
                                                <input
                                                    onBlur={onTouchedPhoneNumber}
                                                    value={inputPhoneNumber}
                                                    onChange={(e) => {
                                                        setInputPhoneNumber(e.target.value)
                                                    }}
                                                    className={`${styles['input-info']} w-100 px-3 py-3`} placeholder="Enter Your Phone Number Here!" />
                                                {isShowWarning(isValidPhoneNumber, isTouchPhoneNumber) ? alertMessage("Please enter your phone number!") : <></>}
                                            </div>
                                            <div className="mb-3">
                                                <label className={`mb-1 text-uppercase text-black-50 font-family-Ubuntu font-italic`}>address:</label>
                                                <input
                                                    onBlur={onTouchedAddress}
                                                    value={inputAddress}
                                                    onChange={(e) => {
                                                        setInputAddress(e.target.value)
                                                    }}
                                                    className={`${styles['input-info']} w-100 px-3 py-3`} placeholder="Enter Your Address Here!" />
                                                {isShowWarning(isValidAddress, isTouchAddress) ? alertMessage("Please tell us where do you live, we will bring product for you!") : <></>}
                                            </div>
                                        </div>
                                        <h4 className={`${styles['place-order']} text-light text-center font-weight-300 px-4 py-2 bg-opacity-100 text-opacity-75 bg-dark font-italic w-fit-content`}
                                            onClick={isValidSubmit ? checkout : () => {
                                                onTouchedFullName(true);
                                                onTouchedEmail(true);
                                                onTouchedAddress(true);
                                                onTouchedPhoneNumber(true);
                                            }}
                                        >
                                            Place older
                                        </h4>
                                    </div>
                                    <div className={`${styles['bill']} h-fit-content`}>
                                        <h4 className="w-100 text-uppercase  font-italic opacity-75 mb-3">your order</h4>
                                        {renderItemsBill(items)}
                                        <div className={`d-flex font-italic justify-content-between mt-2 ${styles['total']}`}>
                                            <h5 className="text-uppercase text-black-50 mb-0 font-weight-500">total</h5>
                                            <span className={`${styles['total-price']}`}>{formatPrice(totalPrice(items).toString())} VND</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : <></>
                    }
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;