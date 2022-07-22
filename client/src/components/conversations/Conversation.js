
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './conversation.css'

const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser.data._id)

        const getUser = async () => {
            try {
                const res = await axios("/api/getUserByQuery?userId=" + friendId)
                setUser(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [conversation, currentUser])

    return (
        <div className="conversation">
            <img className="conversation-Img" src={user ? user?.pic : "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"} alt="" />
            <span className="conversationName">{user?.name}</span>
        </div>
    )
}

export default Conversation