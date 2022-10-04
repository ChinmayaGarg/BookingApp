import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, 'You are not Authenticated!'));

  jwt.verify(token, process.env.JWT, (err, user) => {
    console.log(err);
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

/*

We can write anything in place of "user" in "req.user", because we are assigning a new property to it.
jwt.verify(token, process.env.jwt, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
	
	(By this we are assigning a new property/data with key "user" or "hello" or "anything" to req) 
	req.user = user // req.hello = user or req.anything = user 
  
});

*/
