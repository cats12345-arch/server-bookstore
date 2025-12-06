const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.use("/uploads", express.static("public"));
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://danielpmoss123_db_user:1234aA8@cluster0.w3mr6u7.mongodb.net/Book?retryWrites=true&w=majority")
  .then(() => console.log("Connected to the thing"))
  .catch((err) => console.log(err))

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  releaseDate: String,
  imagePath: String,
  description: String,
  popularBook: Boolean,
  newBook: Boolean,
})

const Book = mongoose.model('Book', bookSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

const upload = multer({ storage: storage });

app.get("/api/books", async (req, res)=>{
    const book = await Book.find();
    console.log(book.author);
    res.send(book);
});

app.get("/api/books:id", async (req, res)=>{
    const book = await Book.findOne({ _id: id });
    res.send(book);
});

app.listen(3001, () => {
    console.log("server works");
})

app.delete("/api/books/:id" , async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    res.status(404).send("The book with the given id was not found");
  }

  res.send(book);
})

app.post("/api/books", upload.single("img"), async (req, res) => {
  const result = validateBook(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  popularBook = false;
  newBook = false;

  if(req.body.popularBook === "true") {
    popularBook = true;
  } else {
    popularBook = false;
  }

  if(req.body.newBook === "true") {
    newBook = true;
  } else {
    newBook = false;
  }

  const book = new Book ({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    releaseDate: req.body.releaseDate,
    imagePath: req.body.imagePath,
    description: req.body.description,
    popularBook: popularBook,
    newBook: newBook,
  });

  if (req.file) {
    book.imagePath = req.file.filename;
  }

  const newerBook = await book.save();
  res.status(200).send(newerBook);
});

app.put("/api/books/:id", upload.single("img"), async (req, res) => {
  const result = validateBook(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let fieldsToUpdate = {
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    releaseDate: req.body.releaseDate,
    imagePath: req.body.imagePath,
    description: req.body.description,
    popularBook: req.body.popularBook,
    newBook: req.body.newBook,
  }

  if (req.file) {
    book.imagePath = req.file.filename;
  }

  const wentThrough = await Book.updateOne(
    { _id: req.params.id },
    fieldsToUpdate
  );

  const updatedBook = await Book.findOne({ _id: req.params.id });
  res.send(updatedBook);
});

const validateBook = (Book) => {
  const schema = Joi.object({
    id: Joi.allow(""),
    name: Joi.string().min(1).required(),
    author: Joi.string().min(1).required(),
    price: Joi.number().required(),
    releaseDate: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    popularBook: Joi.boolean().required(),
    newBook: Joi.boolean().required(),
  })

  return schema.validate(Book);
};
