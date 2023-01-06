import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    maxPeople: {
      type: Number,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
  },
  { timestamps: true }
);

export default mongoose.model('Room', RoomSchema);

/*
roomNumbers will look like below:
[
	{number:101, unavailableDates:[]},
	{number:102, unavailableDates:[]},
	{number:103, unavailableDates:[]},
	{number:104, unavailableDates:[]},
	{number:105, unavailableDates:[]},
	{number:106, unavailableDates:[]},
	{number:107, unavailableDates:[]}
]

*/
