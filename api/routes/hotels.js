import express from 'express';

import Hotel from '../models/Hotel.js';
const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);
  console.log(newHotel, 'newHotel');

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
// UPDATE
// DELETE
// GET
// GET ALL

export default router;

/*
MangoDB DB-> Collections-> Documents-> Key-Value Pairs
https://www.geeksforgeeks.org/mongodb-database-collection-and-document/

const newHotel = new Hotel(req.body);
  newHotel is the object (document) that store hotel information (key-value pairs) and 
  it will store in the form of HotelScema of Hotel model inside Hotel Collection and 
  newHotel will get data from request made by the client. req is request that we are taking from user/client

router.post('/:id?limit=5', async (req, res) => {
  To take parameter inside the endpoint we can add colon and then the variable name. Then with the help of question mark we can query.
  
const savedHotel = await newHotel.save();
  The save() method is asynchronous, so it returns a promise that you can await on.
  https://mongoosejs.com/docs/documents.html
  https://masteringjs.io/tutorials/mongoose/save
*/
