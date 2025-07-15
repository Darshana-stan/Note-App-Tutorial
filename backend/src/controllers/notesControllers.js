import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllnotes controller:", error);
    res.status(500).json({ message: "Internal serve error" });
  }
}

export async function getNotebyId(req, res) {
  try {
    const noteId = req.params.id; // get ID from route params
    const note = await Note.findById(noteId); // use the ID

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNotebyId controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    const saveNote = await newNote.save();
    res.status(201).json(saveNote);
  } catch (error) {
    console.error("Error in getAllnotes controller:", error);
    res.status(500).json({ message: "Internal serve error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Error in getAllnotes controller:", error);
    res.status(500).json({ message: "Internal serve error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(deletedNote);
  }
  catch (error) {
    console.error("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Internal serve error" });
  }
}
