import React, { useState, useCallback, useEffect } from "react";
import { uniqueId } from "lodash";
import fileSize from "filesize";
import api from "./service/api";
import GlobalStyle from "./styles/global";
import { Container, Content } from "./style";
import { Upload } from "./components/Upload";
import { FileList } from "./components/FileList";


function App() {
	const [uploadedFiles, setUploadedFiles] = useState([]);

	const handleUpload = (files) => {
		const uploaded = files.map(file => ({
			file: file,
			id: uniqueId(),
			name: file.name,
			readableSize: fileSize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			uploaded: false,
			error: false,
			url: null
		}));

		Promise.resolve(setUploadedFiles(uploaded)).then(() => uploadedFiles.forEach(processUpload));
	};

	const updateFile = useCallback((id, data) => {
		console.log("id: ", id);
		console.log(parseInt(id)+1);
		setUploadedFiles((state) =>
			state.map((file) => (file.id == parseInt(id)+1 ? { ...file, ...data } : file))
		);
	}, []);

	const processUpload = useCallback(
		(uploadedFile) => {
			const data = new FormData();
			if (uploadedFile.file) {
				data.append("file", uploadedFile.file, uploadedFile.name);
			}

			api
				.post("posts", data, {
					onUploadProgress: (progressEvent) => {
						let progress = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);

						console.log(
							`A imagem ${uploadedFile.name} está ${progress}% carregada... `
						);

						updateFile(uploadedFile.id, { progress });
					},
				})
				.then((response) => {
					console.log(
						`A imagem ${uploadedFile.name} já foi enviada para o servidor!`
					);

					updateFile(uploadedFile.id, {
						uploaded: true,
						id: response.data._id,
						url: response.data.url,
					});
				})
				.catch((err) => {
					console.error(
						`Houve um problema ao fazer upload da imagem ${uploadedFile.name} no servidor AWS`
					);
					console.log(err);

					updateFile(uploadedFile.id, {
						error: true,
					});
				});
		},
		[updateFile]
	);


	const handleDelete = async id => {
		await api.delete(`/posts/${id}`);

		setUploadedFiles(prevState => prevState.filter(file => file.id !== id));

	};

	useEffect(() => {
		async function load() {
			const response = await api.get("posts");


			setUploadedFiles(response.data);
		}

		load();

		return () => uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
	}, []);

	return (

		<Container>
			<Content>
				<Upload onUpload={handleUpload} />
				{
					!!uploadedFiles.length && (
						<FileList files={uploadedFiles} onDelete={handleDelete} />
					)
				}
			</Content>
			<GlobalStyle/>
		</Container>
	);
}

export default App;
