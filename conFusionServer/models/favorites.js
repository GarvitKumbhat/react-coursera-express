const mongoose = require('mongoose')
mongoose.plugin(function (schema) {
    schema.options.usePushEach = true;
});
const Schema = mongoose.Schema
const Dishes = require('./dishes')

const favoritesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
})

var Favorites = mongoose.model('Favorite', favoritesSchema)
module.exports = Favorites