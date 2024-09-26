const express=require('express');
const { userInfo } = require('os');
const app=express();
const path=require('path');
const  {v4 : uuidv4} =require('uuid');
app.use(express.urlencoded({extended:true})) 
app.use(express.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs')

const comments=[
    {
        id:uuidv4(),
        username:'Tod',
        comment:'lol i was a great day'
    },
    {
        id:uuidv4(),
        username:'sharu',
        comment:'from shivamogaa'
    },
    {
        id:uuidv4(),
        username:'sujan',
        comment:'from kundapura'
    }
]
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
})
app.get('/tacos',(req,res)=>{
    res.send("  Get /tacos response");
})
app.post('/comments',(req,res)=>{
    // console.log(req.body);
    const {username,comment}=req.body;
    comments.push({username,comment,id:uuidv4()});
    // res.send("it worked"); but we need to redirect into get comments page
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
const comment=comments.find(c=>c.id===(id));
res.render('comments/show',{comment});

})
app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const newcommontext=req.body.comment;
const foundcomment=comments.find(c=>c.id===(id));
foundcomment.comment=newcommontext;
res.redirect('/comments');
})
app.post('/tacos' ,(req,res)=>{
    const {meat,qty}=req.body;
    res.send(`post /tacos response ${meat} and ${qty}`);
})
app.listen(3000,()=>{
    console.log("on port 3000");
})
