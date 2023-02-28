import React from "react";

export default class Life extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>♥x{this.props.lives}</p>
            </div>
        );
    }
}