const express=require('express');
const mongoose=require('mongoose')
const users=require('./routes/api/users.js')
const profile=require('./routes/api/profile.js')
const posts=require('./routes/api/posts.js')
const bodyParser=require('body-parser')
const passport=require('passport')
const path=require('path')

const app=express()

//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//db config
const db=require('./config/keys').mongoURI

//connect to mongoDB
mongoose.connect(db).then(()=>console.log('MongoDb connected')).catch(err=>console.log(err))

//passport middleware
app.use(passport.initialize())

//passport config
require('./config/passport')(passport)


//ap 

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html')
    })
}

const port =process.env.PORT || 5000

app.listen(port,()=>console.log(`Server running on port ${port}`))