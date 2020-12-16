import React from 'react'
import { BrowserRouter as Router, useParams } from "react-router-dom"
import blogService from '../services/blogs'


const Blogs = ({blogs, setblog})=> {    
    const id = useParams().id    
    const blog = blogs.find(n => n.id === id)
    
    const registerLike = async () => {
        const likedBlog = await blogService.putLike(blog)
        blog.likes = likedBlog
        const updatedBlogs = await blogService.getAll()
        setblog(updatedBlogs)
      }


    if (!blog) {
        return null
    } 

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <div>            
            <p>
                {blog.url}<br />
                {blog.likes} likes <button id="like_button" onClick={registerLike}>like</button><br />
                added by {blog.user.username}
            </p>             
            </div> 
        </div> 
    )
}   

export default Blogs