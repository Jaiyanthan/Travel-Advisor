import React ,{useState ,useEffect ,createRef} from 'react';
import {CircularProgress ,Select ,Typography ,Grid ,InputLabel ,MenuItem ,FormControl} from '@material-ui/core';

//local files
import useStyles from './Styles.js';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({places ,childClicked ,isLoading ,type ,rating ,setType ,setRating ,price ,setPrice}) => {

    const classes = useStyles();

    //creating state variables 
    
    const [elRefs ,setElRefs]  = useState([]) 

    //Scroll to the clicked child element in list
    useEffect(() => {
        //creating the references
        const refs = Array(places?.length).fill().map((_ ,i) => refs[i] || createRef())
        //updating the state variable
        setElRefs(refs)
    }, [])

    return (
        
        <div className={classes.container}>
           <Typography variant="h4">Restaurants,Hotels & Attractions near you</Typography>
           {isLoading ? (
               <div className={classes.loading}>
                   <CircularProgress size="5rem"/>
               </div>
           ) : ( 
               <>
           <FormControl className={classes.formControl}>
               <InputLabel>Type</InputLabel>
               <Select vlaue={type} onChange={(e)=> setType(e.target.value)}>
                   <MenuItem value="restaurants">Restaurants</MenuItem>
                   <MenuItem value="hotels">Hotels</MenuItem>
                   <MenuItem value="attractions">Attractions</MenuItem>
               </Select>
           </FormControl>
           <FormControl className={classes.formControl}>
               <InputLabel>Rating</InputLabel>
               <Select vlaue={rating} onChange={(e)=> setRating(e.target.value)}>
                   <MenuItem value={0}>All</MenuItem>
                   <MenuItem value={3}>Above 3.0</MenuItem>
                   <MenuItem value={4}>Above 4.0</MenuItem>
                   <MenuItem value={4.5}>Above 4.5</MenuItem>
               </Select>
           </FormControl>

           <FormControl className={classes.formControl}>
               <InputLabel>Price</InputLabel>
               <Select vlaue={price} onChange={(e)=> setPrice(e.target.value)}>
                   <MenuItem value={'$10 - $15'}>$10  - $15</MenuItem>
                   <MenuItem value={'$20 - $50'}>$20  - $50</MenuItem>
                   <MenuItem value={'$60 - $120'}>$60 - $120</MenuItem>
               </Select>
           </FormControl>

           <Grid container spacing={3} className={classes.title}>
               {places?.map((place ,i)=>(
                   <Grid  item key={i} xs={12}>
                      <PlaceDetails 
                          place={place}
                          selected={Number(childClicked) === i}
                          refProp={elRefs[i]}
                          />
                   </Grid>    
               ))}
           </Grid>
           </>
           )}
        </div>
    )
}

export default List
