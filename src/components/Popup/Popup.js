import ReactDOM from "react-dom";
import styles from './Popup.module.css'
function Popup({ children }) {

    const renderPopup = () => {
        return <div className={`position-fixed d-flex justify-content-center align-items-center z-1 ${styles['popup']}`}>
            {children}
        </div>
    }

    const product_popupEl = document.getElementById('product-popup');

    return ReactDOM.createPortal(renderPopup(), product_popupEl)
}

export default Popup;