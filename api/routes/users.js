import express from 'express';
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkAuthentication', verifyToken, (req, res, next) => {
//   res.send('Hello user, you are logged in.');
// });

// router.get('/checkUser/:id', verifyUser, (req, res, next) => {
//   res.send('Hello user, you are logged in and you can delete your account.');
// });

// router.get('/checkAdmin', verifyAdmin, (req, res, next) => {
//   res.send('Hello admin, you are logged in and can delete all accounts.');
// });

// UPDATE
router.put('/:id', updateUser);

// DELETE
router.delete('/:id', deleteUser);

// GET
router.get('/:id', getUser);

// GET ALL
router.get('/', getUsers);

export default router;
