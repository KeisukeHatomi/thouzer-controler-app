import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-northeast-1_tVKapFDvA",
      userPoolClientId: "3cvi895nk0bi5lktab8u3kmofh",
      loginWith: {
        email: true,
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
