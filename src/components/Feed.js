import React, { useState, useEffect } from 'react';
import getContract from '../contract';

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  const loadTweets = async () => {
    const {contract} = await getContract();
    console.log(contract);
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

  const handleFollow = async (author) => {
    const {contract} = await getContract();
    if (contract) {
      await contract.follow(author);
    }
  };

  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Latest Tweets</h2>
      <div className="mt-8 space-y-4">
        {tweets.map((tweet, index) => (
          <div key={index} className="border p-4 rounded shadow-sm">
            <p className="text-lg">{tweet.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              <span>Author: {tweet.author}</span>
              <button
                onClick={() => handleFollow(tweet.author)}
                className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
              >
                Follow
              </button>
              <br />
              <span>Created At: {new Date(tweet.createdAt * 1000).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
