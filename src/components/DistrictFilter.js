// File: components/DistrictFilter.js
import { useState } from 'react';

export default function DistrictFilter({ onDistrictChange }) {
  const [district, setDistrict] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onDistrictChange(district);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        placeholder="Enter district name"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Find Crops
      </button>
    </form>
  );
}