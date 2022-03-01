import styled, { css } from "styled-components";

const dragActive = css`
	border-color: #78E5D5;
`;

const dragReject = css`
	border-color: #E57878;
`;

export const DropContainer = styled.div.attrs({
	className: "dropzone"
})`
	border: 1px dashed #DDD;
	border-radius: 4px;
	cursor: pointer;

	transition: height 0.2s ease;

	${props => props.isDragActive && dragActive}
	${props => props.isDragReject && dragReject}

`;

const messageColors = {
	default: "#999",
	error: "#E57878",
	success: "#78E5D5"
};

export const UploadMessage = styled.p`
	display: flex;
	color: ${props => messageColors[props.type || "default"]};
	justify-content: center;
	align-items: center;
	padding: 15px 0;
`;
