const { Schema, Types } = require('mongoose');

//reaction schema
const reactionSchema = new Schema({

    //reactionId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    //reactionBody
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    //username
    username: {
        type: String,
        required: true
    },
    //createdAt
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);

//export schema
module.exports = reactionSchema;