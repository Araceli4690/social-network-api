const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            })
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbUserData) => {
                //if no thought data is found
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //add thought to user
    addThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                //PUT update thought by its id
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'no user found with this id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },
    //update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No thought found with this ID" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },
    //delete thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "no thought found with this id" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
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