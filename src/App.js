import React ,{useState,useEffect} from 'react';
import {CssBaseline ,Grid} from '@material-ui/core';

//local files
import {getPlacesData ,getWeatherData} from './api/index';
import './App.css';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';

const App = () => {
   
   const [places ,setPlaces]                       = useState([]);
   const [coords ,setCoords]                       = useState({});
   const [bounds ,setBounds]                       = useState({});
   const [childClicked ,setChildClicked]           = useState(null);
   const [isLoading ,setIsLoading]                 = useState(false);
   const [type ,setType]                           = useState('');
   const [rating ,setRating]                       = useState(''); 
   const [price ,setPrice]                         = useState(''); 
   const [filteredPlaces ,setFilteredplaces]       = useState([]); 
   const [weatherData, setWeatherData]             = useState([]);

   useEffect(()=>{
       navigator.geolocation.getCurrentPosition(({coords:{latitude ,longitude}}) => {
          setCoords({lat:latitude ,lng:longitude})
       })
   },[])
  
   useEffect(()=>{
      const filteredPlaces = places.filter((place) => place.rating > rating)

      setFilteredplaces(filteredPlaces);
   },[rating])
   
   useEffect(()=>{
      const filteredPlaces = places.filter((place) => place.price > price)

      setFilteredplaces(filteredPlaces);
   },[price])
   

   useEffect(()=>{
      console.log(bounds.sw)
     if(bounds){
            setIsLoading(true)

            getWeatherData(coords.lat ,coords.lng)
                  .then((data) => {
                     console.log(data)
                     setWeatherData(data)
                  })
                         
            getPlacesData(type ,bounds.sw ,bounds.ne)
                  .then((data)=>{
                  setFilteredplaces([]);
                  setPlaces(data?.filter((place)=>place.name && place.num_reviews > 0))
                  setIsLoading(false)
               })
     }   
   },[type ,coords ,bounds])
  return (
    <>
       <CssBaseline/>
       <Header setCoords={setCoords}/>
         <Grid container spacing={3} style={{ width:'100%' }}>
            <Grid item xss={12} md={4}>
               <List 
                  places={filteredPlaces.length ? filteredPlaces : places}
                  childClicked={childClicked}
                  isLoading = {isLoading}
                  type={type}
                  setType={setType}
                  rating={rating} 
                  setRating={setRating}
                  price={price}
                  setPrice={setPrice}
               />
            </Grid>

            <Grid item xss={12} md={8}>
               <Map
                  setCoords={setCoords}
                  coords={coords}
                  setBounds={setBounds}
                  setChildClicked={setChildClicked}
                  places={filteredPlaces.length ? filteredPlaces : places}
                  weatherData={weatherData}
               />
            </Grid>
         </Grid>
    </>
  )
}

export default App
