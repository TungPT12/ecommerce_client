import styles from './Product.module.css'
import Popup from '../../Popup/Popup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import formatPrice from '../../../util/FormatPrice';

function Product({ isHavePopup, id, image, name, price, short_desc, inViewTopTrendingProduct }) {
    const [isDisplayPopup, setIsDisplayPopup] = useState(false)

    const displayPopupProduct = () => {
        setIsDisplayPopup(true);
    }

    const closePopupProduct = () => {
        setIsDisplayPopup(false);
    }

    return (
        <>
            <div id={id} className={`${styles['product']} ${inViewTopTrendingProduct ? 'animation-zoom-in' : ''}`} onClick={isHavePopup ? displayPopupProduct : () => { }}>
                <div className={`${styles['image-warrper']} h-75`}>
                    <img
                        className="w-100 mb-3 h-100"
                        src={`${image.includes("http") ? image : process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${image}`}
                        alt={name} />
                </div>
                <p className={`name text-center font-italic font-weight-900 font-family-Ubuntu mb-1`}>{name}</p>
                <p className={`price text-center opacity-50 font-weight-light font-monospace`}>{formatPrice(price.toString())} VND</p>
            </div>
            {
                isHavePopup ? <>
                    {
                        isDisplayPopup ? <Popup>
                            <div className={`${styles['product-popup']} d-flex animation-zoom-in`}>
                                <div className={`${styles['img-popup']} d-block`}>
                                    <img className="h-100" alt={name} src={`${image.includes("http") ? image : process.env.REACT_APP_API_ENDPOINT_URL_IMAGE}${image}`} />
                                </div>
                                <div className={`${styles['description-popup']}`}>
                                    <div className={`${styles['close-popup']} d-flex justify-content-end`}>
                                        <div className={`${styles['icon']} px-3 py-2`} onClick={closePopupProduct}><FontAwesomeIcon icon={faClose} /></div>
                                    </div>
                                    <div className='pe-2'>
                                        <h3 className={`name font-italic font-weight-900 font-family-Ubuntu mb-1`}>{name}</h3>
                                        <p className={`price font-weight-light font-monospace m-0 ${styles['popup-price']}`}>{formatPrice(price.toString())}</p>
                                        <p className={`${styles['short-desc']}`}>{short_desc}</p>
                                    </div>
                                    <Link to={`/detail/${id}`} className={`${styles['view-detail-btn']} text-decoration-none py-2 px-3 font-italic bg-black w-fit-content`}>
                                        <FontAwesomeIcon className='me-3' icon={faShoppingCart} />
                                        View Detail
                                    </Link>
                                </div>
                            </div>
                        </Popup > : <></>
                    }
                </> : <></>
            }
        </>
    );
}

export default Product;