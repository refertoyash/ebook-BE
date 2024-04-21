const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
// const Note = require('../models/Notes');


//ROUTE 1: Get all the notes using : GET "/api/notes/fetchallnotes" . Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    // sare abhi tkk ke notes ko retrive krne k liye
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) { // if there is an error
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Add a new Notenusing : POST "/api/notes/addnote" . Login required
router.post('/addnote', fetchuser, [
    //now for adding a note we need to validate the title an ddescription
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description of atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        // ab data extraction kr rhe hai
        const { title, description, tag } = req.body;
        // if there are errors, return bad request and the errors
        const errors = validationResult(req); // taken from express-validator documentation
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save(); // saving in the database

        res.json(savedNote);
    }
    catch (error) { // if there is an error
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 3: Update an existing note using  : POST "/api/notes/updatenote" . Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote odject
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) res.status(404).send("Not Found");
        if (note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) { // if there is an error
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//ROUTE 4: Deleting an existing note using  : DELETE "/api/auth/deletenote" . Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // const {title, description, tag} = req.body;
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    }
    catch (error) { // if there is an error
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router