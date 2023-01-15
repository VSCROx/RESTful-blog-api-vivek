const express = require("express");
require("./db/conn");
const Blog = require("./models/blogs");
const blogRouter = require("./routers/blogs");
const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(blogRouter);
app.use(userRouter);


app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})