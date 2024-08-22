const {getUser} = require('../service/auth')

// function for restrcting user in login process...
async function restrectToLoggedInUserOnly(req,res,next){
    const userId = req.cookies?.uid;

    if(!userId) return res.redirect("/login");
    const user = getUser(userId);
  
    if(!user) return res.redirect("/login");
    
    req.user = user;
    next();
}

module.exports = {
    restrectToLoggedInUserOnly
}