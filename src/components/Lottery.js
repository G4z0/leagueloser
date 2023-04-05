import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import hextechChestImage from "./chest-key.png";
import backgroundImage from "./imagelol.png"
import "./Lottery.module.css"
import Confetti from "react-confetti";

const reasons = [
  "Poor team communication",
  "Bad champion matchups",
  "Lack of vision control",
  "Poor objective control",
  "Mispositioning in team fights",
  "Disconnects or AFK players",
  "Getting out-farmed by the enemy",
  "Tilting or negative attitude",
  "Inability to adapt to enemy strategy",
  "Overextending and getting caught",
];

const LolColors = [
  "#1C1C1C", // Black
  "#C0C0C0", // Silver
  "#CD7F32", // Bronze
  "#FFD700", // Gold
  "#E5E4E2", // Platinum
  "#B9F2FF", // Diamond
  "#4B0082", // Master
  "#800000", // Grandmaster
  "#FF4500", // Challenger
  "#50C878", // Emerald
];

const LolPlayButton = styled.button`
  position: absolute;
  bottom: 15px;
  background-image: linear-gradient(135deg, #404040, #1f1f1f);
  font-family: 'Marcellus SC', serif;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 20px 30px; 
  background: #1e2328;
  color: #cdbe91;
  box-shadow: inset 0 0 2px #000000;
  border-image: linear-gradient(to bottom, #c8aa6d, #7a5c29);
  border-image-slice: 1;
  border-width: 2px;
&:hover {
  text-shadow: 0 0 5px #ffffff80;
  box-shadow: 0 0 8px 0 #ffffff50;
  background: linear-gradient(to bottom, #1e2328, #433d2b);
  cursor: pointer;
  transition: 0.1s;
}
&:active {
  text-shadow: none;
  box-shadow: none;
  color: #cdbe9130;
}
`;

const CarouselItem = styled.div`
  background-color: ${(props) => props.bgColor};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 300px; // Set the width to be equal to the height
  font-size: 1.2em;
  border-radius: 50%; // Make the item round
`;
const HextechChest = styled.img`
  max-width: 200px;
  cursor: pointer;
`;
const CarouselMask = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 4;
`;


function Lottery() {
  const [reason, setReason] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [useConfetti, setUseConfetti] = useState(false);

  const generateReason = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setReason(reasons[randomIndex]);
    setSpinning(true);
    setShowCarousel(true);
  };

  const onStopSpinning = () => {
    setTimeout(() => {
      setSpinning(false);
      setUseConfetti(true);
    }, 2000);
  };
  

  const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px 20px;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative; 
`;


const StyledCarousel = styled(Carousel)`
  z-index: 2;
  width: 300px;
  height: 300px;
`;


const ResultOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
  z-index: 1; // Add this line

  &.visible {
    opacity: 1;
  }
`;

  return (
    <Container>
      {showCarousel ? (
        <CarouselMask>
        <StyledCarousel
           selectedItem={reasons.indexOf(reason)}
            transitionTime={200}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            showArrows={false}
            infiniteLoop={true}
            swipeable={false}
            emulateTouch={false}
            autoPlay={spinning}
            interval={200}
            onChange={onStopSpinning}
        >
          {reasons.map((reason, index) => (
            <CarouselItem key={index} bgColor={LolColors[index % LolColors.length]}>
              {reason}
            </CarouselItem>
          ))}
        </StyledCarousel>
        </CarouselMask>
      ) : (
        <HextechChest src={hextechChestImage} alt="Hextech Chest" onClick={generateReason} />
      )}
      <br />
      {!showCarousel && (
       <LolPlayButton onClick={generateReason}>SPIN THE WHEEL!</LolPlayButton>
      )}
      <ResultOverlay className={reason && !spinning ? "visible" : ""}>
      {useConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      </ResultOverlay>
    </Container>
  );
}

export default Lottery;
