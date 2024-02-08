import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import {auth , signOut} from '../../Components/Firebase/Firebase'
import AddPost from "../../Components/AddPost";


const signOutFun = async () => {
  const signOutSuccessfully = await signOut(auth)
    try{
      console.log('Sign Out Successfully!..')
    }
    catch(error){
      console.log(error.message)

    }
};

const Header = ({ name }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand >
          <Link className="linksImages">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaTL3RSa4_vdDg2R0UR9k_1XKaej3B6SqxQ&s"
              alt="blog-logo"
              className="logoClass img-fluid"
            />
          </Link>
        </Navbar.Brand>
        <div className="Greetings">
          <div className="GreetingsSpan">
            <span>Welcome : {name}</span>
          </div>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
          </Nav>

          <div className="btnContainer">
           {/* this place i want to add button when i click button modal will open Currently this is Header.jsx file  */}
            <Button
              variant="outline-success"
              onClick={() => {
                signOutFun();
              }}
            >
              Logout
            </Button>

            <AddPost />

          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

// import React from "react";
// import { Button, Container, Nav, Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "./Header.css";
// import { auth, signOut } from "../../Components/Firebase/Firebase";
// import AddPost from "../../Components/AddPost";

// const signOutFun = async () => {
//   const signOutSuccessfully = await signOut(auth);
//   try {
//     console.log("Sign Out Successfully!..");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const Header = ({ name }) => {
//   const handleShowAddPostModal = () => {
//     // Trigger the handleShow function from AddPost component
//     AddPost.handleShow();
//   };

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container fluid>
//         <Navbar.Brand href="#">
//           <Link className="linksImages">
//             <img
//               src="../../Images/blog-logo.png"
//               alt="blog-logo"
//               className="logoClass img-fluid"
//             />
//           </Link>
//         </Navbar.Brand>
//         <div className="Greetings">
//           <div className="GreetingsSpan">
//             <span>Welcome : {name}</span>
//           </div>

//           <div className="addPostBtnContainer">
//             <Button
//               variant="primary"
//               onClick={handleShowAddPostModal}
//               className="addPostBtnCustom"
//             >
//               Add Posts
//             </Button>
//           </div>
//         </div>

//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           ></Nav>

//           <div className="btnContainer">
//             {/* Add Posts button */}

//             <Button
//               variant="outline-success"
//               onClick={() => {
//                 signOutFun();
//               }}
//             >
//               Logout
//             </Button>
           
//           </div>
//         </Navbar.Collapse>
       
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;
