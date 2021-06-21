const express=require('express')
const fs=require("fs");
const app=express();
const morgan=require('morgan')
//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next()
})
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const port=3000
// tour router handlers
const getAllTours=(req, res)=>{
    res.status(200).json({status:"success", requestAt: req.requestTime, data:{tours}})
}
const getSingleTour=(req,res)=>{
    const id=req.params.id *1 
    if(id>tours.length){
       return res.status(404).json({status:"faild", message:"not find id"})
    }
    const tour=tours.find(el=>el.id===id)
    res.status(200).json({tour:tour})

}
const createTour=(req,res)=>{
    const newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),
    (err)=>{
        if(err) console.log(err);
        else {
            res.json({status:'success',data:{tour:newTour}})
        }
    }
    )  
}
const updateTour=(req, res)=>{
    if(req.params.id *1 >tours.length){
        return res.status(404).json({status:"faild", message:"not find id"})
     }
    res.status(200).json({status:"success", message:"it is updated"})

}
const deleteTour= (req, res)=>{
    if(req.params.id *1 >tours.length){
        return res.status(404).json({status:"faild", message:"not find id"})
     }
    res.status(404).json({status:"success", message:"it is deleted"})

}
//user router handlers
const getAllUsers=(req,res)=>{
    res.status(500).json({status:'error', message:"this error is not defined"})
}
const getSingleUser=(req,res)=>{
    res.status(500).json({status:'error', message:"this error is not defined"})
}
const createUser=(req,res)=>{
    res.status(500).json({status:'error', message:"this error is not defined"})
}
const updateUser=(req,res)=>{
    res.status(500).json({status:'error', message:"this error is not defined"})
}
const deleteUser=(req,res)=>{
    res.status(500).json({status:'error', message:"this error is not defined"})
}
//tours routes
const tourRouter=express.Router();
const userRouter=express.Router();
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
tourRouter.get('/', getAllTours)
tourRouter.get('/:id',getSingleTour )
tourRouter.post('/', createTour)
tourRouter.patch('/:id', updateTour )
tourRouter.delete('/:id', deleteTour)
//users routes
userRouter.get('/',getAllUsers)
userRouter.get('/:id',getSingleUser)
userRouter.post('/', createUser)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
//start server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})