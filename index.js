const express = require('express');
const { MongoClient, Collection, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;
//Username: inventory_system
//Password: A1bIH4uke36Iyhss


// MongoDB connect
const uri = "mongodb+srv://inventory_system:A1bIH4uke36Iyhss@cluster0.c0wuh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function dbRun (){
    try{
        await client.connect();
        const userDB = client.db("userDB");
        const usercollection = userDB.collection("collections");

        //GET API
        app.get('/inventorylist', async(req, res)=>{
            const collectuser = usercollection.find({});
            const resultquery = await collectuser.toArray();
            res.send(resultquery);
        })
        // UPDATE API
        app.put('/inventorylist/:id', async(req, res)=>{
            
        })

        // POST API
        app.post('/adduser', async (req, res)=>{
            const userinsert = req.body;
            const result = await usercollection.insertOne(userinsert);
            console.log(result);
            res.json(result);
        })

        app.delete('/inventorylist/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await usercollection.deleteOne(query);
            console.log("delete successfull", id);
            res.json(result);
        })

        
        
    }finally{
        // await client.close();
    }

}
dbRun().catch(console.dir);






app.listen(port, function(){
    console.log(`Server port is: ${port}`);
})