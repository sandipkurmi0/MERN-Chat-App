import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService extends Service {
    constructor(model) {
        super(model);
        // this.addUser = this.addUser.bind(this);
    }

}

export default UserService;
