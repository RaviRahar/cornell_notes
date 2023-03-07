import React from "react";
import Header from "./Header";
import Editor from "./Editor.jsx";
import FileBrowser from "./FileBrowser";
import { marked } from "marked";

export default class Notes extends React.Component {
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

    const mkD = contentArray.map((markDownText, indexNo) => {
      return marked.parse(markDownText, { async: true });
    });
    console.log(contentArray);
    console.log(mkD);

    return (
      <div className="notesContainer">
        <FileBrowser addClasses={"notesFileBrowser"} />
        <Header headings={this.props.headings} addClasses={"notesHeader"} />
        <div className="notes">
          <ol>
            {content}
            <li>
              <Editor
                ref={this.EditorRef}
                handleKeyPress={this.props.handleKeyPress}
              />
            </li>
          </ol>
        </div>
      </div>
    );
  }
}
