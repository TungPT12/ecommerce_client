import React from 'react';
import styles from './OrderDetail.module.css'
import { Link } from 'react-router-dom';

function OrderDetail() {
    return (
        <div className='container pb-3'>
            <div>
                <h1>information order</h1>
                <div>
                    <p>asdsfsd</p>
                    <p>asdsfsd</p>
                    <p>asdsfsd</p>
                    <p>asdsfsd</p>
                    <p>asdsfsd</p>
                    <p>asdsfsd</p>
                    <p>asdsfsd</p>
                </div>
            </div>
            <div className="w-100">
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
                        <div className={`d-flex align-items-center font-italic break-word ${styles['row']} mb-2`}>
                            <div className="flex-4  mx-1 my-1">
                                sad
                            </div>
                            <div className={` flex-4 my-1`}>
                                asd
                            </div>
                            <div className="d-flex my-1 flex-2 mx-1 justify-content-center">
                                asdsa
                            </div>
                            <div className="d-flex flex-2 mx-1 my-1 justify-content-center">
                                dasd
                            </div>
                            <span className={`flex-2 mx-1 my-1 text-center`}>asdsa</span>
                            <span className={`flex-2 text-center my-1 mx-1`}>sadsad VND</span>
                            <div className={`my-1 flex-2 mx-1 text-center`} >
                                dfgfd
                            </div>
                            <div className={`my-1 flex-2 mx-1 text-center`} >
                                fgdfgd
                            </div>
                            <div className={`my-1 flex-2 mx-1 text-center`} >
                                <Link className={`px-1 py-1  text-decoration-none ${styles['detail-button']}`}>
                                    View
                                    {/* <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-3 text-black" /> */}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;