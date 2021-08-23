const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')
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

//create thought schema
const thoughtSchema = new Schema({
    //thouhgt text
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    //createdAt
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    //username
    username: {
        type: String,
        required: true
    },
    //reactions schema subdoc
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

//creating reaction count virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
//export module
module.exports = Thought;
