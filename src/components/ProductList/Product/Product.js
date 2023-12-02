import styles from './Product.module.css'
import Popup from '../../Popup/Popup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import formatPrice from '../../../util/FormatPrice';

function Product({ isHavePopup, id, img, name, price, short_desc }) {
    const [isDisplayPopup, setIsDisplayPopup] = useState(false)

    const displayPopupProduct = () => {
        setIsDisplayPopup(true);
    }
    const closePopupProduct = () => {
        setIsDisplayPopup(false);
    }

    return (
        <>
            <div id={id} className={`${styles['product']} animation-zoom-in`} onClick={isHavePopup ? displayPopupProduct : () => { }}>
                <img
                    className="w-100 mb-3"
                    src={img}
                    alt={name} />
                <p className={`name text-center font-italic font-weight-900 font-family-Ubuntu mb-1`}>{name}</p>
                <p className={`price text-center opacity-50 font-weight-light font-monospace`}>{formatPrice(price)} VND</p>
            </div>
            {
                isHavePopup ? <>
                    {
                        isDisplayPopup ? <Popup>
                            <div className={`${styles['product-popup']} d-flex animation-zoom-in`}>
                                <div className={`${styles['img-popup']} d-block`}>
                                    <img src={img} alt={name} className='h-100' />
                                </div>
                                <div className={`${styles['description-popup']}`}>
                                    <div className={`${styles['close-popup']} d-flex justify-content-end`}>
                                        <div className={`${styles['icon']} px-3 py-2`} onClick={closePopupProduct}><FontAwesomeIcon icon={faClose} /></div>
                                    </div>
                                    <div className='pe-2'>
                                        <h3 className={`name font-italic font-weight-900 font-family-Ubuntu mb-1`}>{name}</h3>
                                        <p className={`price font-weight-light font-monospace m-0 ${styles['popup-price']}`}>{formatPrice(price)}</p>
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