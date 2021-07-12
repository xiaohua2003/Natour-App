const mongoose=require('mongoose');
const dotenv=require('dotenv');
//read variable from files and save them as environment variables
dotenv.config({path:'./config.env'});
const app = require('./app');
const DB=process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{useNewUrlParser:true, 
    useCreateIndex:true,
    useFindAndModify:false
}).then(con=>{
    
    console.log('connection was successful')
});
//start server
const port = 5000||process.env.PORT
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})