import React from "react";
import Answer from "./Answer";
import Life from "./Life";
import Question from "./Question";
import Score from "./Score";

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Session Data
            questionsSeen: [], // Keeps track of questions player has seen.
            // Play Data
            playerScore: 0,
            hiScore: 1,
            lives: 5,
            // Question Data
            currQuestionObj: null,
            currQuestion: "The answer to this test question is 5. Should not be seen.",
            currAnswers: [1, 2, 3, 4, 5, 6],
            correctAnswer: "5"
        };
    }

    // Lifecycle Hook to make things happen as soon as loading's done
    componentDidMount() {
        this.changeQuestion(); // load a question
    }

    processAnswer = (isCorrect) => {
        console.log("Quiz.processAnswer()");
        console.log(isCorrect ? "Correct!" : "Incorrect.");

        if (isCorrect) {
            this.increaseScore();
        } else {
            this.subtractLives();
        }
        this.changeQuestion();
    }

    increaseScore = () => {
        let newScore = this.state.playerScore + 1;
        this.setState(() => ({
            playerScore: newScore,
            hiScore: (newScore > this.state.hiScore) ? newScore : this.state.hiScore
        }));
    }

    subtractLives = () => {
        console.log("Quiz.subtractLives()");
        if (this.state.lives - 1 <= 0) { // Game over condition

        } else { // continue playing
            this.setState(() => ({
                lives: this.state.lives - 1
            }));
        }
    }

    /** Loads up a new question from the props data. */
    changeQuestion = () => {
        console.log("Quiz.changeQuestion()");
        let qSeenCopy = null;
        // Change Question to something haven't seen
        for (let i = 0; i < this.props.questions.length; i++) {
            console.log("For loop: question's ID: " + this.props.questions[i].id + " has been seen? " + (this.state.questionsSeen.includes(this.props.questions[i].id)));
            // Haven't seen this question
            if (this.state.questionsSeen.includes(this.props.questions[i].id) === false) {
                qSeenCopy = arrayDeepCopy(this.state.questionsSeen);
                qSeenCopy.push(this.props.questions[i].id);
                this.setState(() => ({
                    currQuestionObj: this.props.questions[i],
                    currQuestion: this.props.questions[i].question,
                    currAnswers: this.props.questions[i].answers,
                    correctAnswer: this.props.questions[i].correctAnswer,
                    questionsSeen: (qSeenCopy != null) ? qSeenCopy : this.state.questionsSeen
                }));
                // console.log("break! currQ " + this.state.currQuestion);
                break;
            }
        }
    }

    render() {
        const { currAnswers } = this.state; // extract currAnswers from state
        console.log("Quiz.render()");
        return (
            <div>
                <Score 
                    playerScore={this.state.playerScore}
                    hiScore={this.state.hiScore}
                />
                <Question 
                    currQuestion={this.state.currQuestion}
                />
                <Life 
                    lives={this.state.lives}
                />
                <ul>
                    {currAnswers.map((item) => <Answer 
                        key={item}
                        answerText={item}
                        isCorrect={item === this.state.correctAnswer}
                        processAnswer={this.processAnswer}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

/** Helper function: make a deep copy of an arrayy */
function arrayDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
}