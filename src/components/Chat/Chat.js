import { useEffect, useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatScreen from "./ChatScreen";
import { io } from "socket.io-client";
function Chat() {
    const socket = io('http://localhost:5000');
    const [showChat, setShowChat] = useState(false)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on('roomId', (data) => {
            setMessages([...messages, data])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    console.log(messages)

    return (
        <>
            <ChatIcon setShowChat={setShowChat} showChat={showChat} />
            <ChatScreen showChat={showChat} />
        </>
    );
}

export default Chat;