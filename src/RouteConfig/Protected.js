import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {userSelector} from '../Store/userFeatures'

function Auth() {
	const user = useSelector(userSelector);
// console.log("from protected",user)

	// const isAuth = true;
	const isAuth = user?.user ? true:false;
	const location = useLocation();

	return isAuth? <Outlet /> : <Navigate to='/login' state={{from:location}} replace/>;
}


export default Auth;