export default function Win(prop) {
  return (
    <>
      <div className="black-background"></div>
      <div className="win-container">
      <div className="congratulation-container">CONGRATULATION</div>
        You Won !!
        <input
          className="new-game-button"
          type="button"
          value="NEW GAME"
          onClick={prop.clickChange}
        />
      </div>
      ;
    </>
  );
}
