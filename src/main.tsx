import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from "@react-oauth/google";
import { AppProvider } from './context/AppContext.tsx';
// css version to import, gets imported for all the files when imported here = in main.tsx
// will display full map correctly in - Address, for Riders.
import 'leaflet/dist/leaflet.css';
import { SocketProvider } from './context/SocketContext.tsx';

export const authService = "https://yummerz-auth.onrender.com"; // 'http://localhost:5001'
export const restaurantService = "https://yummerz-restaurant.onrender.com"; //'http://localhost:5002'
export const utilsService = "https://yummerz-utils.onrender.com"; //"http://localhost:5003";
export const realtimeService = "https://yummerz-realtime-1.onrender.com"; // "http://localhost:5004";
export const riderService = "https://yummerz-rider.onrender.com"; // "http://localhost:5005";
export const adminService = "https://yummerz-admin.onrender.com";// "http://localhost:5006";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1053973633906-bcud8hhmnr56fehhls2es0bklrpsssbo.apps.googleusercontent.com"> 
      <AppProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
