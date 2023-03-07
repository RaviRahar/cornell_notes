import React from "react";

export default class Header extends React.Component {
    render() {
        const headingsArray = this.props.headings;
        const headings = headingsArray.map((heading, headingNo) => {
            return (
                <div key={headingNo} className="headings">
                    {heading}
                </div>
            );
        });
        return <div className={`${this.props.addClasses} header`}>{headings}</div>;
    }
}
