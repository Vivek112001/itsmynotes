import React,{useContext} from 'react';
import second from "../Context/notes/Notecontext"

export default function Noteitem(props) {
    const first = useContext(second)
    const { deleteNote, editNote,note} = first;
    const {notes}=props
  return (
      <>
          <div className="col-md-3">
              <div className="card my-3">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <h5 className="card-title">{notes.title}</h5>
                          <i className="fa-solid fa-trash mx-3" onClick={()=>deleteNote(notes._id)}></i>
                          <i className="fa-solid fa-pen-to-square"onClick={()=>editNote(notes._id,note.title,note.description,note.tag)}></i>
                      </div>
                      <p className="card-text">{notes.description}</p> 
                      
                  </div>
              </div>
          </div>
          
      </>
  )
}
