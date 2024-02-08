
import { useState   } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import {
  collection,
  addDoc,
  db,
  doc,
  updateDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getDocs,
  onAuthStateChanged
} from "../Firebase/Firebase";
import Loader from "../Loader/Loader";
import { useDropzone } from "react-dropzone";
import Filelist from "../Filelist";
import Alert from "../Alert";
import { FaPlus } from "react-icons/fa6";

const AddPost = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tempURL, setTempUrl] = useState("");
  const [Url, setUrl] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(true);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [latestUserId, setLatestUserId] = useState(null);
  const [LatestUserName, setLatestUserName] = useState(null);
  const [opacity, setOpacity] = useState(false);



  const UploadFile = async (file) => {


    let id;
    const latestUserData = JSON.parse(localStorage.getItem("latestUser"))
    id = latestUserData.id

    // const querySnapshot = await getDocs(collection(db, "LatestUser"));
    // querySnapshot.forEach((doc) => {
    //   id = doc.data().latestUid
    //   setLatestUserId(doc.data().latestUid);
    // });

    const storageRef = ref(storage, `images/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setSubmitBtn(false);
        setIsLoader(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoader(false);
          setSubmitBtn(true);
          setUrl(downloadURL);
          console.log("File available at", Url);
        });
      }
    );
  };

  const MyDropzone = () => {
    const onDrop = (acceptedFiles) => {
      const fileName = acceptedFiles[0].path;
      const fileExtension = fileName.slice(fileName.lastIndexOf("."));
      if (
        fileExtension === ".png" ||
        fileExtension === ".jpg" ||
        fileExtension === ".jpeg" ||
        fileExtension === ".gif"
      ) {
        setTempUrl(URL.createObjectURL(acceptedFiles[0]));
        UploadFile(acceptedFiles[0]);
      } else {
        alert("This Type Of Files's Extension Can't Upload");
      }
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <>
            <FaPlus />
            <p>Add Image</p>
          </>
        )}
      </div>
    );
  };

  const FormSubmittedFun = async (e) => {
    e.preventDefault();

   

    if (!Url) {
      setIsAlert(true);
      return;
    } else {
      try {
        // const getLatestUser = await getDocs(collection(db, "LatestUser"));
        // const latestUser =  getLatestUser.docs.map((doc) => doc.data().latestUserName);
        // setLatestUserName( await latestUser[0])
        // const Name = latestUser[0]
        setIsFormSubmit(true);
        setSubmitBtn(false);
        setOpacity(true)

        const latestUserData = JSON.parse(localStorage.getItem("latestUser"))
        const LatestUserName = latestUserData.name
        const latestUserId = latestUserData.id
        const currentTimestamp = new Date(Date.now());


        const docRef = await addDoc(collection(db, "Posts"), {
          title,
          description,
          Url,
          latestUserId,
          LatestUserName,
          createdAt:currentTimestamp.toLocaleDateString()
        });

        const postsID = doc(db, "Posts", docRef.id);
        try {
          await updateDoc(postsID, {
            postId: docRef.id,
          });
          setTimeout(() => {
            setIsFormSubmit(false);
            setUrl(false);
            setTitle("");
            setDescription("");
            setTempUrl("");
            setOpacity(false)
            handleClose();
          }, 2000);
        } catch (error) {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error.message);
        
      }
    }
  };

  setTimeout(() => {
    setIsAlert(false);
  }, 5000);

  return (
    <>
     {/* want to Button in Header.jsx instead of AddPosts.jsx */}
      <Button variant="primary" onClick={handleShow} className="addPostBtn"> 
      <FaPlus className="f-5"/> 
        Add Posts 
      </Button>

      <Modal show={show} onHide={handleClose} className={`${opacity ? "opacityLess" : "yourClassNameWhenFalse"}`}>
        

       
        {opacity && <div className="afterModalLoader"> <Loader /> </div>}

        {isLoader ? (
          <div className="modalLoader">
            <Loader />
          </div>
        ) : (
          ""
        )}
        {isAlert ? <Alert msg={"Please Upload an Image"} /> : ""}

        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={(e) => {
              FormSubmittedFun(e);
            }}
          >
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="mb-3"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            >
              <Form.Control type="text" placeholder="title" required={true} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control
                required={true}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div className="uploadFiles">
                <div className="FileList">
                  <Filelist tempURL={tempURL} />
                </div>

                <div className="uploadFile">
                  <MyDropzone />
                </div>
              </div>
            </Form.Group>

            <div className="btnPostsContainer">
              <Button variant="primary" type="button" onClick={handleClose}>
                Close
              </Button>

              {submitBtn && (
                <Button variant="primary" type="submit">
                  {isFormSubmit && <Loader />}
                  Submit Post
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default AddPost;
