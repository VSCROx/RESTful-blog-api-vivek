const mongoose = require("mongoose");
const validator = require("validator");

const blogSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    publish_Date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique: [true, "Plagiarism found in the content!"],
        maxlength: 10000
    }
})

//we will create a new collection
const Blog = new mongoose.model('Blog', blogSchema);

module.exports = Blog;