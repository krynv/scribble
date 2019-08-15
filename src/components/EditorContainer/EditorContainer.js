import React from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "../plugins/highlightPlugin";
import './EditorContainer.css';

const highlightPlugin = createHighlightPlugin();

class EditorContainer extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            placedDiv: {
                top: '-100px',
                left: '-100px', // hide the div first
            },
            editorState: EditorState.createEmpty()
        };

        this.plugins = [highlightPlugin];


        this.style = {
            height: '100%',
        }
    }

    onChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );
        if (newState) {
            this.onChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    onUnderlineClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
        );
    };

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    };

    onItalicClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
        );
    };

    onStrikeThroughClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
        );
    };

    onHighlight = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
        );
    };

    showWhereClicked = (e) => {
        console.log(`you have clicked X:${e.clientX} Y:${e.clientY}`);

        this.setState({
            placedDiv: {
                top: `${e.clientY}px`,
                left: `${e.clientX}px`,
                width: '100px',
                height: '100px',
                backgroundColor: 'green',
                position: 'absolute',
            }
        })
    }

    render() {
        return (
            <div className="editorContainer" onClick={this.showWhereClicked}>
                {/* <button onClick={this.onUnderlineClick}>U</button>
                <button onClick={this.onBoldClick}>
                    <b>B</b>
                </button>
                <button onClick={this.onItalicClick}>
                    <em>I</em>
                </button>
                <button onClick={this.onStrikeThroughClick}>abc</button>
                <button onClick={this.onHighlight}>
                    <span style={{ background: "yellow", padding: "0.3em" }}>H</span>
                </button>

                <div style={this.style}>
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        plugins={this.plugins}
                        onChange={this.onChange}
                    />
                </div> */}

                <div style={this.state.placedDiv}></div>
            </div>
        );
    }
}

export default EditorContainer;
