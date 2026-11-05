import { Navigate } from "react-router";
import { getCurrentUser } from "../utils/storage";
 
function ProtectedRoute({ children, allowedRole }) {
  const currentUser = getCurrentUser();
 
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
 
  if (allowedRole && currentUser.role !== allowedRole) {
    if (currentUser.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
 
    return <Navigate to="/dashboard" replace />;
  }
 
  return children;
}
 
export default ProtectedRoute;
