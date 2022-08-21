import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let noteId = useParams().id;
  // let note = notes.find((n) => n.id === Number(noteId));

  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, []);

  let getNote = async () => {
    // stop GET req if :id = new. We return nopthing just so that the rest doesnt exe
    if (noteId === "new") return;
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    await fetch(`http://127.0.0.1:8000/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
      method: "PUT",
      // mode: "cors",
      // cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = () => {
    fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  let handleSubmit = () => {
    console.log(note);
    if (noteId !== "new" && !note.body) {
      console.log("DEL triggered");
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    }
  };

  // state not updating on time with setNote() in jsx
  // function to fix
  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== "new" ? (
          <Link to="/">
            <button onClick={deleteNote}>Delete</button>
          </Link>
        ) : (
          <Link to="/">
            <button onClick={handleSubmit}>Done</button>
          </Link>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};
//setNote({ ...note, body: e.target.value });
export default NotePage;
