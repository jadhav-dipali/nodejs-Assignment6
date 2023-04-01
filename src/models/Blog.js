const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic:{
        type:String,
        require:true,
        minlength:3,
        lowercase:true,
    },
    description:String,
    posted_at:{
        type:Date,
        require:true
    },
    posted_by:{
        type:String,
        require:true,
        minlength:3,
        lowercase:true,
    },

})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;