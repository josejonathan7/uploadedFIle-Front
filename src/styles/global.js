import { createGlobalStyle } from "styled-components";
import "react-circular-progressbar/dist/styles.css";

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		font-family: Arial, Helvetica, sans-Serif;
		font-size: 14px;
		background-color: #7159c1;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
	}

	html, body, #root {
		height: 100%;
	}

`;
