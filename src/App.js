import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Tweet from './components/Tweet';
import Feed from './components/Feed';
import Message from './components/Message';
import Operator from './components/Operator';
import Profile from './components/Profile';
import './App.css';

const App = () => {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert('Please install MetaMask to use this app.');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header account={account} connectWallet={connectWallet} />
        <nav className="p-4 bg-lime-400 text-gray-100">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/feed" className="mr-4">Feed</Link>
          <Link to="/messages" className="mr-4">Messages</Link>
          <Link to="/operators" className="mr-4">Operators</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div className="content p-4">
          <Routes>
            <Route path="/" element={<Tweet />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/operators" element={<Operator />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
