// package com.bookshop.bookstore.config;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
// import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
// import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
// import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
// import software.amazon.awssdk.regions.Region;

// @Configuration
// public class DynamoDbConfig {

//         @Bean
//         public DynamoDbClient dynamoDbClient() {
//             return DynamoDbClient.builder()
//                     .region(Region.US_EAST_1) 
//                     .credentialsProvider(StaticCredentialsProvider.create(
//                             AwsBasicCredentials.create(
//                                     "", 
//                                     "" 
//                             )
//                     ))
//                     .build();
//         }
//     @Bean
//     public DynamoDbEnhancedClient dynamoDbEnhancedClient(DynamoDbClient dynamoDbClient) {
//         return DynamoDbEnhancedClient.builder()
//                 .dynamoDbClient(dynamoDbClient)
//                 .build();
//     }
// }
