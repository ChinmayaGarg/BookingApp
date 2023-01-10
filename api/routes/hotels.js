import express from 'express';
import { createHotel, deleteHotel, getHotels, getHotel, updateHotel, countByCity } from '../controllers/hotel.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post('/', verifyAdmin, createHotel);

// UPDATE
router.put('/:id', verifyAdmin, updateHotel);

// DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

// GET
router.get('/:id', getHotel);

// GET ALL
router.get('/', getHotels);

//GET BY CITY
router.get('/countByCity', countByCity);

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

router.put('/:id', async (req, res) => {
const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true });
  1. We created a PUT request.
  2. We passed a param id by :id inside endpoint
  3. We used that id from params to find the document in "hotels" collection
  4. Than we updated the document's key-value pairs that we needed to update

$set: req.body
  It is the MongoDBs set method, here we have passed what we want to change (i.e. what client requested)

new:true
  In findByIdAndUpdate we passed new true, which will return document after updating and not the one that is not updated.
  Depending on APIs requirement either original/old document is returned or the updated one.

  
With the help of API Platform like Postman or Insomnia, we can check by sending requests to the API.

1. For POST request for Hotel we can use following data in our request:
          API Request URL: localhost:8800/hotels
          API Request Body: 
                            {
                              "name":"Hotel Name",
                              "type": "Hotel",
                              "city": "Hotel City",
                              "address": "Hotel Address",
                              "distance":"500",
                              "title":"Best Hotel In the City",
                              "desc": "Hotel Description",
                              "cheapestPrice":100
                            }

2. For PUT request for Hotel we can use following data in our request:
          API Request URL: localhost:8800/hotels/6300c8524ac26fbd5724e706
          API Request Body: 
                            {
                              "name":"Hotel Name Updated"
                            }

3. For DELETE request for Hotel we can use following data in our request:
          API Request URL: localhost:8800/hotels/6300c8524ac26fbd5724e706
          API Request Body: null

4. For GET request for Hotel we can use following data in our request:
          API Request URL: localhost:8800/hotels/6300c8524ac26fbd5724e706
          API Request Body: null

5. For GET ALL request for Hotel we can use following data in our request:
          API Request URL: localhost:8800/hotels
          API Request Body: null

LEARNING: Handling same HTTP requests with different paths and params
// GET
router.get('/:id', getHotel);
//GET BY CITY
router.get('/countByCity', countByCity);
Now when we will request using HTTP request "localhost:8800/hotels/countByCity?cities=berlin,madrid,london",
the expected behavior is to hit the "GET BY CITY" route. 
But what actually happens is API will get the request and will treat everything after "/" i.e. "countByCity?cities=berlin,madrid,london" as id
because
1. Both are get request handlers 
2. the APIs "GET" route is hit first than "GET BY CITY"
3. As both the routes have 1 slash, the "GET" route after slash is taking in 'id' param. 
   So, API will go to the "GET" route and see okay so this handles get requests and the GET HTTP request have 1 "/" and after it everything is param.
SOLUTION: Therefore we have to change the "GET" route from "/:id" to "/find/:id"
          router.get('/:id', getHotel); -> router.get('/find/:id', getHotel);

*/
