
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import { getCurrentUser } from "./utils/storage";


// Check whether a user is logged in
function ProtectedPage({ children, requiredRole }) {

    const currentUser = getCurrentUser();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (currentUser.role !== requiredRole) {

        if (currentUser.role === "admin") {
            return <Navigate to="/admin-dashboard" replace />;
        }

        return <Navigate to="/user-dashboard" replace />;
    }

    return children;
}


// Main Application
function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Home Page */}
                <Route
                    path="/"
                    element={<Home />}
                />


                {/* Login Page */}
                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Signup Page */}
                <Route
                    path="/signup"
                    element={<Signup />}
                />


                {/* User Dashboard */}
                <Route
                    path="/user-dashboard"
                    element={
                        <ProtectedPage requiredRole="user">
                            <UserDashboard />
                        </ProtectedPage>
                    }
                />


                {/* Admin Dashboard */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedPage requiredRole="admin">
                            <AdminDashboard />
                        </ProtectedPage>
                    }
                />


                {/* Page Not Found */}
                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;
