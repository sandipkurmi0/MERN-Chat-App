import React from 'react'
import '../style.css'
import { ChatState } from '../../context/ChatProvider'
import { Avatar, } from '@chakra-ui/react'

const SingleChats = () => {
    const activeListID = 25
    const { user } = ChatState();

    const userSelectHandler = () => { }
    return (
        <div onClick={userSelectHandler} className={activeListID === 25 ? 'active' : ""}>
            <ul className="SidebarList">
                <li className="row" >
                    <div>
                        <Avatar
                            size="md"
                            margin="30px"
                            cursor="pointer"
                            name={user.data.name}
                            src={user.data.pic}
                        />
                    </div>
                    <div className="userInfo">
                        <span className="name">{user.data.name}</span>
                        <span>hello how are you</span>
                        <span>24 feb</span>
                    </div>

                </li>
            </ul>
        </div>
    )
}

export default SingleChats