import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const Api_url  = process.env.ApiUrl;
console.log(Api_url );

const app = express();
app.use(express.static('public'));
app.use(express.json())

const users = [
    {name: 'user1', email: 'user1@gmail.com', id: "1"},
    {name: 'user2', email: 'user2@gmail.com', id: "2"}
]


const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>hello world</h1>
<script type="text/javascript">
    console.log("hello")
    localStorage.setItem("ApiUrl", "${Api_url }")
    window.location.href= '/'
</script>
</body>
</html>
`



app.get('/api', (req:Request, res: Response) => {
    res.send(html)
})
app.get('/api/users', (req:Request, res:Response) => {
    res.send(users)
});



app.post('/api/users', (req:Request, res:Response) => {
    const dataFromScript =req.body;
    users.push(dataFromScript)
    res.send(users)
});

app.put('/api/users', (req: Request, res: Response) => {
    const userReqid = req.body.email;
    // console.log(userReqid)
    const isSameId = users.find(user => user.email === userReqid)
    // console.log("hello")
    // console.log(isSameId)
    if(isSameId){
        isSameId.name = req.body.name;
        res.send(users);
    }
    
});

app.delete('/api/users', (req:Request, res:Response) => {
   
    const isEmail = users.find(user => user.email === req.body.email)
    console.log(isEmail)
    if(isEmail){
        const indexUser = users.indexOf(isEmail);
        console.log(indexUser)
        users.splice(indexUser, 1);
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Powered-By', 'Express');
        res.send(users)
    }else{
        res.send("<h1>Pages are not found</h1>")
    }
})

app.listen(3000, () => {
    console.log("Server started: listening on port 3000")
});