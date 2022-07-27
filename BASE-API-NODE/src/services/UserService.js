import Service from './Service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService extends Service {
  constructor(model) {
    super(model);
    this.login = this.login.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.search = this.search.bind(this);
  }

  async search(item, user) {
    try {
      const keyword = item.search ? {
        $or: [
          { name: { $regex: item.search, $options: "i" } },
          { email: { $regex: item.search, $options: "i" } },
        ],
      } : {};

      const users = await this.model.find(keyword).find({ _id: { $ne: user } })

      return {
        error: false,
        statusCode: 200,
        data: users,
      }

    } catch (error) {
      return {
        error: error.message,
        statusCode: 400,
        data: null
      }
    }

  }

  async registerUser(item) {

    const { name, email, password, pic } = item

    if (!name || !email || !password) {
      return {
        error: 'Plese Enter all the feilds',
        statusCode: 400,
        data: null
      };
    }

    const userExist = await this.model.findOne({ "email": item.email })

    if (userExist) {
      return {
        error: 'User already exists',
        statusCode: 400,
        data: null
      };
    }

    try {
      const user = await this.model.create({
        name: item.name,
        email: item.email,
        password: item.password,
        pic: item.pic
      })

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })


      if (user) {
        return {
          error: false,
          statusCode: 200,
          message: "User Register successfully",
          data: user,
          token: token
        }
      }

    } catch (error) {
      return {
        error: error.message,
        statusCode: 400,
        data: null
      }
    }
  }


  //login user
  async login(item) {
    try {
      let user = await this.model.findOne({ "email": item.email })
      if (user) {
        let results = await bcrypt.compareSync(item.password, user.password);
        if (results) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
          return {
            error: false,
            message: 'login successfully',
            statusCode: 200,
            data: user,
            token: token,
          };
        } else {
          return {
            error: 'You entered the wrong email or password',
            statusCode: 401,
            data: null
          };
        }
      } else {
        return {
          error: 'You entered the wrong email or password',
          statusCode: 401,
          data: null
        };
      }
    } catch (error) {
      return {
        error: error.message,
        statusCode: 400,
        data: null,
      };
    }
  }

}

export default UserService;
