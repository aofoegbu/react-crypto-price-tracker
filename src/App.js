import React, { useState, useEffect } from "react";
import Axios from "axios";
import Coin from "./components/Coin";
import "./App.css";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <div className="title">
          <h1>Ogelo Crypto Tracker </h1>
        </div>
        <div className="inputDiv">
          <input
            type="text"
            placeholder="Enter Coin Name..."
            onChange={onChange}
          />
        </div>
      </div>

      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              price={coin.price}
              icon={coin.icon}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
