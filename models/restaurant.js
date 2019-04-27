var mongoose= require('mongoose')

//Schema setup
var restaurantschema= new mongoose.Schema({
    name: String,
    city: String,
    phone: String,
    menu: {
        dish: String,
        price: String,
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})
module.exports = mongoose.model('Restaurant', restaurantschema)