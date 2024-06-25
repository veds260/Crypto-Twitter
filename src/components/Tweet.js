import React, { useState, useEffect } from 'react';
import getContract from '../contract';

const Tweet = () => {
  const [content, setContent] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleTweet = async () => {
    const {contract} = await getContract();
    if (contract) {
      await contract.tweet(content);
      loadTweets();
    }
  };

  const loadTweets = async () => {
    const {contract} = await getContract();
    if (contract) {
      const nextId = await contract.getNextId();
      let loadedTweets = [];
      for (let i = 0; i < Number(nextId); i++) {
        const tweet = await contract.tweets(i);
        loadedTweets.push({
          id: Number(tweet.id),
          author: tweet.author,
          content: tweet.content,
          createdAt: Number(tweet.createdAt),
        });
      }
      setTweets(loadedTweets);
    }
  };

  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Post a Tweet</h2>
      <input 
        type="text" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="What's happening?" 
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleTweet} className="bg-lime-400 text-gray-100 px-4 py-2 rounded">Tweet</button>
      <div className="mt-8">
        {tweets.map((tweet, index) => (
          <div key={index} className="border-b pb-2 mb-2">
            <p>{tweet.content}</p>
            <span className="text-sm text-gray-500">Author: {tweet.author}</span>
            <span className="text-sm text-gray-500">Created At: {new Date(tweet.createdAt * 1000).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tweet;
