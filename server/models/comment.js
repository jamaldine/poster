const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postId:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        default:'n/a'
    },
    userId:{
        type: String,
        required: true
    },
    delete:{
        type: Boolean,
        default:false
    },
    commentBackId:{
        type: String,
        default:'n/a'
    }
}, {timestamps:true})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment }