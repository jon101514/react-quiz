import React from "react";

export default class Score extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>P1: {this.props.playerScore}     HI: {this.props.hiScore}</p>
            </div>
        );
    }
}