import React, { useState, useEffect } from "react"
// import notes from "../assets/data";
import ListItem from "../components/ListItem"
import AddButton from "../components/AddButton"

const NotesListPage = () => {
  // SetNotes:  update state accesed by the API call
  // es como el state que se ira llenando con las notas fed by the DB
  // notes: the data object itself(list)
  let [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  }, [])

  // API call
  let getNotes = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/notes/")
    let data = await response.json()
    setNotes(data)
  }

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage
