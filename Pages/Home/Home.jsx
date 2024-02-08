import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import {
  collection,
  db,
  getDocs,
  onAuthStateChanged,
  auth,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "../../Components/Firebase/Firebase"; // Updated import
import "./Home.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Swal from 'sweetalert2'

const { Meta } = Card;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [latestUser, setLatestUser] = useState(null);
  const [latestUserName, setLatestUserName] = useState(null);




  const editPost = async (dltPostID) => {
    const editPostID = posts.find((val) => val.postId === dltPostID);
    if(editPostID){
      console.log(editPostID)
      const editTitle = prompt("edit Title" , editPostID.title)
      const editDescription = prompt("edit Description" , editPostID.description)
     if(!editTitle || !editDescription){
      Swal.fire({
        title: "Please Enter All Fields!",
        text: "You clicked the button!",
        icon: "error"
      });
      return;
     }
     else{
      const editableID = doc(db, "Posts", dltPostID);
  
      await updateDoc(editableID, {
        title:editTitle,
        description:editDescription
      });
     }
     
    }
    
    
     
  };
  

  const deletePost = async(dltPostID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, "Posts", dltPostID));
        Swal.fire({
          title: "Deleted!",
          text: "Post Deleted Successfully!..",
          icon: "success"
        });
      }
    });

   
   }

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "Posts"));
    //     // const getLatestUser = await getDocs(collection(db, "LatestUser"));

    //     const postsData = querySnapshot.docs.map((doc) => doc.data());
    //     // const latestUser = getLatestUser.docs.map((doc) => doc.data().latestUserName);
    //     // setLatestUserName(latestUser[0])
    //     // console.log("HM =>" , latestUser[0])
    //     setPosts(postsData);
    //   } catch (error) {
    //     console.log(error.code);
    //     console.log(error.message);
    //   }
    // };

    // fetchData();

    // Subscribe to post changes using onSnapshot
    const unsubscribe =  onSnapshot(  collection(db, "Posts"), (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => doc.data());
       setPosts(updatedPosts);
      const latestUserData = JSON.parse(localStorage.getItem("latestUser"))
       setLatestUser(latestUserData.id);

    });

    // const authUnsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log("LatestUser => ", latestUser);
    //   }
    // });

    return () => {
      // Cleanup the listeners when the component unmounts
      unsubscribe();
      // authUnsubscribe();
    };
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <h1 className="text-center mt-2 mb-2 blogHeading">All Blogs</h1>
          {posts.map((post, index) => (
            <Col
              key={index}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="cardsContainer mt-4"
            >
              <Card
                style={{
                  width: "18rem",
                }}
                cover={<img className="PostImg" alt="example" src={post.Url} />}
                actions={
                  latestUser === post.latestUserId && [
                    <EditOutlined key="edit"  title = "edit post" onClick={() => {editPost(post.postId)}}/>,
                    <DeleteOutlined key="delete"  title = "delete post" onClick={() => {deletePost(post.postId)}}/>,
                  ]
                }
                >
                  <div className="publishedName">
                    <span>Published By: {post.LatestUserName}</span>
                  </div>
                
                <Link
                  to={`blog-description/${post.postId}`}
                  className="LinkClass"
                  title="Post Description"
                >
                  <div className="cardDescription">
                    <FaArrowRight />
                  </div>
                </Link>
                  

                <Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                  }
                  title={post.title}
                  description={post.description}
                />
              </Card>

            </Col>
          ))}
        </Row>
      </Container>
      
    </>
  );
};

export default Home;
