const express = require('express');
const app = express();

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Port configuration compatible with Render
const PORT = process.env.PORT || 3000;

// In-memory data store (seed data)
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, genre: 'Software Engineering' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', year: 1999, genre: 'Software Engineering' },
  { id: 3, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', year: 2008, genre: 'Programming' }
];

// Helper variable for auto-incrementing IDs
let nextId = 4;

// ---------------------------------------------------------------------------
// ROOT ROUTE (Health Check / Deployment Verification)
// ---------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Books RESTful API! The service is live and healthy.',
    endpoints: {
      getAllBooks: 'GET /api/books',
      getBookById: 'GET /api/books/:id',
      createBook: 'POST /api/books',
      updateBook: 'PUT /api/books/:id',
      deleteBook: 'DELETE /api/books/:id'
    }
  });
});

// ---------------------------------------------------------------------------
// CRUD ENDPOINTS
// ---------------------------------------------------------------------------

// 1. READ ALL - GET /api/books
app.get('/api/books', (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// 2. READ ONE - GET /api/books/:id
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID supplied. ID must be a numeric integer.'
    });
  }

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${bookId} was not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: book
  });
});

// 3. CREATE - POST /api/books
app.post('/api/books', (req, res) => {
  const { title, author, year, genre } = req.body;

  // Validation: Check required fields
  if (!title || !author || !year || !genre) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Fields "title", "author", "year", and "genre" are all required.'
    });
  }

  if (typeof year !== 'number' || year < 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. "year" must be a positive number.'
    });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
    year,
    genre: genre.trim()
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: 'Book record created successfully.',
    data: newBook
  });
});

// 4. UPDATE - PUT /api/books/:id
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID supplied. ID must be a numeric integer.'
    });
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Cannot update. Book with ID ${bookId} was not found.`
    });
  }

  const { title, author, year, genre } = req.body;

  // Validation
  if (!title || !author || !year || !genre) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. All fields ("title", "author", "year", "genre") must be provided.'
    });
  }

  if (typeof year !== 'number' || year < 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. "year" must be a positive number.'
    });
  }

  // Update resource
  books[bookIndex] = {
    id: bookId,
    title: title.trim(),
    author: author.trim(),
    year,
    genre: genre.trim()
  };

  res.status(200).json({
    success: true,
    message: `Book with ID ${bookId} updated successfully.`,
    data: books[bookIndex]
  });
});

// 5. DELETE - DELETE /api/books/:id
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID supplied. ID must be a numeric integer.'
    });
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Cannot delete. Book with ID ${bookId} was not found.`
    });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: `Book with ID ${bookId} was successfully deleted.`,
    deletedData: deletedBook
  });
});

// Fallback 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource or endpoint not found.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running locally on http://localhost:${PORT}`);
});