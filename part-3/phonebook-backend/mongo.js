const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL
console.log(url)

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then((res) => {
    console.log('connection success')
  })
  .catch((err) => {
    console.error(err)
  })

const personSchema = mongoose.Schema({
  number: {
    type: String,
    required: [true, 'User phone number required'],
    validate: {
      validator: function (v) {
        return /\d{3}-\d{7}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
  name: {
    type: String,
    required: true,
    minLength: 8,
  },
})

// personSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
const Person = mongoose.model('Person', personSchema)
module.exports = Person
