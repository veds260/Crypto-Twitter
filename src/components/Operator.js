import React, { useState } from 'react';
import getContract from '../contract';

const Operator = () => {
  const [operator, setOperator] = useState('');
  const [isAllowed, setIsAllowed] = useState(true);

  const handleSetOperator = async () => {
    const {contract} = await getContract();
    if (contract) {
      if (isAllowed) {
        await contract.allow(operator);
      } else {
        await contract.disallow(operator);
      }
      setOperator('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Set Operator</h2>
      <input
        type="text"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        placeholder="Operator Address"
        className="border p-2 w-full mb-4"
      />
      <select
        value={isAllowed}
        onChange={(e) => setIsAllowed(e.target.value === 'true')}
        className="border p-2 w-full mb-4"
      >
        <option value="true">Allow</option>
        <option value="false">Disallow</option>
      </select>
      <button onClick={handleSetOperator} className="bg-lime-400 text-gray-100 px-4 py-2 rounded">
        Set Operator
      </button>
    </div>
  );
};

export default Operator;
