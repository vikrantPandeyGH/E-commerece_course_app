//express server start karna
//db connect karna
import dotenv from 'dotenv';
dotenv.config()

import app from './src/app.js'
import connect from './src/db/db.js'


connect()
app.listen(process.env.PORT,()=>{
    console.log('server is running on port '+process.env.PORT);
})