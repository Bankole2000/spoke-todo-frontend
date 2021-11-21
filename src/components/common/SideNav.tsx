import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles';
const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      // padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    // title: {
    //   padding: theme.spacing(2),
    // },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1
    },
    // toolbar: theme.mixins.toolbar,
    // avatar: {
    //   marginLeft: theme.spacing(2)
    // }
  }
})
interface ISideNavProps {
}

const SideNav: React.FunctionComponent<ISideNavProps> = (props: ISideNavProps): JSX.Element => {
  const classes = useStyles();

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/'
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: '/create'
    },
  ];
  return (
    <div className={classes.root}>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" >
            Ninja Notes
          </Typography>
        </div>

        {/* links/list section */}
        {/* <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List> */}

      </Drawer>
    </div>
  );
};

export default SideNav;
