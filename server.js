const express = require('express');
const bcrypt = require('bcrypt')

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//create a db for now since we don't have one connected yet
const database = {
    users: [
        {
            id: '123',
            name: 'John', 
            email: 'john@gmail.com', 
            password: 'cookies', 
            entries: 0,
            joined: new Date()
        }, 
        {
            id: '124',
            name: 'Susie', 
            email: 'susie@gmail.com', 
            password: 'bananas', 
            entries: 0,
            joined: new Date()
        }
    ]
}

//create a route
app.get('/', (req, res) => {
    res.json(database.users);
})

/*
/signin now what we want is a sign in route - POST request - responds with success or fail
we also want a /register route - POST - return created user
profile of user with optional parameter - /profile/:userId - GET - returns user
/image - PUT - return updated user object or count which we will call entries
*/

app.post('/signin', (req, res) => {
    for (let j =0; database.users.length; j++){
        if(req.body.email === database.users[j].email && req.body.password === database.users[j].password){
            res.json("successful login");
        } 
    } //for some reason this is not working but the loop above does 
    res.status(400).json("error login in");
    
})

app.post('/register', (req, res) =>{
    const { name, email, password} = req.body;
    database.users.push({
        id: '125', 
        name: name, 
        email: email, 
        password: password, 
        entries: 0, 
        joined: new Date()
    });
    const lastItem = database.users[database.users.length -1];
    res.json(lastItem);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    for (let j =0; database.users.length; j++) {
        if (database.users[j].id === id){
            res.json(database.users[j]);
        } 
    } 
    res.status(404).json("no such user");
})

app.put('/image', (req, res) =>{
    const { id } = req.body;
    for (let j =0; database.users.length; j++) {
        if(database.users[j].id === id){
            database.users[j].entries++;
            res.json(database.users[j].entries);
        }
    }
    res.status(404).json("user not found to add entry");
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


//in the second argument (the listen) we call a function to console that it's listening 
app.listen(3000, () =>{
    console.log("server is running");
})

