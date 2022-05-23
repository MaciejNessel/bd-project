const mongoose = require('mongoose');
const Item = require('./Item');
const User = require('./User');
const Schema = mongoose.Schema
var ValidationError = mongoose.Error.ValidationError;
var ValidatorError  = mongoose.Error.ValidatorError;

const item_in_orderSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    price: {
        type: Number,
        min: 0.01,
        required: true
    },      //gender zawiera sie w item
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
    }
})

const orderSchema = new Schema( {
    user_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['unpaid', 'paid', 'cancelled']
    },
    products: {
        type: [item_in_orderSchema],
        required: true
    }});


async function validateOrder(next)
{
    
    //  this = document. Bcs type is 'validate'
    //  user check
    /*if(! await User.exists({user_id: this.user_id}))
    {
        var error = new ValidationError(this);
        error.errors.user = new ValidationError('user_id', 'user_id is not valid', 'notvalid', this.user_id);
        console.log("nain3");
        return error;
    }*/

    //  quantity check & item check
    let _products = {};
    this.products.forEach(async product =>{
        if(_products[product.item_id] == undefined)
        {
            _products[product.item_id] = product.quantity;
        }
        else
        {
            _products[product.item_id] += product.quantity;
        }

        if(! await Item.exists({item_id: product.product_id}))
        {
            var error = new ValidationError(this);
            return error;
        }
    })
    let count = Object.keys(_products).length;
    let count_ = 0;
    
    return await new Promise((resolve, reject) => {
        Object.keys(_products).forEach(async product_id =>{
            
            await Item.findById(product_id).then(item =>{
                count_++;
                if(item.quantity_in_stock < _products[product_id])
                {
                    var error = new ValidationError(this);
                    reject(error)
                }
            }).then(() => {
                if(count_ == count)
                {
                    resolve();
                }
            })
        })
    })
}

orderSchema.pre('validate', validateOrder)

async function saveOrder()
{
    //  this = document. Bcs type is 'save'
    //  change Item quantity in stock
    let products = {};
    this.products.forEach(product =>{
        if(products[product.item_id] != 0)
            products[product.item_id] = product.quantity;
        else
            products[product.item_id] += product.quantity;
    })
    await Object.keys(products).forEach(async product_id =>{
        await Item.findById(product_id).then(async res=>{
            await Item.findByIdAndUpdate(product_id, { $set: {quantity_in_stock: res.quantity_in_stock - products[product_id]}})
        });
    });
}

orderSchema.post('save', saveOrder)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order