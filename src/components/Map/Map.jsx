import React from 'react';
import  GoogleMapReact from 'google-map-react';
import {Paper ,Typography ,useMediaQuery} from "@material-ui/core"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

//local files
import useStyles from './Styles.js'

const Map = ({setBounds ,setCoords ,coords ,places ,setChildClicked ,weatherData}) => {

   const classes = useStyles();
   const isDesktop = useMediaQuery('(min-width:600px)') 
   const coordinates = {lat:0 ,lng:0}
  
    return (
        <div className={classes.mapContainer}> 
            <GoogleMapReact
                  bootstrapURLKeys={{key: 'AIzaSyAZ-1yEujCZjk1mMIAZypig6pm7j09S5Ls'}}
                  defaultCenter={coords}
                  center={coords}
                  defaultZoom={14}
                  margin={50, 50, 50, 50}
                  options={''}
                  onChange={(e) => {
                    setCoords({ lat:e.center.lat, lng: e.center.lng });
                    setBounds({ ne:e.marginBounds.ne, sw: e.marginBounds.sw });
                  }}
                 onChildClick={(child) => setChildClicked(child)}
            >
               {places?.map((place)=> (
                   <div
                      className={classes.markerContainer}
                      lat={Number(place.latitude)}
                      lng={Number(place.longitude)} 
                      key={1}
                      >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="red" fontSize="large"/>
                                                        
                        ):(
                            <Paper elevation={3} className={classes.paper}>
                                  <Typography className={classes.typography} variant="subtitle2" gutterButtom>
                                      {place.name}
                                  </Typography>
                                  <img
                                  className={classes.pointer}
                                  src={place.photo ? place.photo.images.large.url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/SimpleRestaurantMinsk.jpg'}
                                  alt={place.name}
                                  rating={place.rating}
                                  price={place.price}
                                  />
                                 <Rating size="small" value={Number(place.rating)} readOnly /> 
                            </Paper>
                        )
}
                   </div>
               ))}
               {weatherData?.list?.map((data ,i) => {
                   <div key={i} lat={data.coord.lat} lon={data.coord.lon}>
                       <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height={100} />
                   </div>
               })}
            </GoogleMapReact>
        </div>
    )
}

export default Map
