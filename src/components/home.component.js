import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
<<<<<<< Updated upstream
import CarouselPage from "./home/CarouselPage";
=======
import Employee1 from "./Employee1";
import Employee from "./Employee1";
>>>>>>> Stashed changes

const Home = () => {

  const [content, setContent] = useState("");



  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <>
   
      <CarouselPage/>
      <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <Employee1 />
      </header>
    </div>
    </>
  );
};

export default Home;