
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Data = [
    {
        title:'Dashboard',
        icon:<DashboardIcon  sx={{fontSize:30  , color:'white'}}/>,
        link:'/dashboard',
    },
    {
        title:'All shippment',
        icon:<FormatListBulletedIcon  sx={{fontSize:30  , color:'white'}}/>,
        link:'/shippments',
    },
    {
        title:'Create shippment',
        icon:<NoteAddIcon  sx={{fontSize:30  , color:'white'}}/>,
        link:'/create',
    },
    {
        title:'Completed shippment',
        icon:<AssignmentTurnedInIcon   sx={{fontSize:30  , color:'white'}} />,
        link:'/completed',
    },
    // {
    //     title:'Logout',
    //     icon:<ExitToAppIcon  sx={{fontSize:30}}/>,
    //     link:'/login',
    // },
]


export default Data;