import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
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
    title: {
      // padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1
    },
    // toolbar: theme.mixins.toolbar,
    // avatar: {
    //   // marginLeft: theme.spacing(2)
    // }
  }
})

const Navbar = () => {
  const classes = useStyles()
  return ( 
    <div>
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography >
            Today is the
          </Typography>
          <Typography>Mario</Typography>
          <Avatar src="/mario-av.png" />
        </Toolbar>
      </AppBar>
    </div>
   );
}
 
export default Navbar;