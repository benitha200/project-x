import { useState, useEffect } from 'react';

export default function CropFilter({ onCropChange, csvData }) {
  const [crop, setCrop] = useState('');
  const [cropOptions, setCropOptions] = useState([]);

  useEffect(() => {
    if (csvData && csvData.length > 0) {
      const options = Object.keys(csvData[0]).filter(key => key !== 'District');
      setCropOptions(options);
    }
  }, [csvData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCropChange(crop);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        className="border p-2 mr-2 text-black"
      >
        <option value="">Select a crop</option>
        {cropOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Find Districts
      </button>
    </form>
  );
}