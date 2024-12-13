package com.bookshop.bookstore.exception;

public class BookNotFoundException extends RuntimeException{

    public BookNotFoundException(String id){
        super("Could not found the user by id "+id);
    }
}
