import "./App.css";
import { useEffect, useState } from "react";
import SingelCell from "./components/SingleCell";

import bear from "./assets/bear.jpg";
import dragon from "./assets/dragon.jpg";
import fire from "./assets/fire.jpg";
import horse from "./assets/horse.jpg";
import knight from "./assets/knight.jpg";
import lion from "./assets/lion.jpg";

import cover from "./assets/cardback.jpg";

//list of images
let pics = [
  { src: bear, matched: false },
  { src: dragon, matched: false },
  { src: fire, matched: false },
  { src: horse, matched: false },
  { src: knight, matched: false },
  { src: lion, matched: false },
];

function App() {
  /**
   * these states store the card deck value and the turn value
   */
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  /**these states store the 2 choices when user select 2 cards in a turn */
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);

  /**this state is for restricting users to click on more card after already making 2 selection */
  const [selectRestricted, setSelectRestricted] = useState(false);

  //this restart the game whenever you refresh the page
  useEffect(() => {
    shuffleCard();
  }, []);

  // shuffle the cards
  const shuffleCard = () => {
    const newCards = [...pics, ...pics]
      .sort(function (a, b) {
        return 0.5 - Math.random();
      })
      .map((c) => ({ ...c, id: Math.random() }));

    setCards(newCards);
    setTurns(0);

    //reset all card choices
    setFirstChoice(null);
    setSecondChoice(null);
  };

  // set the choice when a card is selected
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  //compare if two choices are matched/unmatched
  useEffect(() => {
    //only fire if the two card choices are not null
    if (firstChoice && secondChoice) {
      setSelectRestricted(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            //because both choices will have the same src, only need to compare either firstChoice or secondChoice
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // give a delay before reseting turns, this help to smooth out animation
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  //reset 2 choices when a turn is done
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((turns) => turns + 1);
    setSelectRestricted(false);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button className="button" onClick={shuffleCard}>
        New Game
      </button>

      <div className="game-grid">
        {cards.map((c) => (
          <SingelCell
            card={c}
            cover={cover}
            key={c.id}
            handleChoice={handleChoice}
            displayCard={c === firstChoice || c === secondChoice || c.matched}
            selectRestricted={selectRestricted}
          ></SingelCell>
        ))}
      </div>

      <div>
        <p>Turn: {turns}</p>
      </div>
    </div>
  );
}

export default App;
