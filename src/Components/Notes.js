import React,{useContext} from 'react'
import second from "../Context/notes/Notecontext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

export default function Notes() {
    const first = useContext(second)
    const { notes } = first;
  return (
      <>
          <AddNote /> 
          <div className="row">
              <h1 className='my-2'>Your Notes</h1>
              {notes.map((note) => {
                  return <Noteitem key={note._id} notes={note} />
              })}
          </div>

      </>
  )
}
