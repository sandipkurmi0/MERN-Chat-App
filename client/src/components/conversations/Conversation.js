
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './conversation.css'
import moment from 'moment';

const Conversation = ({ conversation, currentUser, arivalMessage }) => {

    const [user, setUser] = useState(null)


    console.log('arival', arivalMessage)

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser.data._id)

        const getUser = async () => {
            try {
                const res = await axios("/api/getUserByQuery?userId=" + friendId)
                // console.log(res.data.data)   
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
            <span className="userInfo">
                <h4 className="">{user?.name}</h4>
                <h6 >{arivalMessage?.message}</h6>
            </span>
            <span className="conversationTime">{moment(arivalMessage?.createdAt).calendar()}</span>
        </div>
    )
}

export default Conversation