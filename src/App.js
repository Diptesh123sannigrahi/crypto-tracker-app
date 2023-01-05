import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then((response) => {
      setCoins(response.data);
    }).catch((error) => {
      alert(error.message);
    });
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-test">Search a currency</h1>
        <form>
          <input type="text" placeholder='Search' className='coin-input' onChange={handleChange} />
        </form>
      </div>
      <div>
        {filteredCoins.map(coin => {
          return (
            <Coin key={coin.id} coin={coin} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
