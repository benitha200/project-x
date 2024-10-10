"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Select, FormLabel, Grid, Heading, VStack, Text, Container, useColorModeValue, HStack, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Assuming you have a CSV import mechanism
import csvData from './../../data/cultivated_2017_A.csv';

const districtCoordinates = {
  'Nyarugenge': { lat: -1.9543, lng: 30.0608 },
  'Gasabo': { lat: -1.9071, lng: 30.1201 },
  'Kicukiro': { lat: -1.9974, lng: 30.0782 },
  'Nyanza': { lat: -2.3507, lng: 29.7409 },
  'Gisagara': { lat: -2.5946, lng: 29.8245 },
  'Nyaruguru': { lat: -2.7439, lng: 29.5481 },
  'Huye': { lat: -2.5967, lng: 29.7392 },
  'Nyamagabe': { lat: -2.4804, lng: 29.4648 },
  'Ruhango': { lat: -2.2184, lng: 29.7784 },
  'Muhanga': { lat: -2.0799, lng: 29.7562 },
  'Kamonyi': { lat: -1.9985, lng: 29.8680 },
  'Karongi': { lat: -2.1579, lng: 29.3697 },
  'Rutsiro': { lat: -1.9470, lng: 29.3261 },
  'Rubavu': { lat: -1.6842, lng: 29.3386 },
  'Nyabihu': { lat: -1.6556, lng: 29.4981 },
  'Ngororero': { lat: -1.8546, lng: 29.5869 },
  'Rusizi': { lat: -2.4851, lng: 28.9063 },
  'Nyamasheke': { lat: -2.3284, lng: 29.1417 },
  'Rulindo': { lat: -1.7189, lng: 29.9834 },
  'Gakenke': { lat: -1.6958, lng: 29.7845 },
  'Musanze': { lat: -1.4976, lng: 29.6348 },
  'Burera': { lat: -1.4569, lng: 29.8253 },
  'Gicumbi': { lat: -1.7089, lng: 30.1017 },
  'Rwamagana': { lat: -1.9485, lng: 30.4345 },
  'Nyagatare': { lat: -1.2977, lng: 30.3278 },
  'Gatsibo': { lat: -1.5894, lng: 30.4577 },
  'Kayonza': { lat: -1.9409, lng: 30.6566 },
  'Kirehe': { lat: -2.2669, lng: 30.7324 },
  'Ngoma': { lat: -2.1479, lng: 30.4764 },
  'Bugesera': { lat: -2.1586, lng: 30.2506 },
};

const MapComponent = ({ districts }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = { lat: -1.9441, lng: 30.0619 }; // Center of Rwanda

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
      >
        {districts.map(district => {
          const position = districtCoordinates[district.name];
          return position ? (
            <Marker
              key={district.name}
              position={position}
              title={`${district.name}: ${district.value.toFixed(2)}`}
            />
          ) : null;
        })}
      </GoogleMap>
    </LoadScript>
  );
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('Cereals');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const crops = ['Cereals', 'Maize', 'Sorghum', 'Paddy rice', 'Wheat', 'Other cereals', 'Tubers and Roots', 'Cassava', 'Sweet potatoes', 'Irish potatoes', 'Yams & Taro', 'Bananas', 'Cooking banana', 'Dessert banana', 'Banana for beer', 'Legumes and Pulses', 'Beans', 'Bush bean', 'Climbing bean', 'Peas', 'Ground nuts', 'Soya beans', 'Vegetables and Fruits', 'vegetables', 'Fruits', 'Other crops'];


  useEffect(() => {
    setData(csvData);
  }, []);

  const districtData = data.map(item => ({
    name: item.District,
    value: parseFloat(item[selectedCrop]) || 0
  })).sort((a, b) => b.value - a.value).slice(0, 5); // Top 10 districts based on crop

  const cropData = selectedDistrict
    ? Object.entries(data.find(item => item.District === selectedDistrict) || {})
      .filter(([key, value]) => crops.includes(key) && value !== '-')
      .map(([key, value]) => ({ name: key, value: parseFloat(value) || 0 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
    : [];


  return (
    <>
      <Box className='w-full bg-sky-700 text-center p-4'>
        {/* <Span>PROJECT X</h1> */}
        <span className='text-white text-3xl font-bold'>PROJECT X</span>
      </Box>
      <HStack>
        <VStack className='w-1/4'>
          <span className='text-2xl font-bold text-slate-800'>Filter By <span className='text-sky-600'>Crop</span> or <span className='text-sky-600'>District</span></span>
          <Box mb={6} className='p-6 w-full'>
            <FormLabel className='m-2'>Select Crop</FormLabel>
            <Select className='border border-slate-500 w-full p-5 rounded' value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </Select>
          </Box>
          <Box mb={6} className='p-6 w-full'>
            <FormLabel className='m-2'>Select District</FormLabel>
            <Select className='border w-full border-slate-500 p-5 rounded' value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
              {data.map(item => (
                <option key={item.District} value={item.District}>{item.District}</option>
              ))}
            </Select>
          </Box>
        </VStack>
        <Box mt={6} className='w-3/4'>
          <FormLabel className='text-xl font-bold'>Map of Top 5 Districts</FormLabel>
          <MapComponent districts={districtData} />
        </Box>
      </HStack>

      <HStack className='mt-12'>
        <Card  className='bg-slate-100 p-4 m-4 w-full'>
          <CardHeader>
            <span className='text-slate-800 text-2xl p-6 font-bold'>Top 5 <span className='text-sky-600 text-2xl'>{selectedCrop}</span> Growing Districts</span>
          </CardHeader>
          <CardBody>
            <BarChart width={800} height={300} data={districtData} className='mt-12'>
              {/* <CartesianGrid strokeDasharrayx="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0EA5E9" />
            </BarChart>
          </CardBody>

        </Card>
        <Card className='w-full bg-slate-100 p-4 m-4'>
        <CardHeader>
           <span className='text-slate-800 text-2xl p-6 font-bold'>Top 5 <span className='text-teal-600 text-2xl'>{selectedDistrict}</span> Growing Districts</span>
        </CardHeader>
          <BarChart width={800} height={300} data={cropData} className='mt-12'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#14B8A6" />
          </BarChart>
        </Card>

      </HStack>


    </>

  );
};

export default Dashboard;
