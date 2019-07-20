const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '----Not available----'
    },
    isbn: {
        type: String,
        minlength: 10,
        maxlength: 13,
        required: true,
        unique: true
    },
    cat: {
        type: String,
        enum: ['Romance','Technology','Computer Science','Management','Electronics','Physics','Chemistry','Mathematics','Fiction','Philosophy','Language','Arts','Other'],
        required: true
    },
    copies: {
        type: Number,
        min: 1,
        max: 1000,
        required: true
    },
    shelf: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    floor: {
        type: Number,
        min: 0,
        max: 8
    }
}, {
    timestamps: true
});
var Books = mongoose.model('Book',bookSchema);

module.exports=Books;