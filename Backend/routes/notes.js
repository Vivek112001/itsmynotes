const express = require('express')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser')
const router = express.Router();

//Route 1.Creating endpoint for fetching all notes
router.get('/fetchallnotes', fetchuser,async (req, res) => {
    try {
        let notes = await Notes.find({ user: req.user.id })
        res.send(notes)  
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }   
})
//Route 2.Creating endpoint for adding notes
router.post('/addnotes', fetchuser, [
    body('title',"title length can't be less than 5 characters").isLength({min:5}),
    body('description',"description can't be less than 5 characters").isLength({min:5})
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let note =  new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote =await note.save()
        res.send(savedNote)  
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})
//Route 3. creating an endpoint for updating notes
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    //Creating a new noteobject
    try {
        const { title, description, tag } = req.body;
        let newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //checking whether note with corresponding id exists or not
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
           return  res.send("Not allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);   
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
    
    
})
//Route 4. Creating an endpoint for deleting notes
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
  
    try {
        //checking whether note with corresponding id exists or not
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
           return res.send("Not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
  } 
      catch (error) {
        console.log(error.message)
        res.status(500).send("Some Internal Server error occured")
    }
})


module.exports = router;