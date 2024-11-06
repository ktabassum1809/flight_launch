import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  font-family: Arial, sans-serif;

  padding: 20px;
`;
const Container = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url(${props.bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}))`
  width: 80%;
color: white;
  border: 1px solid black;
  margin: 10px;
  min-height: 300px;
  padding: 10px;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  margin: 20px;
  margin-left: 50px;
  padding: 10px;
`;

const A = styled.a`
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fad390);
  display: inline-block;
    color: darkblue;
    border: none;
    border-radius: 8px;
   
    padding: 15px 10px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
   text-decoration: none;
   margin-top: 130px;
    transition: transform 0.2s, box-shadow 0.2s;
 width: 200px;
    &:hover {
    transform: scale(1.05);
     box-shadow: 0px 4px 15px rgba(255, 154, 158, 0.5);
}

    `;

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  const backgroundImages = [
    "https://i.imgur.com/IGlBYaC.jpg",
    "https://img.freepik.com/free-vector/spacecraft-realistic-background_1284-72905.jpg?semt=ais_hybrid_1_0_0_0&sqp=CPzQvIUG&rs=AMzJL2m1",
    "https://png.pngtree.com/thumb_back/fh260/background/20200806/pngtree-aesthetic-planet-and-natural-satellite-background-image_386071.jpg",
  ];

  return (
    <Div>
      <h1>SpaceX Launches</h1>
      {data ? (
        data.slice(0, 3).map((item, index) => (
          <Container
            key={item.flight_number}
            bgImage={backgroundImages[index % backgroundImages.length]}
          >
            <NavLink to={`/${item.flight_number} `} style={{color:'white',textDecoration: 'none'}}>
            
              <h3>SpaceX Mission: {item.mission_name}</h3>
             

            </NavLink>
            <A href={item.links.video_link} >Relive The Launch </A>
          </Container>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Div>
  );
}

export default Home;
