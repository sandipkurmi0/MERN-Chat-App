import React from 'react'
import '../style.css'
import { Avatar, } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'

const SingleChats = ({ user, handleClick, activeListID }) => {

    const { setCurrentUser } = ChatState();

    //select curent user id
    const userSelectHandler = () => {
        console.log("hello")
        const selectedUser = user
        // console.log(selectedUser);
        setCurrentUser(selectedUser)
        handleClick(user._id);
    }


    return (
        <div onClick={userSelectHandler} className={activeListID === 25 ? 'active' : ""}>
            <ul className="SidebarList">
                <li className="row" >
                    <div>
                        <Avatar
                            size="md"
                            margin="30px"
                            cursor="pointer"
                            name={user.name}
                            src={user.pic}
                        />
                    </div>
                    <div className="userInfo">
                        <span className="name">{user.name}</span>
                        <span>hello how are you</span>
                        <span>24 feb</span>
                    </div>

                </li>
            </ul>
        </div>
    )
}

export default SingleChats