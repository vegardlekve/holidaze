import { Routes, Route } from "react-router-dom";
// Components
import Layout from "./components/layout";
// Hooks
import { AuthProvider } from "./hooks/context";
//Pages
import Home from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import Profile from "./pages/profile";
import Venue from "./pages/venue";
//Styles
import GlobalStyle from "./styles/GlobalStyles";

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="/venue/:id" element={<Venue />} />
                    </Route>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
