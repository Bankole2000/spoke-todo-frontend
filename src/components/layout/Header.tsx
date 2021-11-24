import * as React from 'react';
import { IconButton, Tooltip, LinearProgress } from '@mui/material';
import { GitHub as GitHubIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/reducers';


import { Link } from 'react-location';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const loading: boolean = useSelector((state: RootState) => state.todos["loading"]);

  return (
    <div style={{ height: '80px', width: '100vw', top: '0px', left: '0px', backgroundColor: 'white', boxShadow: "2px 3px 9px #88888833" }}>

      <div style={{ maxWidth: '80vw', margin: 'auto', height: '100%', display: 'flex', alignItems: 'center', zIndex: 1 }}>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Tooltip title="Those who get things done" placement="top" arrow>
            <h1 style={{ margin: 0, color: '#49486c' }}>Do-erz</h1>
          </Tooltip>
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        <Tooltip title="View code on github" placement="top" arrow>
          <a href="https://github.com/Bankole2000/spoke-todo-frontend" target="_blank" rel="noreferrer">
            <IconButton sx={{ mx: 2 }}>
              <GitHubIcon />
            </IconButton>
          </a>
        </Tooltip>
        <Tooltip title="Follow me on twitter" placement="top" arrow>
          <a href="https://twitter.com/codingInNeon" target="_blank" rel="noreferrer">
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </a>
        </Tooltip>
      </div>
      {loading && <LinearProgress />}
    </div>
  );
};

export default Header;
