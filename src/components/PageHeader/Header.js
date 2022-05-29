import React from "react";
import {useLocation} from "react-router-dom";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';import {useSelector} from "react-redux";

//Local imports
import {userSelector} from "../../Store/userFeatures";

//Styling imports
import "./Header.css";

function Header({title}) {
    // const Location = useLocation().pathname console.log(Location)

    const {user} = useSelector(userSelector)

    // console.log(user)

    const Username = user
        ?.data
            ?._doc
                ?.username;

    return (

        <div className='HeaderStyle'>
        <div  className="HeaderContentWrapper">
            <div className='icon'>
                <h3   style={{marginRight:'5px'}}>{title}</h3>
                <LocalShippingIcon
                    style={{
                    fontSize: '28px',
                    color: 'white'
                }}/>
            </div>
            <div className="icon"  
    
            >
                <AccountCircleIcon
                    style={{
                    fontSize: '28px',
                    color: 'white',
                   
                }}/>

               {Username && <h3  style={{marginLeft:'5px'}}>{Username}</h3>}
            </div>

        </div>
        </div>
    );
}

export default Header;
