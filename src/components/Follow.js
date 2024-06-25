import React, { useState } from 'react';
import tweetContract from '../contract';

const Follow = () => {
  const [followAddress, setFollowAddress] = useState('');

  const handleFollow = async () => {
    await tweetContract.follow(followAddress);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Follow a User</h2>
      <input 
        type="text" 
        value={followAddress} 
        onChange={(e) => setFollowAddress(e.target.value)} 
        placeholder="User Address to Follow" 
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleFollow} className="bg-blue-600 text-white px-4 py-2 rounded">Follow</button>
    </div>
  );
};

export default Follow;
