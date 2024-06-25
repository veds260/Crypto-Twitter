import React, { useState, useEffect } from 'react';
import getContract from '../contract';
import Modal from 'react-modal';

// Bind modal to your appElement (for accessibility)
Modal.setAppElement('#root');

const Profile = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);

  const loadFollowing = async () => {
    const { contract, signer } = await getContract();
    if (contract && signer) {
      const signerAddress = await signer.getAddress();
      const addresses = await contract.getFollowing(signerAddress);
      setFollowing(addresses);
    }
  };

  const loadFollowers = async () => {
    const { contract, signer } = await getContract();
    if (contract && signer) {
      const signerAddress = await signer.getAddress();
      const addresses = await contract.getFollowers(signerAddress);
      setFollowers(addresses);
    }
  };

  useEffect(() => {
    loadFollowing();
    loadFollowers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <button onClick={() => setFollowingModalOpen(true)} className="bg-lime-400 text-gray-100 px-4 py-2 rounded">
        Following
      </button>
      <button onClick={() => setFollowersModalOpen(true)} className="bg-lime-400 text-gray-100 px-4 py-2 rounded ml-2">
        Followers
      </button>

      <Modal isOpen={isFollowingModalOpen} onRequestClose={() => setFollowingModalOpen(false)}>
        <h2>Following</h2>
        <ul>
          {following.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </Modal>
      
      <Modal isOpen={isFollowersModalOpen} onRequestClose={() => setFollowersModalOpen(false)}>
        <h2>Followers</h2>
        <ul>
          {followers.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Profile;
