var express= require('express')
var router= express.Router()
var Restaurant= require('../models/restaurant')
var middleware= require('../middleware')

// INDEX- show all restaurants
router.get('/', function(req, res){
    //get all restaurants from DB
    Restaurant.find({}, function(err, allrestaurants){
        if(err){
            console.log(err)
        } else{
            res.render('restaurants/index', {restaurants: allrestaurants})
        }
    })
})

// CREATE- add new restaurants to DB
router.post('/', middleware.IsLoggedIn,function(req,res){
    var name = req.body.name
    var city = req.body.city
    var phone = req.body.phone
    var menu= {
        dish: req.body.dish,
        price: req.body.price
    }
    var author= {
        id: req.user._id,
        username: req.user.username
    }
    var newRestaurant= {name: name, city:city, phone:phone, menu:menu, author:author}
    
    Restaurant.create(newRestaurant, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else{
            res.redirect('/restaurants')
        }
    })
})
//NEW- show form to create new restaurants
router.get('/new',middleware.IsLoggedIn, function(req,res){
    res.render('restaurants/new')
})

//SHOW- shows more info about one restaurant
router.get('/:id', function(req, res){
    //find the restaurant with provided id
    Restaurant.findById(req.params.id).populate('comments').exec(function(err, foundRestaurant){
        if(err)
        console.log(err)
        else{
            //render show template with that restaurant
            res.render('restaurants/show', {restaurant: foundRestaurant})
        }
    })
})

//EDIT RESTAURANT ROUTE
router.get('/:id/edit',middleware.checkRestaurantOwnership,function(req, res){
   Restaurant.findById(req.params.id, function(err, foundRestaurant){
        res.render('restaurants/edit', {restaurant: foundRestaurant})        
    })
})

//Update Restaurantroute
router.put('/:id', middleware.checkRestaurantOwnership, function(req, res){
    //find and update correct restaurant
    Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updatedRestaurant){
        if(err){
            res.redirect('/restaurants')
        } else {
            res.redirect('/restaurants/'+ req.params.id)
        }
    })
})
module.exports = router