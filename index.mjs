import { Factory } from "./Factory.js"; // To import the factory here

export const handler = async (event, context) => { // async function to handle events
  try { // Try case
    const { // brings the object from event object
      userId,  // user ID used in the generateQuiz
      topicId, // Topic Id used in the generateQuiz
      numberOfEasyQuestions, // Number of easy questions used in the generateQuiz
      numberOfMediumQuestions, // number of medium questions used in the generateQuiz
      numberOfHardQuestions, // number of hard questions to be used in generateQuiz
    } = event;

    const newFactory = new Factory(); // Creates new instance of Factory
    const command = newFactory.createGenerateQuiz( //create new generateQuiz command
      userId, 
      topicId,
      numberOfEasyQuestions,
      numberOfMediumQuestions,
      numberOfHardQuestions
    );

    const result = await command.execute(); // Run the GenerateQuiz command and saves the result

    return {
      statusCode: 200, // on being successful return the status code 200 and result as a response 
      body: result,
    };
  } catch (error) { // Any error is caught here
    return {
      statusCode: 500, // on being successful return the status code 500 and error message
      body: { error: error.message },
    };
  }
};
