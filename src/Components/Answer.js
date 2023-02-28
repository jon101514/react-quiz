import React from "react";

export default class Answer extends React.Component {
    constructor(props) {
        super(props);
    }

    processAnswer = () => {
        console.log("Answer.processAnswer()");
        this.props.processAnswer(this.props.isCorrect);
    }

    render() {
        return (
            <div>
                <button onClick={this.processAnswer}>{this.props.answerText}</button>
            </div>
        );
    }
}