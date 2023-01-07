import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';

// When we add our room we will also add the room from its hotel
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// When we delete our room we will also delete the room from its hotel
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json('Room has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

/*

1. await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: savedRoom._id }});
https://mongoosejs.com/docs/api.html#model_Model-findByIdAndUpdate
https://www.mongodb.com/docs/manual/reference/operator/update/push/
First Parameter is the id to find the collection in which we have to update.
Second para meter is the object that has key-value pair to update. But $push will tell mongo 
to push the value of the given keys rather than replacing. It says push savedRoom._id in the rooms key
rather than replacing rooms key's value with savedRoom._id.

*/
