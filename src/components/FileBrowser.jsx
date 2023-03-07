import React from "react";

export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props);
        // this.files = [];
        this.files = ["file1", "file2"];
    }
    render() {
        const initClasses = this.props.addClasses + " fileBrowser";
        const fileBrowserClasses =
            this.files.length === 0
                ? initClasses
                : "noPaddingTopBottom " + initClasses;
        const files = this.files.map((file, fileNo) => {
            return (
                <button key={fileNo} className="files">
                    {file}
                </button>
            );
        });

        return (
            <div className={fileBrowserClasses}>
                FileBrowser ||
                {files}
            </div>
        );
    }
}
