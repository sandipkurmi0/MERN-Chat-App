import React, { useEffect, useState, useRef } from 'react'
import './chatPage.css'
import NavBar from '../../components/navBar/Navbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { io } from 'socket.io-client'

const ChatPaje = () => {

    const toast = useToast()
    const { user } = ChatState();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socket = useRef()
    const [arivalMessage, setArivalMessage] = useState(null);
    const scrollRef = useRef()



    useEffect(() => {
        socket.current = io("http://localhost:3001", { transports: ['websocket', 'polling', 'flashsocket'] })
        socket.current.on("getMessage", (data) => {
            setArivalMessage({
                sender_id: data.sender_id,
                message: data.message,
                createdAt: Date.now()
            })

        })
    }, [])


    useEffect(() => {
        arivalMessage && currentChat?.members.includes(arivalMessage.sender_id) &&
            setMessages((prev) => [...prev, arivalMessage])
    }, [arivalMessage, currentChat])


    useEffect(() => {
        socket.current.emit("addUser", user?.data._id)
        socket.current.on('getUsers', (users) => {
        })
    }, [user])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/api/chat/" + user?.data._id)
                console.log(res.data.data);
                setConversations(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getConversations()
    }, [user?.data._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/api/message/" + currentChat?._id)
                setMessages(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender_id: user.data._id,
            message: newMessage,
            chatId: currentChat._id
        }

        const receiverId = currentChat.members?.find((member) => {
            return member !== user?.data._id
        })

        socket.current.emit('sendMessage', {
            sender_id: user?.data._id,
            receiverId,
            message: newMessage
        })

        try {
            const res = await axios.post("/api/message", message)
            setMessages([...messages, res.data.data])
            setNewMessage("")
            toast({
                title: "Message has been successfully sent",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <NavBar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((conv, index) => (

                            <div onClick={() => (setCurrentChat(conv))} className={conv?._id === currentChat?._id ? 'active' : ""} key={index} >
                                <Conversation conversation={conv} currentUser={user} arivalMessage={arivalMessage} />
                            </div>
                        ))}

                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((msg, index) => (
                                        <div ref={scrollRef} key={index}>
                                            <Message message={msg} own={msg.sender_id === user?.data._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="chatMessageInput" placeholder="write some thing"></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit} >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                <Text fontSize='50px' color='#29928B'>
                                    Open a conversation to start a chat
                                </Text>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPaje