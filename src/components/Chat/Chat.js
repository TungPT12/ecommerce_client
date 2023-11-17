import { useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatScreen from "./ChatScreen";

function Chat() {
    const [showChat, setShowChat] = useState(false)

    return (
        <>
            <ChatIcon setShowChat={setShowChat} showChat={showChat} />
            <ChatScreen showChat={showChat} />
        </>
    );
}

export default Chat;