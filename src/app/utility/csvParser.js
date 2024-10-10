export function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const data = [];
  
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length === headers.length) {
        const entry = {};
        for (let j = 0; j < headers.length; j++) {
          entry[headers[j]] = values[j];
        }
        data.push(entry);
      }
    }
  
    return data;
  }
  
  export function getTopCropsForDistrict(data, district, limit = 5) {
    const districtData = data.find(entry => entry.District.toLowerCase() === district.toLowerCase());
    if (!districtData) return [];
  
    const crops = Object.entries(districtData)
      .filter(([key, value]) => key !== 'District' && value !== '-' && !isNaN(parseFloat(value)))
      .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
      .slice(0, limit)
      .map(([crop]) => crop);
  
    return crops;
  }
  
  export function getTopDistrictsForCrop(data, crop, limit = 5) {
    const districts = data
      .filter(entry => entry[crop] !== '-' && !isNaN(parseFloat(entry[crop])))
      .sort((a, b) => parseFloat(b[crop]) - parseFloat(a[crop]))
      .slice(0, limit)
      .map(entry => entry.District);
  
    return districts;
  }