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
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A tour must have a name'],
        unique:true
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:[true, 'A tour must have a price']
    }
});
const Tour=mongoose.model('Tour',tourSchema);
const testTour=new Tour({
    name:"Love",
    price:2.5,
    rating:5
    
})
testTour.save().then(doc=>console.log(doc)).catch(err=>{
    console.log('error message:', err)
})
//start server
const port = 5000||process.env.PORT
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})