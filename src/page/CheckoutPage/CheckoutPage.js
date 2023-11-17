import BannerOfPage from "../../components/BannerOfPage/BannerOfPage";
import styles from './CheckoutPage.module.css';

function CheckoutPage({ children }) {
    return (
        <>
            {children}
            <div className="container pb-3">
                <BannerOfPage
                    bigTitle="CART"
                    subtitle="CART"
                    orderTitle="HOME / SHOP / "
                />
                <div className="mt-5">
                    <h3 className="text-uppercase font-italic mb-4 ">billing details</h3>
                    <div className="d-flex">
                        <div className={`${styles['checkout-info']} me-4`}>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label className={`mb-1 text-uppercase text-black-50 font-family-Ubuntu font-italic`}>full name:</label>
                                    <input className={`${styles['input-info']} w-100 px-3 py-3`} placeholder="Enter Your Full Name Here!" />
                                </div>
                                <div className="mb-3">
                                    <label className={`mb-1 text-uppercase text-black-50 font-family-Ubuntu font-italic`}>email:</label>
                                    <input className={`${styles['input-info']} w-100 px-3 py-3`} placeholder="Enter Your Email Here!" />
                                </div>
                                <div className="mb-3">
                                    <label className={`mb-1 text-uppercase text-black-50 font-family-Ubuntu font-italic`}>phone number:</label>
                                    <input className={`${styles['input-info']} w-100 px-3 py-3`} placeholder="Enter Your Phone Number Here!" />
                                </div>
                                <div className="mb-3">
                                    <label className={`mb-1 text-uppercase text-black-50 font-family-Ubuntu font-italic`}>address:</label>
                                    <input className={`${styles['input-info']} w-100 px-3 py-3`} placeholder="Enter Your Address Here!" />
                                </div>
                            </div>
                            <h4 className={`${styles['place-order']} text-light text-center font-weight-300 px-4 py-2 bg-opacity-100 text-opacity-75 bg-dark font-italic w-fit-content`}>
                                Place older
                            </h4>
                        </div>
                        <div className={`${styles['bill']} h-fit-content`}>
                            <h4 className="w-100 text-uppercase  font-italic opacity-75 mb-3">your order</h4>
                            <div className={`d-flex font-italic justify-content-between pb-2 pt-2 ${styles['item']}`}>
                                <p className={`${styles['item-name']} flex-1 font-weight-500 mb-0 me-1`}>Apple iPhone 13 Pro Max - Alpine Green</p>
                                <span className={`${styles['item-price']} flex-1 font-weight-400 text-black-50`}>10.999.000 VND x 1</span>
                            </div>
                            <div className={`d-flex font-italic justify-content-between pb-2 pt-2 ${styles['item']}`}>
                                <p className={`${styles['item-name']} flex-1 font-weight-500 mb-0 me-1`}>Apple AirPods 3rd gen</p>
                                <span className={`${styles['item-price']} flex-1 font-weight-400`}>10.999.000 VND x 1</span>
                            </div>
                            <div className={`d-flex font-italic justify-content-between mt-2 ${styles['total']}`}>
                                <h5 className="text-uppercase text-black-50 mb-0 font-weight-500">total</h5>
                                <span className={`${styles['total-price']}`}>19.700.988 VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;