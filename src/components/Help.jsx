import React from "react";

export default class Help extends React.Component {
  render() {
    const helpsArray = this.props.helps;
    const helps = helpsArray.map((helps, helpNo) => {
      return (
        <div key={helpNo} className="helps">
          {helps}
        </div>
      );
    });
    return (
      <div className={`helpContainer ${this.props.addClasses}`}>{helps}</div>
    );
  }
}
