var Restaurant= require('../models/restaurant')
// all the middleware goes here
var middlewareObj= {}

middlewareObj.checkRestaurantOwnership= function(req, res, next){
    if(req.isAuthenticated()){ 
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err){
                req.flash('error', 'Restaurant not found')
                res.redirect('back')
            } else {
                // does user own the campground?
                if(foundRestaurant.author.id.equals(req.user._id)){
                    next()
                } else {
                    req.flash('error', 'You dont have permission to do that')
                    res.redirect('back')
                }
            }
        })
    } else {
        req.flash('error', 'You need to be logged in to do that')
        res.redirect('back')
    }
}

middlewareObj.IsLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error', 'You need to be logged in to do that')
    res.redirect('/login')
}

module.exports= middlewareObj