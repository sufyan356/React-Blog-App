import { useDropzone } from 'react-dropzone';

function MyDropzone() {
  const onDrop = acceptedFiles => {
    console.log(acceptedFiles[0])
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>click to select files</p>
      }
    </div>
  )
}
export default MyDropzone;