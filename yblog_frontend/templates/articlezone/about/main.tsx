import React from "react"
import ReactDOM from "react-dom"
import {MathJaxContext} from "../base/construction"
ReactDOM.render(
	<React.StrictMode>
		<div><MathJaxContext> $12$ </MathJaxContext> about! </div>
	</React.StrictMode>,
	document.getElementById("root")
)
