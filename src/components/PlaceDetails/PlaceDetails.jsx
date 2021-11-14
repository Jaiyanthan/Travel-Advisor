import React from 'react';
import {Box ,Typography ,Card ,CardElement ,Chip ,Button ,CardMedia ,CardContent ,CardActions} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

//local files
import useStyles from './Styles.js';

const PlaceDetails = ({place ,selected ,refProp}) => {

  const classes = useStyles();

  if(selected) refProp?.current?.scrollIntoView({behavior : 'smooth', block:'start'})

    return ( 
       
      <Card elevation={6}>
         <CardMedia
            style={{height:350}}
            image={place.photo ? place.photo.images.small.url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/SimpleRestaurantMinsk.jpg'}
            title={place.name}
         />
         <CardContent>
              <Typography gutterBottom variant="h5">{place.name}</Typography>
              <Box display="flex" justifyContent="space-between" my={2}>
                  <Rating size="small" value={Number(place.rating)} readOnly />
                  <Typography variant="subtitle1">out of {place.num_reviews} reviews</Typography>
              </Box>
            
              <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Price level</Typography>
                  <Typography variant="subtitle1">{place.price}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Ranking:-</Typography>
                  <Typography variant="subtitle1"> {place.ranking}</Typography>
              </Box>
               {place?.awards?.map((award) => {
                  <Box my={1} display="flex" justifyContent="space-betwwen" alignItems="center">
                      <img src={award.images.small} alt={award.display_name}/>
                      <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                  </Box>
              })}
              {place?.cuisine?.map(({name})=>{
              {console.log(name)}

                   <Chip key={name} size="small" label={name}/>
              })}
              {place?.address && (
                  <Typography guttterBottom variant="body2" color="textSecondary" className={classes.spacing}>
                       <LocationOnIcon/> {place.address}
                  </Typography>
              )}

               {place?.phone && (
                  <Typography guttterBottom variant="body2" color="textSecondary" className={classes.spacing}>
                       <PhoneIcon/> {place.phone}
                  </Typography>
              )}
              <CardActions>
                  <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                      Place Website
                  </Button>
                  
              </CardActions>
              
         </CardContent>
      </Card>
    )
}

export default PlaceDetails
