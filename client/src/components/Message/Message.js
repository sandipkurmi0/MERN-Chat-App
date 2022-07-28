import React from 'react'
import moment from 'moment'
import './message.css'
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";

const Message = ({ message, own }) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <Tooltip label={message.sender.name} placement="bottom-start" hasArrow>
                    <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={message.sender.name}
                        src={message.sender.pic}
                    />
                </Tooltip>
                <p className='messageText'>{message.content}</p>
            </div>
            <div className="messageBottom">
                {moment(message.createdAt).calendar()}
            </div>
        </div>
    )
}

export default Message