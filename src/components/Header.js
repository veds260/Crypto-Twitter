import React from 'react';
import { Link } from 'react-router-dom';
import image_logo from '../utils/logo_crow.webp'

const Header = ({ account, connectWallet }) => {
  return (
    <header className="bg-purple-700 text-gray-300 p-4 flex justify-between items-center">
      <h1 className="flex items-center text-2xl font-bold">
  <Link to="/" className="flex items-center">
    <img src={image_logo} alt="Logo" className="w-14" />
    <span className="ml-2">Nero</span>
  </Link>
</h1>

      <div>
        <span className="mr-4">{account ? `Connected: ${account}` : 'Not Connected'}</span>
        <button onClick={connectWallet} className="bg-gray-300 text-purple-700 px-4 py-2 rounded">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
