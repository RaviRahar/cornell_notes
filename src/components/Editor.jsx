import React from "react";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.DivRef = React.createRef();
  }
  render() {
    return this.props.editorType === "oneLiner" ? (
      <div
        ref={this.DivRef}
        className="editorOneLiner"
        onKeyDown={this.props.handleKeyPress}
        tabIndex={-1}
        contentEditable
      ></div>
    ) : (
      <div
        ref={this.DivRef}
        className="editor"
        onKeyDown={this.props.handleKeyPress}
        tabIndex={-1}
        contentEditable
      ></div>
    );
  }
}
