import "./SingleCell.css";

const SingelCell = ({
  card,
  cover,
  handleChoice,
  displayCard,
  selectRestricted,
}) => {
  // when user click to make a selection
  const handleCLick = () => {
    // only fire when user already select 2 choices
    if (!selectRestricted) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div
        className={displayCard ? "show" : "" /*dynamically change html class*/}
      >
        <img className="front" src={card.src} alt="card front" />

        <img
          className="cover"
          src={cover}
          alt="card back"
          onClick={handleCLick}
        />
      </div>
    </div>
  );
};

export default SingelCell;
