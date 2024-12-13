package com.bookshop.bookstore.controller;

import com.bookshop.bookstore.exception.BookNotFoundException;
import com.bookshop.bookstore.model.Book;
import com.bookshop.bookstore.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://myspringbootbucketfiles.s3-website-us-east-1.amazonaws.com")
public class BookController {

    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

    @Autowired
    private BookRepository bookRepository;

    // Create a new book
    @PostMapping("/book")
    public Book createBook(@RequestBody Book newBook) {
        logger.info("Creating a new book: {}", newBook);
        bookRepository.save(newBook);
        logger.info("Book created successfully: {}", newBook);
        return newBook;
    }

    // Read all books
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        logger.info("Fetching all books from DynamoDB...");
        List<Book> books = bookRepository.findAll();
        logger.info("Fetched {} books from DynamoDB", books.size());
        return books;
    }

    // Read a book by ID
    @PostMapping("/book/get")
    public Book getBookById(@RequestBody Book requestBook) {
        logger.info("Fetching book with ID: {}", requestBook.getId());
        Book book = bookRepository.findById(requestBook.getId());
        if (book == null) {
            logger.error("Book with ID {} not found", requestBook.getId());
            throw new BookNotFoundException(requestBook.getId());
        }
        logger.info("Book fetched successfully: {}", book);
        return book;
    }

    // Update a book
    @PutMapping("/book")
    public Book updateBook(@RequestBody Book updatedBook) {
        logger.info("Updating book with ID: {}", updatedBook.getId());
        Book existingBook = bookRepository.findById(updatedBook.getId());
        if (existingBook == null) {
            logger.error("Book with ID {} not found for update", updatedBook.getId());
            throw new BookNotFoundException(updatedBook.getId());
        }

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setCost(updatedBook.getCost());

        bookRepository.save(existingBook);
        logger.info("Book with ID {} updated successfully: {}", updatedBook.getId(), existingBook);
        return existingBook;
    }

    // Delete a book
    @DeleteMapping("/book")
    public String deleteBook(@RequestBody Book requestBook) {
        logger.info("Deleting book with ID: {}", requestBook.getId());
        Book book = bookRepository.findById(requestBook.getId());
        if (book == null) {
            logger.error("Book with ID {} not found for deletion", requestBook.getId());
            throw new BookNotFoundException(requestBook.getId());
        }

        bookRepository.delete(requestBook.getId());
        logger.info("Book with ID {} deleted successfully", requestBook.getId());
        return "Book " + requestBook.getId() + " has been deleted.";
    }
}
