import NoteContext from "./Notecontext";
import { useState } from "react";
const NoteState = (props) => { 
    const initialNotes = 
        [
        {
            "_id": "64268e4441f76e673ce04d73",
            "user": "6426544a9a506d106bed4d4c",
            "title": "alarm 2",
            "description": "wakes up early for biden3 ",
            "tag": "Morning alarm",
            "date": "2023-03-31T07:39:48.007Z",
            "__v": 0
        },
        {
            "_id": "64268e4b41f76e673ce04d75",
            "user": "6426544a9a506d106bed4d4c",
            "title": "alarm 3",
            "description": "wakes up early for biden3 ",
            "tag": "Morning alarm",
            "date": "2023-03-31T07:39:55.401Z",
            "__v": 0
        },
        {
            "_id": "6426914cff99fb776979c17b",
            "user": "6426544a9a506d106bed4d4c",
            "title": "alarm 4 ",
            "description": "wakes up early for biden3 ",
            "tag": "Morning alarm",
            "date": "2023-03-31T07:52:44.717Z",
            "__v": 0
        },
        {
            "_id": "64269153ff99fb776979c17d",
            "user": "6426544a9a506d106bed4d4c",
            "title": "alarm 5 ",
            "description": "wakes up early for biden3 ",
            "tag": "Morning alarm",
            "date": "2023-03-31T07:52:51.031Z",
            "__v": 0
        },
        {
            "_id": "6426915eff99fb776979c17f",
            "user": "6426544a9a506d106bed4d4c",
            "title": "alarm 6",
            "description": "wakes up early for biden3 ",
            "tag": "Morning alarm",
            "date": "2023-03-31T07:53:02.734Z",
            "__v": 0
        },
        {
            "_id": "64269163ff99fb776979c181",
            "user": "6426544a9a506d106bed4d4c",
            "title": "alarm 7",
            "description": "wakes up early for biden3 ",
            "tag": "Morning alarm",
            "date": "2023-03-31T07:53:07.551Z",
            "__v": 0
        }
        ]
    const [notes,setNotes] = useState(initialNotes)
    //Add a note
    const addNote = (title, description, tag ) => {
        //TODO :API call
        const note =  {
            "_id": "64268e4441f76e673ce04d73",
            "user": "6426544a9a506d106bed4d4c",
            "title": title ,
            "description": description,
            "tag": tag ,
            "date": "2023-03-31T07:39:48.007Z",
            "__v": 0
        } ;
        setNotes(notes.concat(note))
    }
//Delete a note
    const deleteNote = (id) => {
        // TODO:Api Call
       const newNotes= notes.filter((note) => { return note._id !== id })
       setNotes(newNotes)
}
//Edit a note
    const editNote = (id,title,description,tag) => {
        //TODO:Api calls
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag  = tag;
        }
        
    }
}
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>

    )
}
            export default NoteState;