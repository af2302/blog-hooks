import React from "react";
import ReactMarkdown from "react-markdown";


const MarkdownBody = ({text}) => {
    return(
        <ReactMarkdown children={text}/>
    )
}


export default MarkdownBody;