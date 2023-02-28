import React from "react";
import Title from "./Title";
import Quiz from "./Quiz";
import { questions } from "../Data/sampleQs";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Title />
                <Quiz 
                    questions={questions}
                />
            </div>
        );
    }
}