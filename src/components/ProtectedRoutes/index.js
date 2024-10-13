import Cookies from 'js-cookie'
import {Navigate,Outlet} from 'react-router-dom'

const ProtectedRoutes = (props) => {
    const jwtToken = Cookies.get("jwt_token")
    
    return jwtToken ? <Outlet/> : <Navigate to="/login"/>
    
}
export default ProtectedRoutes