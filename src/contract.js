import { BrowserProvider, Contract } from 'ethers';
import TwitterABI from './ABI/TwitterABI.json'; // Ensure this path is correct

const contractAddress = '0xc3614e5BcB5f76Fcd9759ae7bd2a8db14C0A6BA8'; // Replace with your new contract address

const getContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, TwitterABI, signer);
    return { contract, signer };
  } else {
    console.error('Ethereum wallet is not detected');
    return null;
  }
};

export default getContract;
