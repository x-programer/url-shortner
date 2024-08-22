const shordid = require('shortid');
const URL = require('../models/url')

async function handleShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});

    const shortId = shordid();
    await URL.create({
        shortId : shortId,
        redirecturl: body.url,
        visithistor: []
    })

    return res.render('home' , {
        id:shortId,
    });    
    // return res.json({id: shortId})
}

module.exports = {
    handleShortUrl
}