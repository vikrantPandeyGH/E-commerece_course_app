import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Course'
  }   
})

const purchaseModel = mongoose.model('Purchase',purchaseSchema)
export default purchaseModel;