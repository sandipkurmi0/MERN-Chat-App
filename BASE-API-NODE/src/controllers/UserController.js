import bcrypt from 'bcrypt';
import Controller from './Controller';
import User from '../models/UserModel';
import UserService from '../services/UserService';

const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
    this.addUser = this.addUser.bind(this);
    this.login = this.login.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.search = this.search.bind(this);
  }

  async addUser(req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    var userData = req.body;
    userData.password = hash;
    const response = await this.service.insert(userData);
    return res.status(response.statusCode).send(response);
  }

  async registerUser(req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    var userData = req.body;
    userData.password = hash;
    const response = await this.service.registerUser(userData);
    return res.status(response.statusCode).send(response);
  }

  async login(req, res) {
    const response = await this.service.login(req.body);
    return res.status(response.statusCode).send(response);
  }

  async search(req, res) {
    const response = await this.service.search(req.query, req.user.id);
    return res.status(response.statusCode).send(response);
  }

}

export default new UserController(userService);
