package com.bookshop.bookstore.repository;

import com.bookshop.bookstore.model.Book;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class BookRepository {

    private static final Logger logger = LoggerFactory.getLogger(BookRepository.class);
    private final DynamoDbTable<Book> bookTable;

    public BookRepository(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.bookTable = dynamoDbEnhancedClient.table("Book", TableSchema.fromBean(Book.class));
        logger.info("BookRepository initialized with DynamoDB table: Book");
    }

    public void save(Book book) {
        logger.info("Saving book: {}", book);
        bookTable.putItem(book);
        logger.info("Book saved successfully: {}", book);
    }

    public Book findById(String id) {
        logger.info("Finding book with ID: {}", id);
        Book book = bookTable.getItem(r -> r.key(k -> k.partitionValue(id)));
        if (book == null) {
            logger.warn("Book with ID {} not found", id);
        } else {
            logger.info("Book found: {}", book);
        }
        return book;
    }

    public List<Book> findAll() {
        logger.info("Fetching all books from DynamoDB table");
        List<Book> books = bookTable.scan()
                .items()
                .stream()
                .collect(Collectors.toList());
        logger.info("Fetched {} books from DynamoDB table", books.size());
        return books;
    }

    public void delete(String id) {
        logger.info("Deleting book with ID: {}", id);
        bookTable.deleteItem(r -> r.key(k -> k.partitionValue(id)));
        logger.info("Book with ID {} deleted successfully", id);
    }
}
