

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MissionTitle = styled.h1`
  color: #4facfe;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  font-size: 1.1em;
  margin: 8px 0;
`;

const HighlightText = styled.span`
  color: #ff6b6b;
  font-weight: bold;
`;

const Image = styled.img`
  width: 150px;
  height: auto;
  margin: 20px 0;
  border-radius: 8px;
`;

const LinkButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 242, 254, 0.5);
  }
`;

function SingleFlightDetails() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/launches/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setInfo(data);
      });
  }, [id]);

  return (
    <Container>
      {info ? (
        <div>
          <MissionTitle>SpaceX Mission: {info.mission_name}</MissionTitle>
          <InfoText>Flight Number: {info.flight_number}</InfoText>
          <InfoText>Launch Year: {info.launch_year}</InfoText>
          <InfoText>Launch Date: {new Date(info.launch_date_utc).toLocaleString()}</InfoText>
          <InfoText>Launch Site: {info.launch_site ? info.launch_site.site_name : 'N/A'}</InfoText>
          <InfoText>Rocket Name: {info.rocket ? info.rocket.rocket_name : 'N/A'}</InfoText>
          <InfoText>
            Launch Success/Failure: {info.launch_success ? "Successful" : <HighlightText>{info.launch_failure_details.reason}</HighlightText>}
          </InfoText>
          <InfoText>Details: {info.details}</InfoText>
          <Image src={info.links.mission_patch} alt="Mission Patch" />
          <LinkButton href={info.links.wikipedia} target="_blank" rel="noopener noreferrer">
            Wikipedia
          </LinkButton>
        </div>
      ) : (
        <InfoText>Loading...</InfoText>
      )}
    </Container>
  );
}

export default SingleFlightDetails;
