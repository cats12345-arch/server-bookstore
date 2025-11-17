const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use("/uploads", express.static("public"));
app.use(express.json());
app.use(cors());


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

let books = [
    {
  	"id": 0,
    "name": "Lord of the Rings",
    "author": "J.R.R Tolkien",
    "price": 15.99,
    "releaseDate": "7/29/1954",
    "imagePath": "Thelord.jpg",
    "description": "The Lord of the Rings by J.R.R. Tolkien is an epic fantasy trilogy that follows the journey of unlikely heroes in a struggle against overwhelming darkness. At its center is Frodo Baggins, a humble hobbit entrusted with the One Ring, a powerful artifact created by the dark lord Sauron to control all life in Middle-earth.",
    "popularBook": false,
    "newBook": false
  },
  {
    "id": 1,
    "name": "Crying in H Mart",
    "author": "Michelle Zauner",
    "price": 14.99,
    "releaseDate": "4/20/2021",
    "imagePath": "crying.jpg",
    "description": "Crying in H Mart by Michelle Zauner is a heartfelt memoir that explores identity, grief, and the powerful bond between a mother and daughter. Zauner, best known as the lead singer of Japanese Breakfast, reflects on her experiences growing up as a Korean American, the challenges of navigating cultural identity, and the profound loss of her mother to cancer.",
    "popularBook": true,
    "newBook": false
  },
	{
    "id:": 2,
    "name": "Charlotte's Web",
    "author": "E.B White",
    "price": 8.99,
    "releaseDate": "3/1/1973",
    "imagePath": "charlottesWeb.webp",
    "description": "Charlotte`s Web is a classic children`s novel by E.B. White that tells the heartwarming story of friendship, loyalty, and the cycle of life. It follows Wilbur, a runt pig who fears being slaughtered, and Charlotte, a wise and caring barn spider who becomes his protector. Through her clever weaving of words into her web—like “Some Pig” and “Terrific”—Charlotte convinces humans that Wilbur is extraordinary and worth saving.",
    "popularBook": false,
    "newBook": false
  },
  {
    "id": 3,
    "name": "A tale of Two Cities",
    "author": "Charles Dickens",
    "price": 9.99,
    "releaseDate": "11/26/1859",
    "imagePath": "aTaleOfTwoCities.jpg",
    "description": "A Tale of Two Cities by Charles Dickens is a historical novel set during the turbulent times of the French Revolution. The story moves between London and Paris, exploring themes of sacrifice, justice, and redemption. It follows the lives of several characters, most notably Charles Darnay, a French aristocrat who rejects his family`s cruel legacy; Lucie Manette, a symbol of love and compassion; and Sydney Carton.",
    "popularBook": false,
    "newBook": false
  },
  {
    "id": 4,
    "name": "A Court of Thorns and Roses",
    "author": "Sarah J. Maas",
    "price": 12.99,
    "releaseDate": "5/5/2015",
    "imagePath": "courtAndThorn.jpg",
    "description": "A Court of Thorns and Roses by Sarah J. Maas is a fantasy novel that blends romance, adventure, and fae mythology. The story follows Feyre Archeron, a mortal huntress who is forced to live in the dangerous faerie lands after killing a wolf that was more than it seemed. There, she becomes entangled with Tamlin, a powerful High Fae, and discovers that a dark curse threatens both his world and her own.",
    "popularBook": false,
    "newBook": false
  },
  {
    "id": 5,
    "name": "Harry Potter and the Sorcer's Stone",
    "author": "J.K. Rowling",
    "price": 9.99,
    "releaseDate": "11/6/2001",
    "imagePath": "harryPotter.jpg",
    "description": "Harry Potter and the Sorcerer`s Stone by J.K. Rowling is the first book in the famous fantasy series about a young boy who discovers he is a wizard. On his eleventh birthday, Harry learns of his magical heritage and attends Hogwarts School of Witchcraft and Wizardry, where he makes friends, learns spells, and begins to uncover the truth about his past.",
    "popularBook": true,
    "newBook": false
  },
  {
    "id": 6,
    "name": "Intermezzo",
    "author": "Sally Rooney",
    "price": 11.99,
    "releaseDate": "8/24/2024",
    "imagePath": "sally.jpg",
    "description": "Intermezzo is a literary novel about grief, family, and complicated love in modern Ireland. After the death of their father, two very different brothers—Peter, a thirty-something Dublin lawyer, and Ivan, a twenty-two-year-old former chess prodigy—find their lives diverging in unexpected ways. Peter struggles with insomnia, guilt, and tangled relations.",
    "popularBook": true,
    "newBook": false
  },
  {
    "id": 7,
    "name": "The Hundred Years' war on Palestine",
    "author": "Rashid Khalidi",
    "price": 12.99,
    "releaseDate": "1/28/2020",
    "imagePath": "theHundredYears.jpg",
    "description": "The Hundred Years` War on Palestine is a historical account that reframes the Israeli-Palestinian conflict as a century-long colonial struggle rather than a clash between two equal sides. Written by Palestinian-American historian Rashid Khalidi, the book blends scholarship with personal family history to trace six major turning points.",
    "popularBook": false,
    "newBook": true
  },
  {
    "id": 8,
    "name": "The Lioness of Boston",
    "author": "Emily Franklin",
    "price": 16.99,
    "releaseDate": "8/29/2023",
    "imagePath": "theLioness.jpg",
    "description": "The Lioness of Boston is a richly imagined work of historical fiction that tells the life story of Isabella Stewart Gardner, a bold and unconventional art collector who became a major influence in American art and society. Born in New York but transplanted to Boston by marriage, Isabella struggles early on to navigate high society`s rigid expectations.",
    "popularBook": false,
    "newBook": true
  },
  {
    "id": 9,
    "name": "A Little Frog's Guide to Self-Care",
    "author": "Maybell Eequay",
    "price": 7.99,
    "releaseDate":"8/8/2023",
    "imagePath": "theLittleFrog.jpg",
    "description": "The Little Frog`s Guide to Self-Care is a charming and uplifting mini-book that mixes cute artwork, positive affirmations, and gentle life lessons to help readers practice kindness toward themselves. Created by the artist Maybell Eequay, it features the “little frog”—a sweet, fashion-forward frog with a mushroom hat and fabulous footwear",
    "popularBook": false,
    "newBook": true
  }
]

app.get("/api/books", (req, res)=>{
    console.log("in get request");
    res.send(books);
});

app.get("/api/books:id", (req, res)=>{
    const books = books.find((books)=>books.id === parseInt(req.params.id));
    res.send(books);
});

app.listen(3001, () => {
    console.log("server works");
})

app.delete("api/books/id" , (req, res) => {
  const book = books.find((h) => h.id === parseInt(req.params.id));

  if (!book) {
    res.status(404).send("The book with the given id was not found");
  }

  const index = books.indexOf(book);
  books.splice(index, 1);
  res.send(book);
})

app.post("/api/books", upload.single("img"), (req, res) => {
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

  const book = {
    id: books.length,
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    releaseDate: req.body.releaseDate,
    imagePath: req.body.imagePath,
    description: req.body.description,
    popularBook: popularBook,
    newBook: newBook,
  }

  if (req.file) {
    book.imagePath = req.file.filename;
  }

  books.push(book);
  res.status(200).send(book);
});

app.put("/api/books/:id", upload.single("img"), (req, res) => {
  let book = books.find((h) => h.id === parseInt(req.params.id));

  if (!book) res.status(400).send("book with given id was not found");

  const result = validateBook(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  book.name = req.body.name;
  book.author = req.body.author;
  book.price = req.body.price;
  book.releaseDate = req.body.releaseDate;
  book.imagePath = req.body.imagePath;
  book.description = req.body.description;
  book.popularBook = req.body.popularBook;
  book.newBook = req.body.newBook;

  if (req.file) {
    book.imagePath = req.file.filename;
  }

  res.send(book);
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
