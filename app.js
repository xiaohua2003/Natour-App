const express=require('express')
const fs=require("fs");
const app=express();
app.use(express.json());

const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const port=3000
const getAllTours=(req, res)=>{
    res.status(200).json({status:"success", data:{tours}})
}
app.get('/api/v1/tours', getAllTours)
app.get('/api/v1/tours/:id', (req,res)=>{
    const id=req.params.id *1 
    if(id>tours.length){
       return res.status(404).json({status:"faild", message:"not find id"})
    }
    const tour=tours.find(el=>el.id===id)
    res.status(200).json({tour:tour})

})
app.post('/api/v1/tours',(req,res)=>{
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
    
})
app.patch('/api/v1/tours/:id', (req, res)=>{
    if(req.params.id *1 >tours.length){
        return res.status(404).json({status:"faild", message:"not find id"})
     }
    res.status(200).json({status:"success", message:"it is updated"})

})
app.delete('/api/v1/tours/:id', (req, res)=>{
    if(req.params.id *1 >tours.length){
        return res.status(404).json({status:"faild", message:"not find id"})
     }
    res.status(404).json({status:"success", message:"it is deleted"})

})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})