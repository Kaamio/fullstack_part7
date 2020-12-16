import React from 'react'
import { BrowserRouter as Router, useParams } from "react-router-dom"

const Users = (users)=> {    
    const id = useParams().id
    const user = users.users.find(n => n.id === id)
    
    if (!user) {
        return null
    } 

    return (
        <div>
            <h2>{user.username}</h2>
            <h3>Added blogs</h3>
          <ul>           
            {user.blogs.map(details =>
              <li>{details.title} - {details.author}</li>          
            )}
          </ul> 
        </div>        
    )
}   

export default Users