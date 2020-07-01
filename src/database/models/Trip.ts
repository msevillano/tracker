import mongoose, { model } from 'mongoose';

const TripSchema = new mongoose.Schema({
  vehicleId: {
    type: Number,
    required: true
  },
  tripDate: {
    type: Date,
    required: true
  }
});

export default model('Trip', TripSchema);
