import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const Api_url  = process.env.ApiUrl;
console.log(Api_url );

const app = express();
app.use(express.static('public'));

const users = [
    {name: 'user1', email: 'user1@gmail.com'},
    {name: 'user2', email: 'user2@gmail.com'}
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
    let data= '';
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        const newUserDatas = JSON.parse(data);
        users.push(newUserDatas)
       
    })
    res.send(users)
});

app.listen(3000, () => {
    console.log("Server started: listening on port 3000")
});