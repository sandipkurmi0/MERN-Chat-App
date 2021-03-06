import { createContext, useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const ChatContext = createContext()

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [currentUser, setCurrentUser] = useState();
    let history = useHistory()


    useEffect((history) => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        try {
            if (!userInfo) {
                history.push("/")
            }
        } catch (error) {
        }

    }, [history]);

    // console.log(user);
    return (
        <ChatContext.Provider value={{ user, setUser, currentUser, setCurrentUser }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider