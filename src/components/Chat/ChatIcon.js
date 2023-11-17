import facebookMessengerIcon from '../../assets/icon/facebook-messenger.svg'
import styles from './ChatIcon.module.css'
import ReactDOM from "react-dom";
function ChatIcon({ setShowChat, showChat }) {

    const renderChatLive = () => {
        return <>
            <div className={`${styles['facebook-messenger-icon']}`} onClick={() => {
                setShowChat(!showChat)
            }}>
                <img className='w-100' alt='icon' src={facebookMessengerIcon} />
            </div>
        </>
    }



    return ReactDOM.createPortal(renderChatLive(), document.getElementById("chat-icon"))
}

export default ChatIcon;

