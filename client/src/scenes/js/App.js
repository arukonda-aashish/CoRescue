import Weather from "./Weather";


import "../css/App.css";

function FloodPredict() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Kerala" />
      </div>
      
    </div>
  );
}

export default FloodPredict;
