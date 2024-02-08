
const Filelist = ({tempURL}) =>{
  console.log(tempURL)
  return (
    <div className="UploadImageTempContainer">
      {tempURL && <img className="img-fluid uploadImageTemp" src={tempURL} alt="" /> }
    </div>
  )
}

export default Filelist