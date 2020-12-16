import React from 'react'
import { BrowserRouter as Router, useParams } from "react-router-dom"



const Blogs = (blogs)=> {    
    const id = useParams().id
    const blog = blogs.blogs.find(n => n.id === id)
    
    if (!blog) {
        return null
    } 

    return (
        <div>
            <h1>{blog.title}</h1>            
            <p>{blog.url}</p>             
        </div>        
    )
}   

export default Blogs