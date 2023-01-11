import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  console.log(newHotel, 'newHotel');

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const hotel = await Hotel.find();
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map(city => {
        // return Hotel.find({ city: city }).length;
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount }
    ]);
  } catch (err) {
    next(err);
  }
};

/*

const cities = req.query.cities; 
-- This will return the string cities passed in query after question mark i.e. localhost:8800/hotels/countByCity?cities=berlin,madrid,london
"berlin,madrid,london"

const cities = req.query.cities.split(',');
-- This will return the array of cities passed in query after question mark by splitting them at comma i.e. localhost:8800/hotels/countByCity?cities=berlin,madrid,london
[berlin, madrid, london]

Promise.all()
-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

// return Hotel.find({ city: city }).length;
return Hotel.countDocuments({ city: city });
-- We have not used 1st query, instead we used second query to find the no. of hotels in a city because 
1st query is costly as it first fetches data and then counts,
while 2nd method countDocuments is MongoDB built-in method.
https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/
Unlike db.collection.count(), db.collection.countDocuments() does not use the metadata to return the count. 
Instead, it performs an aggregation of the document to return an accurate count, even after an unclean shutdown or 
in the presence of orphaned documents in a sharded cluster.



*/
