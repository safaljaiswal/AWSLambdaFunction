import { DynamoDBClient } from "@aws-sdk/client-dynamodb";// To import the DynamoDB client
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";// To import the DynamoDB client

export class Answers { // To export the Questions class
  constructor() { // Contructor used to initialize the objects which are created
    const dynamoDbClient = new DynamoDBClient({ region: "ap-south-1" }); // New instance creation with region specification
    this.dynamoDbClient = DynamoDBDocumentClient.from(dynamoDbClient); // creates the new intance from the already present instance
    this.tableName = process.env.USER_TEST_INSTANCE_ANSWER_TABLE_NAME;// Assign table to tableName from env variables
  }

  async getUserAttemptedQuestions(userId, topicId) { // To fetch user attempted questions
    try { // Try case
      //const tableName = "UserTestInstanceAnswer"; // To set table name
      const params = {
        TableName: "UserTestInstanceAnswer",// Table Name
        IndexName: "userId-index",// Table index name to run query
        KeyConditionExpression: "userId = :userId", //condition to match the userId  
        ExpressionAttributeValues: { 
          ":userId": userId, // Maps placeholder value to the actual value
        },
      };
      const result = await this.dynamoDbClient.send(new QueryCommand(params)); // Sends the query to the dynamoDB
      return result.Items.map((item) => item.qId); // Assuming `qId` holds the question IDs
    } catch (error) { // // if there is any error it is caught here
      throw new Error("Could not fetch attempted questions"); // throws the error with the msg
    }
  }

}
