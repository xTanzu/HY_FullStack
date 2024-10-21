const blogsRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const AuthorizationError = require("../errors/AuthorizationError.js");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.status(200).json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = { ...request.body };
    const user = request.user;
    if (!user) {
      // return response.status(401).json({ error: "user not identified, authorization required" })
      throw new AuthorizationError();
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes ? likes : 0,
      user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog);
    await user.save();
    const populatedBlog = await savedBlog.populate("user", {
      username: 1,
      name: 1,
      id: 1
    })
    response.status(201).json(populatedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;
    if (!user) {
      throw new AuthorizationError();
      // return response.status(401).json({ error: "user not identified, authorization required" })
    }
    const blogToDelete = await Blog.findById(request.params.id);
    if (!(blogToDelete.user.toString() === user.id)) {
      return response.status(401).json({ error: "no persmission to delete" });
    }

    await Blog.findByIdAndDelete(blogToDelete.id);
    user.blogs = user.blogs.filter(
      (blogId) => blogId.toString() !== blogToDelete.id
    );
    await user.save();
    // response.status(204).end();
    response.status(200).json(blogToDelete);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    const populatedBlog = await updatedBlog.populate("user", {
      username: 1,
      name: 1,
      id: 1
    })
    response.status(200).json(populatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
