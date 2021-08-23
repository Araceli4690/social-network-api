const { Schema, model } = require('mongoose');
//get thought schema
const Thought = require('./Thought');


//create user schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//virtual that retrieves the length of the users friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('User', User)
//export user model
module.exports = User;

