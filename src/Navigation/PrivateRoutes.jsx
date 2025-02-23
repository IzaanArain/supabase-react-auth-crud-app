import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext.jsx"

const PrivateRoutes = ({ children }) => {
    const { session } = useAuthContext();
    if(session === undefined) {
        return <p>Loading...</p>
    }
    return (session ? <>{children}</> : <Navigate to='/signup' />)
}

export default PrivateRoutes