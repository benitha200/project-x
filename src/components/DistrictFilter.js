import { useState, useEffect } from 'react';

export default function DistrictFilter({ onDistrictChange, csvData }) {
  const [district, setDistrict] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    if (csvData && csvData.length > 0) {
      const options = csvData.map(entry => entry.District);
      setDistrictOptions(options);
    }
  }, [csvData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onDistrictChange(district);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        className="border p-2 mr-2 text-black"

      >
        <option value="" className='text-black'>Select a district</option>
        {districtOptions.map((option, index) => (
          <option key={index} value={option}className='text-black'>{option}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Find Crops
      </button>
    </form>
  );
}