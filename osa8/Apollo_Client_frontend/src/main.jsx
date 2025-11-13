import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { NotificationContextProvider } from "./context/NotificationContext.jsx"
import App from "./App.jsx";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
