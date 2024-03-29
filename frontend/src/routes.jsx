import Login from "./components/auth/Login";
import CreateQuote from "./components/CreateQuote";
import SignUp from "./components/auth/SignUp";
import Home from "./layout/Home";
import Profile from "./components/Profile";
import OtherUserProfile from "./components/routes/OtherUser";

export const routes = [
    {path: "/", element: <Home />},
    {path: "/create", element: <CreateQuote />},
    {path: "/login", element: <Login />},
    {path: "/signup", element: <SignUp />},
    {path: "/profile", element: <Profile />},
    {path: "/profile/:userId", element: <OtherUserProfile />}
]
