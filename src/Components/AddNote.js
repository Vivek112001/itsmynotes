import React,{useState,useContext} from 'react'
import second from "../Context/notes/Notecontext";

export default function AddNote(props) {
    const first = useContext(second)
    const { addNote } = first;
    const [note, setNote] = useState({ title:"",description:"",tag:"default"})
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})    }
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    return (
        <>
            <div className="container my-3">
                <h2 className='my-2'>Add Notes </h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description"name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>

        </>
    )
}
