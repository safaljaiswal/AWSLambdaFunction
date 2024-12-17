import { DynamoDBClient } from "@aws-sdk/client-dynamodb";// To import the DynamoDB client
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";// To import the DynamoDB client

export class Attempted { // To export the Attempted class
  constructor() { // Contructor used to initialize the objects which are created
    const dynamoDbClient = new DynamoDBClient({ region: "ap-south-1" }); // New instance creation with region specification
    this.dynamoDbClient = DynamoDBDocumentClient.from(dynamoDbClient); // creates the new intance from the already present instance
  }
  async getUserAttemptedQuestions(userId, topicId) { // To fetch user attempted questions
    try { // Try case
      const params = {
        TableName: "UserTestInstanceAnswer",// Table Name
        IndexName: "userId-index",// Table index name to run query
        KeyConditionExpression: "userId = :userId", // Primary condition to filter result
        ExpressionAttributeValues: { 
          ":userId": userId, // Maps placeholder value to the actual value
        },
        ProjectionExpression: "questionId", // To project only questionId as the query result
      };
      const result = await this.dynamoDbClient.send(new QueryCommand(params)); // Sends the query to the dynamoDB
      return result.Items.map((item) => item.questionId); //To return the questionId as the result
    } catch (error) { // if there is any error it is caught here
      throw new Error("Could not fetch attempted questions"); // throws the error with the msg
    }
  }

}
