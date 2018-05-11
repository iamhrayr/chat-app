const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation'
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        body: String
        // receiver:
    },
    { timestamps: true }
);

mongoose.model('Message', messageSchema);
