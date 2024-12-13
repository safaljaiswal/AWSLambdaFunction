import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; // To import the DynamoDB client
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb"; // To import the DynamoDB client

export class Questions { // To export the Questions class
  constructor() { // Contructor used to initialize the objects which are created
    const dynamoDbClient = new DynamoDBClient(); // Predefined class allows to connect dynamoDB
    this.dynamoDbClient = DynamoDBDocumentClient.from(dynamoDbClient); // allows direct interaction with dynamoDB
  }

  async fetchQuestions(topicId, difficultyLevel, limit, excludedQuestions) {
    try {
      let filterExpression = ""; // Initialize empty filter expression
      const expressionAttributeValues = {
        ":topicId": topicId,
        ":difficultyLevel": difficultyLevel,
      };
  
      // Add filter to exclude already attempted questions, if applicable
      if (excludedQuestions && excludedQuestions.length > 0) {
        filterExpression = "NOT qId IN (:excludedQuestions)";
        expressionAttributeValues[":excludedQuestions"] = excludedQuestions;
      }
  
      const params = {
        TableName: "q_Questions",
        IndexName: "questionPartitionKey-difficultyLevel-index", // Use the correct index
        KeyConditionExpression: "questionPartitionKey = :topicId AND difficultyLevel = :difficultyLevel", // Match both partition and sort key
        ExpressionAttributeValues: expressionAttributeValues,
        FilterExpression: filterExpression || undefined, // Include filter if defined
        Limit: limit,
      };
  
      console.log("DynamoDB Query Params:", params); // Log query parameters for debugging
      const result = await this.dynamoDbClient.send(new QueryCommand(params));
      console.log("DynamoDB Query Result:", result); // Log query results
  
      return result.Items || []; // Return fetched items or empty array
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw new Error("Could not fetch questions");
    }
  }   
}
