import { CSSProperties, ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDeleteFileMutation, useUploadFileMutation } from '../api'
import { Close } from 'ui/icons/Close'

interface IFileField {
	folder: string
	style?: CSSProperties
	placeholder: string
	path: string
	setPath: (v: string) => void
}

const FieldContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 40px;
	grid-auto-rows: 100px;
	gap: 10px;
	place-items: center;

	> label {
		align-self: end;
		padding: 15px;
		border-radius: 10px;
		cursor: pointer;
		color: #fff;
		background-image: linear-gradient(to bottom, #654a86, #534292);
		input {
			display: none;
		}
	}

	> img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	> svg {
		width: 40px;
		height: 40px;
		cursor: pointer;
		align-self: start;
		justify-self: end;
	}
`

const FileInput = styled.input``

export const FileField: FC<IFileField> = ({
	folder,
	style,
	placeholder,
	path,
	setPath,
}) => {
	const [key, setKey] = useState(0)
	const [uploadFile, { data, isSuccess: isSuccessUpload }] =
		useUploadFileMutation()
	const [deleteFile, { isSuccess: isSuccessDeleted }] =
		useDeleteFileMutation()

	const onChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files?.length) return
		const file = new FormData()
		file.append('file', files[0])
		await uploadFile({ file, folder })
	}

	const handleDelete = async () => {
		deleteFile(path)
	}

	useEffect(() => {
		if (isSuccessUpload && data) {
			setPath(data.url)
		}
	}, [isSuccessUpload])

	useEffect(() => {
		if (isSuccessDeleted) {
			setPath('')
			setKey((key) => key + 1)
			console.log('deleted')
		}
	}, [isSuccessDeleted])

	return (
		<FieldContainer style={style}>
			<label>
				{placeholder}
				<FileInput key={key} type="file" onChange={onChangeInput} />
			</label>

			{path && <img src={path} />}
			{path && <Close onClick={handleDelete} />}
		</FieldContainer>
	)
}
