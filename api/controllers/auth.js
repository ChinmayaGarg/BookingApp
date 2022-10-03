import User from '../models/User.js';

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    await newUser.save();

    res.status(201).send('User has been created.');
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


*/
