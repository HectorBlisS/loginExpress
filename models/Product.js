const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    price: String,

},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Product', productSchema);