const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    returned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
var Issues = mongoose.model('Issue',issueSchema);

module.exports=Issues;