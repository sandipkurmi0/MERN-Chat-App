import Service from './Service';

class ChatService extends Service {
    constructor(model) {
        super(model);
        this.accessChat = this.accessChat.bind(this);


    }

    async accessChat(item, user) {

    }

}

export default ChatService;
