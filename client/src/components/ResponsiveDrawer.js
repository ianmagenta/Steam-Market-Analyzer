import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import "../index.css";
import logo from "../images/SMA-logo2.svg";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link, Route, Switch } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useHistory } from "react-router-dom";
import TrendingUpSharpIcon from "@material-ui/icons/TrendingUpSharp";

import Snapshot from "./Snapshot";
import About from "./About";
import Analysis from "./Analysis";
import Search from "./Search";
import Game from "./Game";
import NotFound from "./NotFound";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  border: "none",
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    "background-color": "#1d1d1d",
    [theme.breakpoints.up("sm")]: {
      // alignItems: "center",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      "border-bottom": "1.1px solid rgba(255, 255, 255, 0.12)",
      "background-color": "#1d1d1d",
    },
    carl: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    "border-right": "none",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //   marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(0, 0, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    height: "56px",
    [theme.breakpoints.up("sm")]: {
      height: "64px",
      width: "100%",
    },
  },
  logo: {
    margin: "0 -12px 0 16px",
    height: "56px",
    width: "56px",
    [theme.breakpoints.up("sm")]: {
      height: "64px",
      width: "64px",
    },
  },
  titleText: {
    "font-family": "D-DIN",
    "font-size": "xx-large",
    "&::before": {
      content: '"SMA"',
    },
    [theme.breakpoints.up("sm")]: {
      "font-family": "D-DIN",
      "font-size": "xx-large",
      "&::before": {
        content: '"SteamMarket Analyzer"',
      },
    },
  },
  selectDot: {
    justifyContent: "center",
  },
  dot: {
    fontSize: "small",
  },
  titleDiv: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (mobileOpen) {
        setMobileOpen(false);
      }
      history.push(`/search/${encodeURIComponent(e.target.value)}`);
      e.target.value = "";
      e.target.blur();
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onKeyDown={handleKeyDown}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>
      <Divider />
      <List style={{ padding: "0px" }}>
        {["Snapshot", "Analysis", "About"].map((text, index) => (
          <ListItem component={Link} to={`/${text.toLowerCase()}`} button key={text}>
            <ListItemIcon>
              {text === "Snapshot" ? (
                <TrendingUpSharpIcon />
              ) : text === "Analysis" ? (
                <BarChartIcon />
              ) : text === "About" ? (
                <InfoOutlinedIcon />
              ) : null}
            </ListItemIcon>
            <ListItemText primary={text} />
            <ListItemIcon className={classes.selectDot}>
              <Route exact path={`/${text.toLowerCase()}`}>
                <FiberManualRecordIcon className={classes.dot} />
              </Route>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            disableFocusRipple
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.titleDiv}>
            <Typography variant="h6" noWrap className={classes.titleText}></Typography>
          </div>
          <img src={logo} className={classes.logo} alt="logo" />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/snapshot" component={Snapshot} />
          <Route exact path="/analysis" component={Analysis} />
          <Route exact path="/about" component={About} />
          <Route exact path="/search/:queryString" component={Search} />
          <Route exact path="/game/:appid" component={Game} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
