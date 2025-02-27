import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from 'react-router-dom'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}


createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App/>
   </ClerkProvider>
   </BrowserRouter>,
)

