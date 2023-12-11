import styles from './ChatScreen.module.css';
import adminImg from '../../assets/images/admin.png'
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { sendMessageApi } from '../../apis/chat';

function ChatScreen({ showChat }) {
    const socket = io('http://localhost:5000');
    const [messages, setMessages] = useState([]);
    // const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');
    const inputElement = useRef();


    useEffect(() => {
        setRoom('12345')
    }, [])


    useEffect(() => {
        socket.on(room, message => {
            setMessages([...messages, message]);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, room])

    useEffect(() => {
        console.log(messages)
    }, [messages])

    const sendMessage = () => {
        console.log(inputElement)
        const message = inputElement.current.innerHTML;
        // console.log(message)
        sendMessageApi(message, room).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    };

    const renderMessages = (messages) => {
        return messages.map((message) => {
            if (message.isClient) {
                const newMessage = `<div style="display: flex; margin-top: 4px;">
                                        <div>${message.message}</div>
                                    </div>`
                return <div className={` d-flex justify-content-end row`}>
                    <span className={`${styles['message-customer']} font-italic bg-message-customer text-end text-light w-fit-content p-2`}
                        dangerouslySetInnerHTML={{ __html: newMessage }}
                    ></span>
                </div>
            } else {
                const newMessage = `<div style="display: flex; margin-top: 4px;">
                                        <div style="margin-right: 4px;">ADMIN: </div>
                                        <div>${message.message}</div>
                                    </div>`
                return <div className={`row ${styles['wrap-message-admin']}`}>
                    <div className={`${styles['admin-img']}`}>
                        <img className='w-100' src={adminImg} alt='admin' />
                    </div>
                    <span className={` ${styles['message-admin']} font-italic bg-message-admin w-fit-content p-2`} dangerouslySetInnerHTML={{ __html: newMessage }}></span>
                </div>
            }
        })
    }

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
                    {renderMessages(messages)}
                </div>
                <div className={`${styles['message-input']} d-flex align-items-center`}>
                    <div className={`${styles['admin-img']}`}>
                        <img className='w-100' src={adminImg} alt='admin' />
                    </div>
                    <p className={`${styles['input-message']} ms-2 p-2 w-100 h-100 m-0 `} ref={inputElement} contenteditable="true" placeholder='Enter Message!'></p>
                    <div className='d-flex'>
                        <FontAwesomeIcon className={`${styles['smile-icon']} ms-3`} icon={faLink} />
                        <FontAwesomeIcon icon={faSmile} className={`${styles['smile-icon']} ms-3`} />
                        <div onClick={sendMessage}>
                            <FontAwesomeIcon className={`${styles['icon-plane-paper']} ms-3`} icon={faPaperPlane} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    return ReactDOM.createPortal(renderChatLiveScreen(), document.getElementById("chat-live"))
}



export default ChatScreen;