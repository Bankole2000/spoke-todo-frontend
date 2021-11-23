import React from 'react';
import './App.css';
import {
  Router,
  Route,
  Outlet,
  ReactLocation,
} from "react-location";
import TodoListPage from './pages/TodoListPage';
import TodoDetailsPage from './pages/TodoDetailsPage';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { resetMessageType } from './redux/actions/todoActions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/reducers';




const theme = createTheme({
  palette: {
    primary: {
      main: "#ed7d84"
    },
    secondary: {
      main: "#49486c"
    },
    success: {
      main: "#45b586"
    },
    info: {
      main: "#2196F3"
    },
    error: {
      main: "#e40422"
    },
    warning: {
      main: "#FFC107"
    }
  },
  typography: {
    fontFamily: "Ubuntu",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})



const routes: Route[] = [
  {
    path: "/",
    element: <TodoListPage />,
  },
  {
    path: "todo",
    children: [
      {
        path: ":id",
        element: <TodoDetailsPage />,
      },
    ],
  },
];

const location = new ReactLocation();

function App() {
  const dispatch = useDispatch();
  const loading: boolean = useSelector((state: RootState) => state.todos["loading"]);
  const message: string = useSelector((state: RootState) => state.todos["message"]);
  const messageType: AlertColor = useSelector((state: RootState) => state.todos["messageType"]);

  return (
    <ThemeProvider theme={theme}>
      <Router routes={routes} location={location}>
        <div>
          <Outlet />
        </div>
        <Snackbar open={!loading && Boolean(messageType)} autoHideDuration={3000} onClose={() => dispatch(resetMessageType())}>
          <Alert onClose={() => { }} severity={messageType} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Router>
    </ThemeProvider>
  );
}

export default App;
