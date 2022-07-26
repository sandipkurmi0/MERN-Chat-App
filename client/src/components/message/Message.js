import './message.css'
import moment from 'moment';


const message = ({ message, own }) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className='messageImg'
                    src="https://images.pexels.com/photos/10677497/pexels-photo-10677497.jpeg?cs=srgb&dl=pexels-cottonbro-10677497.jpg&fm=jpg" alt="" />
                <p className='messageText'>{message.message}</p>
            </div>
            <div className="messageBottom">
                {moment(message.createdAt).calendar()}
            </div>
        </div>
    )
}

export default message