import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Document";
import Chat from "./pages/Chat";


function App(){

    return (
        <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/documents" element={<Documents/>}/>
        <Route path="/chat" element={<Chat/>}/>
        </Routes>
        </BrowserRouter>
    )


}

export default App;