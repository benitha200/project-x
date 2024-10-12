// "use client";
// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Box, Select, FormLabel, Grid, Heading, VStack, Text, Container, useColorModeValue, HStack, Card, CardHeader, CardBody, ChakraBaseProvider, ChakraProvider } from '@chakra-ui/react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// // Assuming you have a CSV import mechanism
// import csvData from './../../data/cultivated_2017_A.csv';

// const districtCoordinates = {
//   'Nyarugenge': { lat: -1.9543, lng: 30.0608 },
//   'Gasabo': { lat: -1.9071, lng: 30.1201 },
//   'Kicukiro': { lat: -1.9974, lng: 30.0782 },
//   'Nyanza': { lat: -2.3507, lng: 29.7409 },
//   'Gisagara': { lat: -2.5946, lng: 29.8245 },
//   'Nyaruguru': { lat: -2.7439, lng: 29.5481 },
//   'Huye': { lat: -2.5967, lng: 29.7392 },
//   'Nyamagabe': { lat: -2.4804, lng: 29.4648 },
//   'Ruhango': { lat: -2.2184, lng: 29.7784 },
//   'Muhanga': { lat: -2.0799, lng: 29.7562 },
//   'Kamonyi': { lat: -1.9985, lng: 29.8680 },
//   'Karongi': { lat: -2.1579, lng: 29.3697 },
//   'Rutsiro': { lat: -1.9470, lng: 29.3261 },
//   'Rubavu': { lat: -1.6842, lng: 29.3386 },
//   'Nyabihu': { lat: -1.6556, lng: 29.4981 },
//   'Ngororero': { lat: -1.8546, lng: 29.5869 },
//   'Rusizi': { lat: -2.4851, lng: 28.9063 },
//   'Nyamasheke': { lat: -2.3284, lng: 29.1417 },
//   'Rulindo': { lat: -1.7189, lng: 29.9834 },
//   'Gakenke': { lat: -1.6958, lng: 29.7845 },
//   'Musanze': { lat: -1.4976, lng: 29.6348 },
//   'Burera': { lat: -1.4569, lng: 29.8253 },
//   'Gicumbi': { lat: -1.7089, lng: 30.1017 },
//   'Rwamagana': { lat: -1.9485, lng: 30.4345 },
//   'Nyagatare': { lat: -1.2977, lng: 30.3278 },
//   'Gatsibo': { lat: -1.5894, lng: 30.4577 },
//   'Kayonza': { lat: -1.9409, lng: 30.6566 },
//   'Kirehe': { lat: -2.2669, lng: 30.7324 },
//   'Ngoma': { lat: -2.1479, lng: 30.4764 },
//   'Bugesera': { lat: -2.1586, lng: 30.2506 },
// };

// const MapComponent = ({ districts }) => {
//   const mapContainerStyle = {
//     width: '100%',
//     height: '600px'
//   };

//   const center = { lat: -1.9441, lng: 30.0619 }; // Center of Rwanda

//   return (
//     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={8}
//       >
//         {districts.map(district => {
//           const position = districtCoordinates[district.name];
//           return position ? (
//             <Marker
//               key={district.name}
//               position={position}
//               title={`${district.name}: ${district.value.toFixed(2)}`}
//             />
//           ) : null;
//         })}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// const Dashboard = () => {
//   const [data, setData] = useState([]);
//   const [selectedCrop, setSelectedCrop] = useState('Cereals');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const bgColor = useColorModeValue('gray.50', 'gray.800');
//   const cardBgColor = useColorModeValue('white', 'gray.700');
//   const crops = ['Cereals', 'Maize', 'Sorghum', 'Paddy rice', 'Wheat', 'Other cereals', 'Tubers and Roots', 'Cassava', 'Sweet potatoes', 'Irish potatoes', 'Yams & Taro', 'Bananas', 'Cooking banana', 'Dessert banana', 'Banana for beer', 'Legumes and Pulses', 'Beans', 'Bush bean', 'Climbing bean', 'Peas', 'Ground nuts', 'Soya beans', 'Vegetables and Fruits', 'vegetables', 'Fruits', 'Other crops'];


//   useEffect(() => {
//     setData(csvData);
//   }, []);

//   const districtData = data.map(item => ({
//     name: item.District,
//     value: parseFloat(item[selectedCrop]) || 0
//   })).sort((a, b) => b.value - a.value).slice(0, 5); // Top 10 districts based on crop

//   const cropData = selectedDistrict
//     ? Object.entries(data.find(item => item.District === selectedDistrict) || {})
//       .filter(([key, value]) => crops.includes(key) && value !== '-')
//       .map(([key, value]) => ({ name: key, value: parseFloat(value) || 0 }))
//       .sort((a, b) => b.value - a.value)
//       .slice(0, 5)
//     : [];


//   return (
//     <ChakraProvider>
//       <Box className='w-full bg-sky-600 text-center p-4'>
//         <span className='text-white text-3xl font-bold'>PROJECT X</span>
//       </Box>
//       <HStack>
//         <VStack className='w-1/4'>
//           <span className='text-2xl font-bold text-slate-800'>Filter By <span className='text-sky-600'>Crop</span> or <span className='text-sky-600'>District</span></span>
//           <Box mb={6} className='p-6 w-full'>
//             <FormLabel className='m-2 text-lg'>Select Crop</FormLabel>
//             <Select variant='filled' h={14} className='border border-slate-500 w-full rounded' value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}>
//               {crops.map(crop => (
//                 <option key={crop} value={crop} className='text-lg'>{crop}</option>
//               ))}
//             </Select>
//           </Box>
//           <Box mb={6} className='p-6 w-full'>
//             <FormLabel className='m-2 text-lg'>Select District</FormLabel>
//             <Select variant="filled" height={14} className='border w-full border-slate-500 rounded h-24' value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
//               {data.map(item => (
//                 <option key={item.District} value={item.District} className='text-lg'>{item.District}</option>
//               ))}
//             </Select>
//           </Box>
//         </VStack>
//         <Box mt={6} className='w-3/4 m-12'>
//           <FormLabel className='text-xl font-bold'>Map of Top 5 Districts</FormLabel>
//           <MapComponent districts={districtData} />
//         </Box>
//       </HStack>

//       <HStack className='mt-12'>
//         <Card  className='bg-slate-100 p-4 m-4 w-full'>
//           <CardHeader>
//             <span className='text-slate-800 text-2xl p-6 font-bold'>Top 5 <span className='text-sky-600 text-2xl'>{selectedCrop}</span> Growing Districts</span>
//           </CardHeader>
//           <CardBody>
//             <BarChart width={800} height={300} data={districtData} className='mt-12'>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#0EA5E9" />
//             </BarChart>
//           </CardBody>

//         </Card>
//         <Card className='w-full bg-slate-100 p-4 m-4'>
//         <CardHeader>
//            <span className='text-slate-800 text-2xl p-6 font-bold'>Top 5 <span className='text-teal-600 text-2xl'>{selectedDistrict}</span> Growing Districts</span>
//         </CardHeader>
//           <BarChart width={800} height={300} data={cropData} className='mt-12'>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#14B8A6" />
//           </BarChart>
//         </Card>

//       </HStack>


//     </ChakraProvider>

//   );
// };

// export default Dashboard;

"use client"

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Select, FormLabel, Grid, Heading, VStack, Text, Container, useColorModeValue, HStack, Card, CardHeader, CardBody, ChakraProvider, Flex } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion';

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
    height: '400px',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const center = { lat: -1.9441, lng: 30.0619 }; // Center of Rwanda

  const getMarkerColor = (value) => {
    const maxValue = Math.max(...districts.map(d => d.value));
    const normalizedValue = value / maxValue;
    const hue = (1 - normalizedValue) * 240; // Blue (240) to Red (0)
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getMarkerIcon = (value) => {
    const maxValue = Math.max(...districts.map(d => d.value));
    const normalizedValue = value / maxValue;
    const size = 8 + normalizedValue * 12; // Size between 8 and 20 based on value
    const color = getMarkerColor(value);

    return {
      url: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="${size * 2}" height="${size * 2}" viewBox="0 0 ${size * 2} ${size * 2}" xmlns="http://www.w3.org/2000/svg">
          <circle cx="${size}" cy="${size}" r="${size}" fill="${color}" fill-opacity="0.8" stroke="#FFFFFF" stroke-width="2"/>
        </svg>
      `)}`,
      scaledSize: { width: size * 2, height: size * 2 },
    };
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        options={{
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ saturation: -20 }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
            },
          ]
        }}
      >
        {districts.map(district => {
          const position = districtCoordinates[district.name];
          return position ? (
            <Marker
              key={district.name}
              position={position}
              title={`${district.name}: ${district.value.toFixed(2)}`}
              icon={getMarkerIcon(district.value)}
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
  const [selectedDistrict, setSelectedDistrict] = useState('Huye');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const accentColor = 'sky.600';
  
  const crops = [
    'Cereals', 'Maize', 'Sorghum', 'Paddy rice', 'Wheat', 'Other cereals',
    'Tubers and Roots', 'Cassava', 'Sweet potatoes', 'Irish potatoes', 'Yams & Taro',
    'Bananas', 'Cooking banana', 'Dessert banana', 'Banana for beer',
    'Legumes and Pulses', 'Beans', 'Bush bean', 'Climbing bean', 'Peas', 'Ground nuts', 'Soya beans',
    'Vegetables and Fruits', 'vegetables', 'Fruits', 'Other crops'
  ];

  useEffect(() => {
    setData(csvData);
  }, []);

  const districtData = data
    .map(item => ({
      name: item.District,
      value: parseFloat(item[selectedCrop]) || 0
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const cropData = selectedDistrict
    ? Object.entries(data.find(item => item.District === selectedDistrict) || {})
      .filter(([key, value]) => crops.includes(key) && value !== '-')
      .map(([key, value]) => ({ name: key, value: parseFloat(value) || 0 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
    : [];

  return (
    <ChakraProvider>
      <Box bg={bgColor} minHeight="100vh" color={textColor}>
        <Box bg={accentColor} color="white" textAlign="center" py={6} mb={8} boxShadow="md">
          <Heading as="h1" size="xl" fontWeight="bold" className='text-sky-600'>Agricultural Data Dashboard</Heading>
        </Box>
        
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", md: "1fr 3fr" }} gap={8}>
            <VStack spacing={6} align="stretch">
              <Card bg={cardBgColor} shadow="lg" borderRadius="lg" overflow="hidden">
                <CardBody>
                  <Heading size="md" mb={4} color={accentColor}>Filter Options</Heading>
                  <FormLabel>Select Crop</FormLabel>
                  <Select
                    value={selectedCrop}
                    onChange={e => setSelectedCrop(e.target.value)}
                    bg={bgColor}
                    borderColor={accentColor}
                    _hover={{ borderColor: 'sky.400' }}
                  >
                    {crops.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </Select>
                  
                  <FormLabel mt={4}>Select District</FormLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    bg={bgColor}
                    borderColor={accentColor}
                    _hover={{ borderColor: 'sky.400' }}
                  >
                    <option value="">All Districts</option>
                    {data.map(item => (
                      <option key={item.District} value={item.District}>{item.District}</option>
                    ))}
                  </Select>
                </CardBody>
              </Card>
            </VStack>
            
            <VStack spacing={6} align="stretch">
              <Card bg={cardBgColor} shadow="lg" borderRadius="lg" overflow="hidden">
                <CardHeader bg={accentColor} color="white">
                  <Heading size="md" className='text-slate-800'>Top 5 Districts for <span className='text-sky-600'>{selectedCrop} </span>2024</Heading>
                </CardHeader>
                <CardBody>
                  <MapComponent districts={districtData} />
                </CardBody>
              </Card>
            </VStack>
          </Grid>
          
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} mt={8}>
            <Card bg={cardBgColor} shadow="lg" borderRadius="lg" overflow="hidden">
              <CardHeader bg={accentColor} color="white">
                <Heading size="md" className='text-slate-700'>Top 5 <span className='text-sky-600'>{selectedCrop}</span> Growing Districts 2024</Heading>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={districtData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
            
            <Card bg={cardBgColor} shadow="lg" borderRadius="lg" overflow="hidden">
              <CardHeader bg={accentColor} color="white">
                <Heading size="md" className='text-slate-700'>Top 5 Crops in <span className='text-sky-600'>{selectedDistrict || 'Selected District'}</span>2024</Heading>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cropData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#14B8A6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default Dashboard;