import { useEffect, useState } from "react";
import styles from './ProductDetail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../util/FormatPrice";
import { Link, useNavigate } from "react-router-dom";
import { cartAction } from "../../store/slice/cart";
import { addToCartApi } from "../../apis/cart";
import { authnAction } from "../../store/slice/authn";
import { checkIsLoginApi } from "../../apis/authn";


function ProductDetail({ id, name, price, images, short_desc, long_desc, categoryName }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthn, token, cart } = useSelector(state => state.authn);
    const [quantity, setQuantity] = useState(1)
    const [imageShow, setImageShow] = useState('')
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const renderImage = (images) => {
        return images.map((image) => {
            return <div key={image} className={`${styles['image']}`} onClick={() => {
                setImageShow(image)
            }}>
                <img className="w-100" alt={name} src={`${image.includes("http") ? '' : process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${image}`} />
            </div>
        })
    }


    const addToCart = (id, quantity) => {
        addToCartApi(token, id, quantity).then((response) => {
            console.log(response)
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
                dispatch(cartAction.setCart(cart))
                alert('Sorry something went wrong!')
            }
        })
        dispatch(cartAction.addToCart({
            productId: id,
            quantity: quantity
        }))
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
                throw new Error('/403');
            }
            dispatch(authnAction.login(response.data))
            dispatch(cartAction.setCart(response.data.cart))
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                authnAction.logout();
            }
        })
    }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthn]);

    useEffect(() => {
        setImageShow(images[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mb-5">
            <div className="row">
                <div className="col d-flex w-100">
                    <div className="flex-1 d-flex flex-column gap-2 me-1">
                        {renderImage(images)}
                    </div>
                    <div className="flex-4 justify-content-center align-items-center h-100 d-flex">
                        <img className="w-100" alt={name} src={`${imageShow.includes("http") ? imageShow : process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${imageShow}`} />
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <h2 className="font-italic">{name}</h2>
                        <p className={`${styles['price']} opacity-50 font-italic font-family-Ubuntu`}>{formatPrice(price.toString())}</p>
                        <p className="opacity-50 font-italic">{short_desc}</p>
                    </div>
                    <div className="row">
                        <div className="font-italic mb-3">
                            <span className="mb-0 text-uppercase h6">category:</span>
                            <span className="h-100 ms-3 opacity-50">{categoryName}</span>
                        </div>
                        <div className="d-flex">
                            <div className={`${styles['change-quantity']} ps-1 pe-2 py-2 h-fit-content d-flex align-items-center`}>
                                <span className="px-3 opacity-50 text-uppercase">quantity</span>
                                <div onClick={decreaseQuantity}>
                                    <FontAwesomeIcon icon={faCaretLeft} className={`${styles['caret-left-icon']}`} />
                                </div>
                                <input type="number" min="1" className={`${styles['quantity-input']} user-select-none`} value={quantity}
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            setQuantity(parseInt(e.target.value))
                                        }
                                    }} />
                                <div onClick={increaseQuantity}>
                                    <FontAwesomeIcon icon={faCaretRight} className={`${styles['caret-right-icon']}`} />
                                </div>
                            </div>
                            {
                                isAuthn ? <button className={`${styles['add-to-cart__btn']} font-italic border-0 bg-black px-3 user-select-none`}
                                    onClick={() => {
                                        addToCart(id, quantity)
                                        setQuantity(1);
                                    }
                                    }>
                                    Add to cart
                                </button> : <Link to="/login" className={`${styles['add-to-cart__btn__not-login']}  d-flex align-items-center text-decoration-none font-italic border-0 bg-black px-3 user-select-none`} >
                                    Add to cart
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-fit-content">
                <div className="bg-dark text-uppercase text-light w-fit-content my-4  font-italic px-4 py-3">description</div>
                <h5 className="text-uppercase font-italic mb-4">Product description</h5>
                <pre className={`${styles['description']}  opacity-75`}>{long_desc}</pre>
            </div>
        </div>

    );
}

export default ProductDetail;