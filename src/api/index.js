import axios from "axios";

 export const getPlacesData = async(type ,sw ,ne) => {
   try{
      const {data :{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary` ,
         {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
           
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key' : '0115320d90mshb1dabf18d3809f1p1debd2jsn4b047a9ec131'
          }
        })
      return data;
   }
    catch(error){
       console.log(error)
    }

}
export const getWeatherData = async(lat ,lng) => {
  try{
   const {data : {data}} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
    params: {lon: lng,lat: lat},
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': '0b23284bc2mshde7caa9c403844cp1b4443jsn3d7be50cb346'
   }
  })
  return data;
}
   catch(error){
     console.log(error)
   }
}
