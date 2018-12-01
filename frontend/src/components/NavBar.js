import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AdbIcon from '@material-ui/icons/Adb';

const styles = theme => ({
  primaryLight: {
    backgroundColor: theme.palette.primary.light
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.primaryLight}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <AdbIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Kaiya
          </Typography>
          <Button color="inherit">Journal</Button>
          <Button color="inherit">Trends</Button>
          <Button color="inherit">Talk to Kaiya</Button>
          <Button color="inherit">Settings</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
