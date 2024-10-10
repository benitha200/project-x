// File: components/CropFilter.js
import { useState } from 'react';

export default function CropFilter({ onCropChange }) {
  const [crop, setCrop] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCropChange(crop);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        placeholder="Enter crop name"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Find Districts
      </button>
    </form>
  );
}