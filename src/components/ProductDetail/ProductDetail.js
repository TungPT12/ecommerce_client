import { useState } from "react";
import styles from './ProductDetail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../util/FormatPrice";
import { addToCart } from "../../store/action/CartAction";
import { Link } from "react-router-dom";


function ProductDetail({ productDetail }) {
    const { isLogin } = useSelector(state => state.authentication)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className="mb-5">
            <div className="row">
                <div className="col">
                    <img className="w-100" src={productDetail.img1} alt="iphone" />
                </div>
                <div className="col">
                    <div className="row">
                        <h2 className="font-italic">{productDetail.name}</h2>
                        <p className={`${styles['price']} opacity-50 font-italic font-family-Ubuntu`}>{formatPrice(productDetail.price)}</p>
                        <p className="opacity-50 font-italic">{productDetail.short_desc}</p>
                    </div>
                    <div className="row">
                        <div className="font-italic mb-3">
                            <span className="mb-0 text-uppercase h6">category:</span>
                            <span className="h-100 ms-3 opacity-50">watchs</span>
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
                                isLogin ? <button className={`${styles['add-to-cart__btn']} font-italic border-0 bg-black px-3 user-select-none`}
                                    onClick={() => {
                                        const item = {
                                            id: productDetail._id.$oid,
                                            img: productDetail.img1,
                                            category: productDetail.category,
                                            name: productDetail.name,
                                            price: productDetail.price,
                                            quantity: quantity
                                        }
                                        dispatch(addToCart(item))
                                        setQuantity(1);
                                    }
                                    }
                                >
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
                <pre className={`${styles['description']}  opacity-75`}>{productDetail.long_desc}</pre>
            </div>
        </div>

    );
}

export default ProductDetail;