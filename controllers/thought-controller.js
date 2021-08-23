const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'thoughtSchema',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            })
    },
    //add thought to user
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
            .then(({ __id }) => {
                //PUT update thought by its id
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if (!dbUserData) {
                    res.status(404).json({ message: 'no user found with this id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    //POST reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'no use found with this id' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },
    //delete thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'no thought with this id' })
                }
                return User.findOneAndUpdate(
                    { _id: pramas.id },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'no user foudn with this id' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },
    //delete reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }

};

module.exports = thoughtController;