import { useParams } from "react-router-dom";
import { collection, db, getDocs } from "../../Components/Firebase/Firebase";
import { useState, useEffect } from "react";
import { Image } from "antd";

import "./BlogDescription.css";

const BlogDescription = () => {
  const { id } = useParams(); // Destructure id from useParams
  const [postsId, setPostsId] = useState(null);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Posts"));
        const postsDataArray = [];

        querySnapshot.forEach((val) => {
          postsDataArray.push(val.data());
        });

        setPostsData(postsDataArray);

        const isPost = postsDataArray.find((val) => val.postId === id);
        setPostsId(isPost);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {postsId && (
        <>
        <div className="blogDesHead">
          <h1 className="text-center mt-2 mb-2 blogHeading">Blog Details</h1>
          <span>Created At: {postsId.createdAt}</span>

        </div>
         
          <div className="blogDescriptionBox" key={postsId.postId}>
              <Image
                width={200}
                src={postsId.Url}
              />{" "}
          </div>
        <div className="BlogContainerForTitleAndDescription">
          <div className="text-center mt-2">
              <b>{postsId.title}</b>
          </div>
          <div className="text-justify mt-2 p-3">
            {postsId.description}
          </div>
        </div>
          
        </>
       
      )}
    </div>
  );
};

export default BlogDescription;
