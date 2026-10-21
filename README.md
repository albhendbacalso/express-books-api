# Books Management RESTful API

A lightweight RESTful API built with Node.js and Express.js that allows users to manage a collection of book records. The API supports full CRUD (Create, Read, Update, Delete) operations, validates incoming request bodies, handles errors with standard HTTP status codes, and is deployed on the Render cloud platform.

---

## 1. Technologies Used

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **API Testing:** Postman
- **Version Control:** Git & GitHub
- **Cloud Hosting / Deployment:** Render

---

## 2. Installation and Local Execution

To run and test this API on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/albhendbacalso/express-books-api.git
   cd express-books-api
2. **Install dependencies:**
    npm install
3. **Start the server:**
    npm start
4. **Verify it is running:**
    http://localhost:3000/

## 3. API Endpoints
HTTP Method	Endpoint	Purpose	Expected Status Codes
GET	/	Root verification & service status check	200 OK
GET	/api/books	Retrieve all book records	200 OK
GET	/api/books/:id	Retrieve a specific book by its ID	200 OK, 400 Bad Request, 404 Not Found
POST	/api/books	Create a new book record	201 Created, 400 Bad Request
PUT	/api/books/:id	Update an existing book record	200 OK, 400 Bad Request, 404 Not Found
DELETE	/api/books/:id	Delete a book record by its ID	200 OK, 400 Bad Request, 404 Not Found

## 4. Example Request Body for Creating a Record
Endpoint:
POST /api/books

Request Headers:
Content-Type: application/json
JSON Request Body:
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "genre": "Software Engineering"
}
Example Successful Response (201 Created):
{
  "success": true,
  "message": "Book record created successfully.",
  "data": {
    "id": 4,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008,
    "genre": "Software Engineering"
  }
}
Example Failed Response (400 Bad Request):
(Sent when required fields are missing or invalid)
{
  "success": false,
  "message": "Validation failed. Fields \"title\", \"author\", \"year\", and \"genre\" are all required."
}

## 5. Testing the API (for Students & Evaluators)
You can test both the local and deployed endpoints using Postman:

Get all books: Send a GET request to /api/books.
Get one book: Send a GET request to /api/books/1 (returns the first book).
Get nonexistent book: Send a GET request to /api/books/999 (verifies 404 Not Found).
Create a book: Send a POST request to /api/books using the JSON body provided above (verifies 201 Created).
Update a book: Send a PUT request to /api/books/1 with updated field values.
Delete a book: Send a DELETE request to /api/books/1 (verifies deletion).

## 6-7. Project Links
GitHub Repository URL:
https://github.com/albhendbacalso/express-books-api.git

Public Render Deployment URL:
https://express-books-api-531x.onrender.com/

## 8.  Known Limitations

In-Memory Storage: The application uses an in-memory JavaScript array to store data. A persistent external database is not connected.

Data Persistence: Because data is stored in memory, all newly created, modified, or deleted records will reset to the original default seed list whenever the server restarts or when the free-tier Render container spins down.




