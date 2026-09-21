import { useState, useEffect } from 'react';
import './App.css'
import BookCard from './components/BookCard';

function App() {
  const [showform, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBook, setEditingBook] = useState(null)
  const [filter, setFilter] = useState("All");
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      status: book.status,
    });
    setShowForm(true);
  };
  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  }
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks)  : [
        {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      status: "Reading",
    },
        {
      id: "2",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      status: "Completed",
    },
        {
      id: "3",
      title: "The Six of Crows",
      author: "Leigh Bardugo",
      genre: "Fantasy",
      status: "Reading",
    },
  ];
});
  
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));

  }, [books]);
  
  const filteredBooks = books.filter((book) => {
const matchesFilter = filter === "All" || 
      book.status === filter;
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
  });
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    status: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => { 
    event.preventDefault();

    if (!formData.title.trim() || !formData.author.trim() || !formData.genre || !formData.status) {
      alert("Please fill in all the fields");
      return;
    }
    if (editingBook) {
      const updatedBooks = books.map((book) => 
        book.id === editingBook.id ? { ...book, ...formData } : book
      );
      setBooks(updatedBooks);
      setEditingBook(null);
    } else{
      const newBook = {
      id:Date.now(),
      ...formData,
    };
    setBooks([...books, newBook]);
    }
    
    
    setFormData({
      title: "",
      author: "",
      genre: "",
      status: "",

    });
    setShowForm(false)
   };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>My Reading Tracker</h1>
          <p>Keep track of the books you're reading.</p>
        </div>
        <button className="add-button" onClick={() => setShowForm(!showform )}>

         {showform ? "Close" : "+ Add Book"}
        </button>
   </header>
   {showform && (
    <section className="book-form">
      <h2>{editingBook ? "Edit Book" : "Add a New Book"}</h2>
      <form onSubmit={handleSubmit}>
<div className="form-group">
  <label>Book Title</label>
  <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder='Enter book title' />
</div>
<div className="form-group">
  <label>Author</label>
  <input type="text" name='author' value={formData.author} onChange={handleChange} placeholder='Enter author name' />
</div>
<div className="form-group">
  <label>Genre</label>
  <select name='genre' value={formData.genre} onChange={handleChange}>
 <option value="">Select genre</option>
 <option>Fantasy</option>
 <option>Mystery</option>
 <option>Thriller</option>
 <option>Romance</option>
 <option>Sci-fi</option>
 <option>Other</option>
 </select>
</div>
<div className="form-group">
  <label>Status</label>
  <select name='status' value={formData.status} onChange={handleChange}>
    <option value="">Select status</option>
    <option>Reading</option>
    <option>Completed</option>
  </select>
</div>
<button type='submit' className='save-button'>
  {editingBook ? "Update Book" : "Add Book"}
</button>
      </form>
    </section>
   )}
   <section className="stats">
    <div className="stat-card">
      <span>{books.length}</span>
      <p>Total Books</p>
    </div>
    <div className="stat-card">
      <span>{books.filter((book) => book.status === "Reading").length}</span>
      <p>Currently Reading</p>
    </div>
    <div className="stat-card">
      <span>{books.filter((book) => book.status === "Completed").length}</span>
      <p>Completed</p>
    </div>
    </section>
    <section className="book-section">
      <div className="section-header">
        <h2>My Books</h2>
        <div className="search-box">
          <input type="text" placeholder='Search by title or author...' value={searchTerm} onChange={(event) =>
            setSearchTerm(event.target.value)
          } />
        </div>
        <div className="filters">
          <button className={filter === "All" ? "active" : ""} onClick={() =>  setFilter("All")}>All</button>
          <button className={filter === "Reading" ? "active" : ""} onClick={() =>  setFilter("Reading")} >Reading</button>
          <button className={filter === "Completed" ? "active" : ""} onClick={() =>  setFilter("Completed")}>Completed</button>
        </div>
      </div>
      <div className="book-grid">
        {filteredBooks.length === 0 ? (
          <p className="no-books">No books found.</p>
        ): (filteredBooks.map((book) => (
          <BookCard
          key={book.id}
          book={book}
          onEdit={handleEdit}
          onDelete={handleDelete}
        
          />
         ))
        )}
      </div>
    </section>
     </div>
  );
}

export default App;
