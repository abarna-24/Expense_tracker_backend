const express=require('express')
const mongoose=require('mongoose')
const app=express()
const port=3000
app.use(express.json())
const Expense=require('./models/expenses')
mongoose.connect('mongodb+srv://abarna:abarna123@cluster0.smn97pp.mongodb.net/ex-tracker?retryWrites=true&w=majority',{
    useUnifiedTopology: true
})
app.get('/expenses',async(req,res)=>{
    const expenses=await Expense.find()
    res.send(expenses)
})
app.get('/expenses/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const result=await Expense.findById(id);
    if(result)
      res.send(result);
    else
      res.send("no data");
    }catch(err){
        res.send(err);
    }
})
app.delete('/expenses/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const result=await Expense.findByIdAndDelete(id);
    if(result)
      res.send("Deleted");
    else
      res.send("no data");
    }catch(err){
        res.send(err);
    }
})

app.post('/addexpenses',async(req,res)=>{
    try{
    const newData=req.body;
    const result=await Expense.create(newData);
    if(result)
      res.send("Inserted");
    else
      res.send("no data");
    }catch(err){
        res.send(err);
    }
})

app.put('/updateexpenses/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const newData=req.body;
    const result=await Expense.findByIdAndUpdate(id, newData,{
        new:true
    });
    if(result)
      res.send("Updated");
    else
      res.send("no data");
    }catch(err){
        res.send(err);
    }
})

app.listen(port, ()=>{
    console.log('Example app')
})