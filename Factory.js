import { GenerateQuiz } from "./GenerateQuiz.js"; // To Import the GenerateQuiz into here

export class Factory { // defines the factory class
  createGenerateQuiz( // To create new instance of GenerateQuiz with parameters 
    userId, // User Id 
    topicId, // topic Id
    numberOfEasyQuestions, // number of easy questions for quiz
    numberOfMediumQuestions, // number of medium questions for quiz
    numberOfHardQuestions // number of hard questions for quiz
  ) {
    return new GenerateQuiz( // Returns the created new instances with above parameters 
      userId,
      topicId,
      numberOfEasyQuestions,
      numberOfMediumQuestions,
      numberOfHardQuestions
    );
  }
}
