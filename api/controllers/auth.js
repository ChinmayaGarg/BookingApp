import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });

    await newUser.save();

    res.status(201).send('User has been created.');
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User not found!'));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, 'Wrong Password or Username'));

    // Generate random key using following command "openssl rand -base64 32", to encrypt data in the token.
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'process.env.JWT');
    const { passwrord, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie('access_token', token, {
        httponly: true
      })
      .status(200)
      .send({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

/*

	const newUser = new User(req.body)

	We are not directly writing req.body and instead we are separately writing the object like below because,
	we will encode (encrypt) the password to store with more security.

	const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });


------------------------------------------------------------------------------------------------------------------------

// third parameter lets you set configuration, and we set httponly to true.
The httpOnly property takes a boolean (true/false) value, 
here specifying whether or not the cookies should be accessible via JavaScript in the browser. 
This setting is forced to true, because it ensures that any cross-site scripting attacks (XSS) are impossible. 
We don't have to worry about the development environment here as this setting does not have a dependency on SSL or 
any other browser features.

    .cookie('access_token', token, {
        httponly: true
      })
*/
