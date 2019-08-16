import React from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "../plugins/highlightPlugin";
import Draggable from 'react-draggable';
import './EditorContainer.css';

const highlightPlugin = createHighlightPlugin();

class EditorContainer extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            notes: [],
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
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE"));
    };

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    };

    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC"));
    };

    onStrikeThroughClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH"));
    };

    onHighlight = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT"));
    };

    isBetween = (x, min, max) => {
        return x >= min && x <= max;
    }



    showWhereClicked = (e) => {
        console.log(`you have clicked X:${e.clientX} Y:${e.clientY}`);

        const newDiv = {
            top: `${e.clientY}px`,
            left: `${e.clientX}px`,
            width: '300px',
            height: '200px',
            backgroundColor: 'green',
            position: 'absolute',
        }

        // check if we have any existing notes
        if (this.state.notes.length > 0) {
            console.log(`we have more than one note`);
            // prevent users from placing notes when you click in the same spot
            this.state.notes.forEach(note => {

                console.log(`Note Top: ${note.top}
                \n Note Left: ${note.left}
                \n ClientY: ${e.clientY}
                \n ClientX: ${e.clientX}
                \n Min: ${e.clientY - 100}
                \n Max: ${(e.clientY + 100)} 
                \n TOP Bool: ${(this.isBetween(e.clientY, (note.top - 100), (note.top + 100)))}`)




                // if a note already exists in that spot

                // if (isBetween(node.top, e.clientX - 100, e.clientX + 100) && (isBetween(node.top, e.clientY - 100, e.clientY + 100)) {
                //     // then allow them to create a new one
                //     console.log(`note exists here`);
                //     // this.state.notes.push(newDiv);
                //     // console.log(this.state.notes.length);
                //     // console.log(this.state.notes);
                // }
            });

            // if we don't then add a new note and continue our antics
        } else {
            this.state.notes.push(newDiv);
            console.log(this.state.notes.length);
            console.log(this.state.notes);
        }


    }

    render() {
        return (

            <div className="editorContainer" onClick={this.showWhereClicked}>
                <Draggable>
                    <div style={this.state.placedDiv}>
                        <button onClick={this.onUnderlineClick}>U</button>
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
                        </div>
                    </div>
                </Draggable>
            </div>

        );
    }
}

export default EditorContainer;
