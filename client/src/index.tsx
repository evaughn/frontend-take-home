import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import UserManagementExercise from './components/UserManagementExercise';
import reportWebVitals from './reportWebVitals';
import "./styles.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Theme accentColor="violet"
      grayColor="slate"
      panelBackground="solid"
      scaling="100%"    >
      <QueryClientProvider client={queryClient}>
        <UserManagementExercise />
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
