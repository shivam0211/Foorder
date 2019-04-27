var express= require('express')
var app= express()
var bodyParser= require('body-parser')
var mongoose= require('mongoose')
var flash= require('connect-flash')
var passport= require('passport')
var LocalStrategy= require('passport-local')
var User= require('./models/user')
var indexRoutes= require('./routes/index')
var restaurantRoutes= require('./routes/restaurants')
var Restaurant= require('./models/restaurant')

mongoose.connect('mongodb://localhost/foodapp')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(flash())

//Passport Configuration
app.use(require('express-session')({
    secret: 'my first authenticaton',
    resave: false,
    saveUninitialized: false 
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser= req.user
    res.locals.error= req.flash('error')
    res.locals.success= req.flash('success')
    next()
})
app.use('/' ,indexRoutes)
app.use('/restaurants', restaurantRoutes)

app.listen(5000, () => console.log('The Foodapp Server has started!'))