import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Link } from "react-router-dom"


const Blog = ({ blog, setblog, user, setMessage }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    color: 'red'
  }



  const removeBlog = async () => {
    await blogService.remove(blog)
    const updatedBlogs = await blogService.getAll()

    setMessage('Blog succesfully deleted')
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setblog(updatedBlogs)
  }

  return (
    <div style = {blogStyle}>
      <div>
        <p>
          <Link to={`blogs/${blog.id}`}>{blog.title} - {blog.author}</Link> 
        </p>
        <button style={buttonStyle} onClick={removeBlog}>remove</button>
      </div>
     </div>     
     )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,

}


export default Blog
