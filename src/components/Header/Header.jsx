import React ,{useState} from 'react';
import {Autocomplete} from '@react-google-maps/api';
import {AppBar ,Toolbar ,Typography ,InputBase ,Box} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

//local files
import useStyles from './Styles'

const Header = ({ setCoords }) => {

const classes = useStyles();  

const [autoComplete, setAutoComplete] = useState(null)

const onLoad = (autoC) => setAutoComplete(autoC)
const onPlaceChanged = () => {
    const lat  = autoComplete.getPlace().geometry.location.lat()
    const lng  = autoComplete.getPlace().geometry.location.lng()

    setCoords=({lat , lng})
}

return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" classname={classes.title}>
                        Travel Adivisor
                    </Typography>
                    <Box display="flex">
                        <Typography variant="h6" classname={classes.title}>
                            Explore New Places
                        </Typography>
                        {/*<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>*/}
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                     <SearchIcon/>
                                </div>
                                <InputBase placeholder="Search..." classes={{ root : classes.inputRoot , input : classes.inputInput}}/>
                            </div>
                        {/*</Autocomplete>*/}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
