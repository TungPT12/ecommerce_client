import { useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatScreen from "./ChatScreen";
import { useSelector } from "react-redux";
import { createRoomChatApi } from "../../apis/chat";
function Chat() {
    const { id } = useSelector(state => state.authn);

    const [showChat, setShowChat] = useState(false)
    const [roomId, setRoomId] = useState('');

    const createRoomChat = () => {
        if (showChat) {
            setShowChat(false)
        } else {
            createRoomChatApi(id).then((response) => {
                setShowChat(true)
                setRoomId(response.data._id)
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    return (
        <>
            <ChatIcon createRoomChatFn={createRoomChat} />
            {
                showChat ? <ChatScreen roomId={roomId} setRoomId={setRoomId} setShowChat={setShowChat} /> : <></>
            }
        </>
    );
}

export default Chat;