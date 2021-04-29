const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type: String,
        default:'n/a'
    },
    content:{
        type: String,
        required: true
    },
    img:{
        type: Array,
        default:'n/a'
    },
    video:{
        type: String,
        default:'n/a'
    },
    delete:{
        type: Boolean,
        default:false
    },
    userId:{
        type: String,
        required: true
    }
}, {timestamps:true})

const Post = mongoose.model('Post', postSchema)

module.exports = { Post }