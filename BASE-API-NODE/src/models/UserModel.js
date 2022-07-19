import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class UserModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: [true, 'Please add a email address'],
          unique: true,
          match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
        },
        password: {
          type: String,
          required: [true, 'Please add a Password'],
          // minlength: 6,

        },
        pic: {
          type: String,
          default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
      },
      {
        timestamps: true,
      },
    );
    schema.plugin(uniqueValidator);
    mongoose.model('users', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('users');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('users');
  }
}

export default UserModel;
