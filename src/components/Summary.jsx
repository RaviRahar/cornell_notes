import React from "react";
import Header from "./Header";
import Editor from "./Editor.jsx";
import { marked } from "marked";

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.EditorRef = React.createRef();
  }
  render() {
    const contentArray = this.props.content;
    const content = contentArray.map((markDownText, indexNo) => {
      const sanitizedMarkDown = markDownText.replaceAll("\n", "");
      const htmlText = marked.parse(sanitizedMarkDown);
      return (
        <li
          key={indexNo}
          onClick={(event) => this.props.handleClick(event, indexNo)}
          dangerouslySetInnerHTML={{ __html: htmlText }}
        />
      );
    });

    return (
      <div className="summaryContainer">
        <Header headings={this.props.headings} addClasses={"summaryHeader"} />
        <div className="summary">
          <ol>
            {content}
            <li>
              <Editor
                ref={this.EditorRef}
                editorType="oneLiner"
                handleKeyPress={this.props.handleKeyPress}
              />
            </li>
          </ol>
        </div>
      </div>
    );
  }
}
