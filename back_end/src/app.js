import express from 'express'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import courseRouter from './routes/courses.routes.js'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import paymentRouter from './routes/payment.routes.js'

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cors({
  origin: true,          // Allow ALL origins dynamically
  credentials: true      // Allow cookies (MOST IMPORTANT)
}))

app.use('/course',courseRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use("/payment", paymentRouter);


app.get('/',(req,res)=>{
    res.send('welcome to course app')
})

export default app;