/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import{ CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { Container, FileInfo, Preview } from "./style";


// eslint-disable-next-line react/prop-types
export function FileList ({ files, onDelete }) {
	const [filesList, setFilesList ] = useState([]);

	console.log("alterou");

	useEffect(() => {
		setFilesList(files);
	}, [files]);

	const renderFiles = uploadedFile => {
		console.log("list: ", uploadedFile);
		return (

			<li key={uploadedFile.id}>
				<FileInfo>
					<Preview src={uploadedFile.preview} />

					<div>
						<strong>{uploadedFile.name}</strong>
						<span>
							{uploadedFile.readableSize}
							{!!uploadedFile.url && (<button onClick={() => onDelete(uploadedFile.id)} >Excluir</button>)}
						</span>
					</div>

				</FileInfo>

				<div>
					{ !uploadedFile.uploaded && !uploadedFile.error && (
						<CircularProgressbar
							styles={{
								root: { width: 24},
								path: { stroke: "#7159C1" }
							}}
							strokeWidth={10}

							value={uploadedFile.progress}
						/>
					)}

					{ uploadedFile.url && (
						<a
							href={uploadedFile.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<MdLink style={{ marginRight: 8 }} size={24} color="#222" />
						</a>
					) }

					{ uploadedFile.uploaded && (<MdCheckCircle size={24} color="#78E5D5" />)}
					{ uploadedFile.error && (<MdError size={24}  color="#E57878" />)}


				</div>

			</li>
		);
	};

	return (
		<Container>
			{ filesList.map(renderFiles) }
		</Container>
	);
}
