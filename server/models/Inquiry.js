import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_email: { type: String, required: true },
  user_phone: { type: String, required: true },
  tour_interest: { type: String, required: true },
  guests: { type: Number, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // For your dashboard
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);
export default Inquiry;