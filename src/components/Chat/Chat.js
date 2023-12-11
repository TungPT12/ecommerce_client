import { useEffect, useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatScreen from "./ChatScreen";
import { useSelector } from "react-redux";
function Chat() {
    const { isAuthn, token, id } = useSelector(state => state.authn);

    const [showChat, setShowChat] = useState(false)
    const [roomId, setRoomId] = useState('');
    // const [messages, setMessages] = useState([])

    // useEffect(() => {
    //     socket.on('roomId', (data) => {
    //         setMessages([...messages, data])
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [socket])

    return (
        <>
            <ChatIcon setShowChat={setShowChat} showChat={showChat} />
            <div>
                <ChatScreen roomId={roomId} showChat={showChat} />
            </div>
        </>
    );
}

export default Chat;