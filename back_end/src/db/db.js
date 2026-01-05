import mongoose from 'mongoose';

function connect(){
    mongoose.connect(process.env.MONGODB_URI).then(function(){
        console.log('db connected successfully')
    }).catch((err)=>{
      console.log(err)
    })
}

export default connect