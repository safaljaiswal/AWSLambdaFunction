import { Questions } from "./Questions.js"; // To import the Questions
import { Attempted } from "./Attempted.js"; // To import the Answers

export class GenerateQuiz { // defines the GenerateQuiz for logic
  constructor( // Constructor ti initialize the parameters
    userId, // userId to fetch attempted questions
    topicId, // to fetch question from a topic
    numberOfEasyQuestions, // number of easy question to be included in the quiz
    numberOfMediumQuestions, // number of medium question to be included in the quiz
    numberOfHardQuestions // number of hard question to be included in the quiz
  ) {
    this.userId = userId; // Assigns the userid to instance
    this.topicId = topicId; // Assigns the topicid to instance
    this.numberOfEasyQuestions = 4; // Assigns the numberofeasyquestions to instance
    this.numberOfMediumQuestions = 6; // Assigns the numberofmediumquestions to instance 
    this.numberOfHardQuestions = 5; //Assigns the numberofhardquestions to instance
    this.questions = new Questions(); // create new instance of question
    this.Attempted = new Attempted(); // create new instance of attempted
  }

  async execute() { //executes the logic for generating the quiz
    const attemptedQuestions = await this.Attempted.getUserAttemptedQuestions( // fetch the questions user already attempted
        this.userId, // passing userId to fetch attempted questions for this user
        this.topicId // passing topic id to filter out attempted questions from this topic
      );

    const quizQuestions = []; // empty array to store quiz questions

    const easyQuestions = await this.questions.fetchQuestions( // To Fetch easy question and adds them to quizQuestion empty array
      this.topicId, // passing topic id to fetch question from this topic
      "easy", // mentioned difficulty level
      this.numberOfEasyQuestions, // mentioned number of question to be fetched
      attemptedQuestions // list of attempted questions passed to exclude them from the quiz
    );
    quizQuestions.push(...easyQuestions); //adds the fetch easy question to quizQuestion array

    const mediumQuestions = await this.questions.fetchQuestions( // To Fetch medium question and adds them to quizQuestion empty array
      this.topicId, // passing topic id to fetch question from this topic
      "medium", // mentioned difficulty level
      this.numberOfMediumQuestions, // mentioned number of question to be fetched
      attemptedQuestions // list of attempted questions passed to exclude them from the quiz
    );
    quizQuestions.push(...mediumQuestions); //adds the fetch medium question to quizQuestion array

    const hardQuestions = await this.questions.fetchQuestions( // To Fetch medium question and adds them to quizQuestion empty array
      this.topicId,// passing topic id to fetch question from this topic
      "hard", // mentioned difficulty level
      this.numberOfHardQuestions, // mentioned number of question to be fetched
      attemptedQuestions  // list of attempted questions passed to exclude them from the quiz
    );
    quizQuestions.push(...hardQuestions);//adds the fetch hard question to quizQuestion array
    return quizQuestions; // Returns the quizQuestions 
  }
}
