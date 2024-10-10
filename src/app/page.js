"use client"
import { useState } from 'react';
import CropFilter from '../components/CropFilter';
import DistrictFilter from '../components/DistrictFilter';
import MapComponent from '../components/Map';

export default function Home() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [topDistricts, setTopDistricts] = useState([]);
  const [topCrops, setTopCrops] = useState([]);

  const handleCropChange = (crop) => {
    setSelectedCrop(crop);
    setTopDistricts(['Kigali', 'Butare', 'Gisenyi', 'Kibuye', 'Byumba']);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setTopCrops(['Crop1', 'Crop2', 'Crop3', 'Crop4', 'Crop5']);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Rwanda Crop and District Finder</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Interactive Map</h2>
            <MapComponent districts={topDistricts} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Find Districts by Crop</h2>
              <CropFilter onCropChange={handleCropChange} />
              {selectedCrop && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Top Districts for {selectedCrop}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {topDistricts.map((district, index) => (
                      <li key={index} className="text-gray-700">{district}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Find Crops by District</h2>
              <DistrictFilter onDistrictChange={handleDistrictChange} />
              {selectedDistrict && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Top Crops in {selectedDistrict}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {topCrops.map((crop, index) => (
                      <li key={index} className="text-gray-700">{crop}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2023 Rwanda Crop and District Finder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}