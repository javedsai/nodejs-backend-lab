const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phone: {type: String},
    address: {type: String}
})

contactSchema.plugin(mongoosePaginate)

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact