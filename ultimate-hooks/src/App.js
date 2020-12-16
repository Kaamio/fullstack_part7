  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (e) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect( () => {    
    axios
    .get(baseUrl)
    .then(response => response.data)
    .then(data => setResources(data))         
  },[resources.length])

  const create = (resource) => {       
    axios
    .post(baseUrl, resource)
    .then(response => resources.concat(response))       
    .then(resources => setResources(resources))       
    

  }

  const service = {
    create
  }

  return [
    resources,
    service
  ]
}

const App = () => {
  const {reset: reset1, ...content} = useField('text')
  const {reset: reset2, ...name} = useField('text')
  const {reset: reset3, ...number} = useField('text')
  

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    reset1()    
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    reset2()
    reset3()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App