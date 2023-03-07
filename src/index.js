import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import Cue from "./components/Cue.jsx";
import Notes from "./components/Notes.jsx";
import Summary from "./components/Summary.jsx";
import ShowHelp from "./components/Help";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markDownContent: {
        cues: [],
        notes: [],
        summary: [],
      },
      headings: { cues: ["Cues"], notes: ["Notes"], summary: ["Summary"] },
    };

    this.CueRef = React.createRef();
    this.NotesRef = React.createRef();
    this.SummaryRef = React.createRef();
    this.ShowHelp = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  removeElement() {
    const [listId, component] = arguments;

    const markDownContent = this.state.markDownContent;
    switch (component) {
      case 0: {
        const removedElement = markDownContent.cues.splice(listId, 1);
        this.setState({
          markDownContent: { ...markDownContent, cues: markDownContent.cues },
        });
        return removedElement;
      }
      case 1: {
        const removedElement = markDownContent.notes.splice(listId, 1);
        this.setState({
          markDownContent: { ...markDownContent, notes: markDownContent.notes },
        });

        return removedElement;
      }
      case 2: {
        const removedElement = markDownContent.summary.splice(listId, 1);
        this.setState({
          markDownContent: {
            ...markDownContent,
            summary: markDownContent.summary,
          },
        });
        return removedElement;
      }
      default: {
        console.log(
          `Problem in removeElement() for ${
            (markDownContent, listId, component)
          }`
        );
        break;
      }
    }
  }

  addElement() {
    const [markDownText, component] = arguments;

    const markDownContent = this.state.markDownContent;
    switch (component) {
      case 0:
        this.setState({
          markDownContent: {
            ...markDownContent,
            cues: [...markDownContent.cues, markDownText],
          },
        });
        break;
      case 1:
        this.setState({
          markDownContent: {
            ...markDownContent,
            notes: [...markDownContent.notes, markDownText],
          },
        });
        break;
      case 2:
        this.setState({
          markDownContent: {
            ...markDownContent,
            summary: [...markDownContent.summary, markDownText],
          },
        });
        break;
      default: {
        console.log(
          `Problem in addElement() for ${
            (markDownContent, markDownText, component)
          }`
        );
        break;
      }
    }
  }
  getEditor(component) {
    const REF = (() => {
      switch (component) {
        case 0:
          return this.CueRef;
        case 1:
          return this.NotesRef;
        case 2:
          return this.SummaryRef;
        default:
          console.log(
            `Problem in getEditor(). Probably component No. ${component} does not exist`
          );
          break;
      }
    })();
    return REF.current.EditorRef.current.DivRef.current;
  }
  setEditorCursorPosition() {
    const [nodeChild, position] = arguments;
    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(nodeChild, position);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  handleKeyPress() {
    const [event, component] = arguments;

    const editor = this.getEditor(component);
    const editorType = editor.className;
    const textInEditor = editor.innerText;

    const markDownText =
      editorType === "editorOneLiner"
        ? textInEditor.replaceAll("\n", "")
        : textInEditor;

    const enterOneLiner =
      event.keyCode === 13 &&
      markDownText !== "" &&
      editorType === "editorOneLiner";
    const condCtrlEnter =
      editorType === "editor" && event.keyCode === 13 && event.ctrlKey;
    const condCtrlZ = event.keyCode === 90 && event.ctrlKey;
    const condCtrlQuestMark =
      event.keyCode === 191 && event.ctrlKey && event.shiftKey;
    const condEditorStringEmpty =
      editor.innerText.replaceAll(" ", "").replaceAll("\n", "").length === 0;
    const condBackSpace = event.keyCode === 8;
    const condTab = event.keyCode === 9;

    if (enterOneLiner || condCtrlEnter) {
      event.preventDefault();
      this.addElement(markDownText.trim(), component);
      editor.innerText = "";
    } else if ((condCtrlZ || condBackSpace) && condEditorStringEmpty) {
      event.preventDefault();
      const removedElement = this.removeElement(-1, component);
      editor.innerText = removedElement;
      if (editor.innerText !== "") {
        this.setEditorCursorPosition(
          editor.lastChild,
          editor.lastChild.textContent.length
        );
      }
    } else if (condTab) {
      event.preventDefault();
      document.execCommand("insertHTML", false, "&#009");
      // editor.innerText = editor.innerText + "   ";
      // this.setEditorCursorPosition(
      //   editor.lastChild,
      //   editor.lastChild.textContent.length
      // );
    } else if (condCtrlQuestMark) {
      console.log("TODO: condCtrlQuestMark");
    }
  }

  handleClick() {
    const [event, listId, component] = arguments;

    if (event.ctrlKey) {
      this.removeElement(listId, component);
    }
  }

  render() {
    return (
      <div className="app">
        <Cue
          ref={this.CueRef}
          handleKeyPress={(event) => this.handleKeyPress(event, 0)}
          handleClick={(event, listId) => this.handleClick(event, listId, 0)}
          content={this.state.markDownContent.cues}
          headings={this.state.headings.cues}
        />
        <Notes
          ref={this.NotesRef}
          handleKeyPress={(event) => this.handleKeyPress(event, 1)}
          handleClick={(event, listId) => this.handleClick(event, listId, 1)}
          content={this.state.markDownContent.notes}
          headings={this.state.headings.notes}
        />
        <Summary
          ref={this.SummaryRef}
          handleKeyPress={(event) => this.handleKeyPress(event, 2)}
          handleClick={(event, listId) => this.handleClick(event, listId, 2)}
          content={this.state.markDownContent.summary}
          headings={this.state.headings.summary}
        />
        <ShowHelp ref={this.ShowHelpRef} helps={["Helps"]} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
