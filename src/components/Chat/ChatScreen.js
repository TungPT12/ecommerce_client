import styles from './ChatScreen.module.css';
import adminImg from '../../assets/images/admin.png'
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
function ChatScreen({ showChat }) {
    const renderChatLiveScreen = () => {
        return <>
            <div className={`${styles['chat-live']} bg-light  ${showChat ? "d-block" : "d-none"}`}>
                <div className='d-flex justify-content-between px-2 py-3'>
                    <h5 className='text-capitalize font-weight-500'>customer support</h5>
                    <div className={`${styles['title']} text-center d-flex align-items-center p-1 font-italic`}>
                        <span className='text-capitalize text-black-50'>let's chat app</span>
                    </div>
                </div>
                <div className={`${styles['chat-message-content']} col ps-2`}>
                    <div className={` d-flex justify-content-end row`}>
                        <span className={`${styles['message-customer']} font-italic bg-message-customer text-end text-light w-fit-content p-2`}>Xin chào</span>
                    </div>
                    <div className={`d-flex justify-content-end row`}>

                        <span className={`${styles['message-customer']} font-italic bg-message-customer text-end text-light w-fit-content p-2`}>Làm thế nào để xem các sản phẩm</span>
                    </div>
                    <div className={`row ${styles['wrap-message-admin']}`}>
                        <div className={`${styles['admin-img']}`}>
                            <img className='w-100' src={adminImg} alt='admin' />
                        </div>
                        <span className={` ${styles['message-admin']} font-italic bg-message-admin w-fit-content p-2`}>ADMIN: chào bạn</span>
                    </div>
                    <div className={`row`}>
                        <div className={`${styles['admin-img']}`}>
                            <img className='w-100' src={adminImg} alt='admin' />
                        </div>
                        <span className={` ${styles['message-admin']}  font-italic bg-message-admin w-fit-content p-2`}>ADMIN: Bạn có tể vào mục shop để xém</span>
                    </div>
                    <div className={` d-flex justify-content-end row`}>
                        <span className={`${styles['message-customer']} font-italic bg-message-customer text-end text-light w-fit-content p-2`}>Xin chào</span>
                    </div>
                    <div className={`d-flex justify-content-end row`}>

                        <span className={`${styles['message-customer']} font-italic bg-message-customer text-end text-light w-fit-content p-2`}>Làm thế nào để xem các sản phẩm</span>
                    </div>
                    <div className={`row ${styles['wrap-message-admin']}`}>
                        <div className={`${styles['admin-img']}`}>
                            <img className='w-100' src={adminImg} alt='admin' />
                        </div>
                        <span className={` ${styles['message-admin']} font-italic bg-message-admin w-fit-content p-2`}>ADMIN: chào bạn</span>
                    </div>
                    <div className={`row`}>
                        <div className={`${styles['admin-img']}`}>
                            <img className='w-100' src={adminImg} alt='admin' />
                        </div>
                        <span className={` ${styles['message-admin']}  font-italic bg-message-admin w-fit-content p-2`}>ADMIN: Bạn có tể vào mục shop để xém</span>
                    </div>
                </div>
                <div className={`${styles['message-input']} d-flex align-items-center`}>
                    <div className={`${styles['admin-img']}`}>
                        <img className='w-100' src={adminImg} alt='admin' />
                    </div>
                    <input className='ms-2 p-2' placeholder='Enter Message!' />
                    <div className='d-flex'>
                        <FontAwesomeIcon className={`${styles['smile-icon']} ms-3`} icon={faLink} />
                        <FontAwesomeIcon icon={faSmile} className={`${styles['smile-icon']} ms-3`} />
                        <FontAwesomeIcon className={`${styles['icon-plane-paper']} ms-3`} icon={faPaperPlane} />
                    </div>
                </div>
            </div>
        </>
    }

    return ReactDOM.createPortal(renderChatLiveScreen(), document.getElementById("chat-live"))
}



export default ChatScreen;