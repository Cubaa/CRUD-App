const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const ejs = require('ejs')
const fs = require('fs')
const sass = require('node-sass')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware');
const UsersDB = require('./Schema/userSchema')
const app = express()

mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


const server = app.listen(4000, ()=>{
    console.log("Server startuje")
})



const users:any = []
let userId: number;
let tmpUserId: number;

app.get('/', async (req:any, res:any)=>{
    const data = await UsersDB.find({})
    tmpUserId = data.length;
    res.render('index');
  });

app.get('/users', async (req:any, res:any)=>{
    users.length = 0;
    const data = await UsersDB.find({})
    userId = data.length
    data.forEach((user:any, index: number)=>{
        
       const userData={
            id: index+1,
            username:user.username,
            lastname: user.lastname,
            city: user.city,
            birthdate: user.birthdate
        }
        
        users.push(userData)
    })
   
    res.send(users)
})
app.post('/user', async (req:any, res:any)=>{

    
    const username = req.body.username
    const lastname = req.body.lastname
    const city = req.body.city
    const birthdate = req.body.birthdate
    if(username==="")
        return 
    
    try{
        const response = await UsersDB.create({
            userId: tmpUserId+1,
            username,
            lastname,
            city,
            birthdate
        })
  
        }
        catch(error){
            if(error) throw error;
       
        }
       res.json({msg: "Dane wyslane"})
})


app.get('/users/:id', async (req: any, res: any)=>{
   
    const {id} = req.params
    
    const foundUser = await UsersDB.findOne({ userId: id + "" }).exec();
    if(foundUser===null) return res.send(`Brak użytkownika o id ${id}`)
    
    res.send(foundUser)
})

app.get('/success', (req:any, res:any)=>{
    res.render('success')
})

app.get('/allusers', async (req:any, res:any)=>{
    const data = await UsersDB.find({})
   res.render('allusers', {data})
})

app.get('/managePanel', (req: any, res: any)=>{
    res.render('managePanel')
})
app.delete('/users/:id', (req:any, res:any)=>{
    const {id} = req.params
    
    const deleteId = id.substr(1)
    
    UsersDB.findOneAndDelete({userId: deleteId + ""}, async function (err: any, docs: any) {
        if (err){
            
            res.json({msg: "Uzytkownik nie usuniety"})
        }
        else{
            
            res.json({msg: "Uzytkownik usuniety"})
            const data = await UsersDB.find({})
            
            
            const newData = data.map((item: any, index: number)=>{
              
                item.userId = index+1 + ""
                return item
            })
            UsersDB.deleteMany({}, ()=>{
                
            })
            
            for(let i=0; i<newData.length; i++){
                const a = new UsersDB({
                    userId: newData[i].userId,
                    username:  newData[i].username,
                    lastname: newData[i].lastname,
                    city:   newData[i].city,
                    birthdate: newData[i].birthdate
                })
                 await a.save()
            }
            
            
            
           
        }
    })
 
})

app.put('/users/:id', (req:any, res:any)=>{

const {id} = req.params
const updateId = id.substr(1)


UsersDB.findOneAndUpdate({userId: updateId + ""}, {$set:req.body}, {new: true}, (err:any, doc:any) => {
    if (err) {
        console.log("Nie udało sie znaleźć i zaktualizować")
        throw err;
    }
    
});

res.json({msg: "Dane zaktualizowane"})
})


module.exports = app;