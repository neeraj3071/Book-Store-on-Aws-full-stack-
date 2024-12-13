package com.bookshop.bookstore.model;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.UUID;

@DynamoDbBean
public class Book {

    private String id;  // DynamoDB requires a string key
    @NotBlank(message = "Title is mandatory")
    private String title;
    @NotBlank(message = "Author is mandatory")
    private String author;
    @NotNull(message = "Cost is mandatory")
    @Positive(message = "Cost must be positive")
    private double cost;

    // Default constructor (required for DynamoDB)
    public Book() {
        this.id = UUID.randomUUID().toString(); // Generate a unique ID by default
    }

    // Parameterized constructor
    public Book(String title, String author, double cost) {
        this.id = UUID.randomUUID().toString(); // Generate a unique ID by default
        this.title = title;
        this.author = author;
        this.cost = cost;
    }

    // Partition key for DynamoDB
    @DynamoDbPartitionKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getters and setters for other fields
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    // toString method for debugging and logging
    @Override
    public String toString() {
        return "Book{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", cost=" + cost +
                '}';
    }
}
