import { DynamoDBClient } from "@aws-sdk/client-dynamodb";// To import the DynamoDB client
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";// To import the DynamoDB client

export class Questions { // To export the Questions Class
  constructor() { // Contructor used to initialize the objects which are created
    const dynamoDbClient = new DynamoDBClient({ region: "ap-south-1" });// New instance creation with region specification
    this.dynamoDbClient = DynamoDBDocumentClient.from(dynamoDbClient); // creates the new intance from the already present instance
  }
  //To fetch questions based on given parameters 
  async fetchQuestions(topicId, difficultyLevel, limit, attemptedQuestions) { // To fetch questions from the table
    try { // try Case
      // Tp check if there are any excluded questions, if not, set it to null
      const attemptedQuestionsSet = attemptedQuestions && attemptedQuestions.length ? new Set(attemptedQuestions) : null;
      const params = { // Defines parameters for the DynamoDB query
        TableName: "q_Questions", // Table name
        IndexName: "topicId-index", // Table Index Name
        KeyConditionExpression: "topicId = :topicId", // Primary condition to filter result
        ExpressionAttributeValues: { 
          ":topicId": topicId, // Maps placeholder value to the actual value
        },
        FilterExpression: attemptedQuestionsSet ? "contains(questionId, :attemptedQuestions)" : undefined, //To set the FilterExpression to exclude questions based on qId, if incase of any excluded questions are still there
        ...(attemptedQuestionsSet),
        Limit: limit, // To limit the result based on the input limit provided
      };
      const result = await this.dynamoDbClient.send(new QueryCommand(params)); // Sends the query to the dynamoDB
      return result.Items.map((item) => item.questionId);  //To return the questionId as the result
    } catch (error) { // if there is any error it is caught here
      throw new Error("Could not fetch questions"); // throws the error with the msg
    }
  }
}