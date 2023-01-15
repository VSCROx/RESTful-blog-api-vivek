const express = require("express");
const router = new express.Router();
const Blog = require("../models/blogs");
const checkAuth = require("../middleware/auth");

// create blogs
router.post("/blogs", async(req, res)=>{
    try{
        const user = new Blog(req.body);
        const createBlog = await user.save();
        res.status(201).send(createBlog);
    }catch(e){
        res.status(400).send(e);
    }
})

//read the data of created blogs
router.get("/blogs", checkAuth, async(req, res)=>{
    try{
        const blogsData = await Blog.find();
        res.send(blogsData);
    }catch(e){
        res.send(e);
    }
})

//get the individual blog data using id
router.get("/blogs/:id", async(req, res)=>{
    try{
        const _id = req.params.id;
        const blogData = await Blog.findById(_id);
        console.log(blogData);
        if(!blogData){
            return res.status(404).send();
        }else{
            res.send(blogData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})


//update the blogs by its id
router.patch("/blogs/:id", async(req, res)=>{
    try{
        const _id = req.params.id;
        const updateBlogs = await Blog.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateBlogs);
    }catch(e){
        res.status(400).send(e);
    }
})


//delete the blogs by its id
router.delete("/blogs/:id", async(req, res)=>{
    try{
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteBlog);
    }catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;