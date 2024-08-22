const express = require('express');
const aap = express();
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect')
const URL = require('./models/url')
const path = require('path');
const staticRoute = require('./routes/staticRouter')
const userRoutes = require('./routes/user')
const cookieParser = require('cookie-parser')
const {restrectToLoggedInUserOnly} = require('./middlewares/auth')

const port = process.env.PORT || 5003

aap.use(express.json());
aap.use(express.urlencoded({ extended:false}));
aap.use(cookieParser());
aap.set('view engine' , 'ejs'); 
aap.set('views' , path.resolve("./views"));


// aap.get("/test" , async(req,res)=>{
//     const alUrls = await URL.find({});
//     return res.render('home',{
//         url: alUrls,
//     });
// })

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then((e)=>{
    console.log("Connected");
})

aap.use("/url" , restrectToLoggedInUserOnly , urlRoute);
aap.use('/' , staticRoute);
aap.use('/user' ,userRoutes )
// mongoose.connect('mongodb://127.0.0.1:27017/short-url', {useNewUrlParser: true, useUnifiedTopology: true}).then((e)=>{
//     console.log("Connected");
// });

aap.get("/url/:shortId" , async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push: {
            visithistor: {
                timestamp: Date.now(),
            }
        }
    }

    )

    res.redirect(entry.redirecturl);
})


aap.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });

// mongo db is not running 27017 port solve this problem ....
//time 18:14 vide time...
// running script : npm start