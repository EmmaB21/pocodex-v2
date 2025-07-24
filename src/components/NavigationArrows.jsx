function NavigationArrows({ onPrevious, onNext }) {
  
  return (
    <>
      <button className="arrow left-arrow" onClick={onPrevious}>←</button>
      <button className="arrow right-arrow" onClick={onNext}>→</button>
    </>
  );
}

export default NavigationArrows;
