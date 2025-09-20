const User = require("../models/user")


module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};







module.exports.signup =  async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password); 
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wandernest!");
            res.redirect("/listings");
        });
        
        } catch (e) {
        // console.error("Error during signup:", error.message);
        req.flash("error", "e.message"); 
        res.redirect("/signup");
    }
};






module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};



module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to Wandernest!");
   let redirectUrl = res.locals.redirectUrl || "/listings";
    
  res.redirect(redirectUrl);
};


module.exports.logout = (req,res,next) => {
    req.logOut((err) => {
        if(err){
            // console.error("Error during logout:", err); 
            // req.flash("error", "Something went wrong during logout!");
            // return res.redirect("/listings");
            return next(err);
        }
        req.flash("success", "you are logged out !");
        res.redirect("/listings");
    });
};