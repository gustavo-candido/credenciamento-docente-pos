import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useUser } from "./user";
import ProjectForm from "./ProjectForm";
const styles = {
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    textTransform: "none",
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: "1rem",
  },
};

const Header = () => {
  const { logout } = useUser();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const idx = [
      "/",
      "/upload",
      "/perfil",
      "/projetos",
      "/prob-bib",
      "/mentoria",
    ].indexOf(window.location.pathname);
    if (tabIndex !== idx) {
      setTabIndex(idx);
    }
  }, [tabIndex]);

  const handleTabChange = (evt: any, index: number) => {
    setTabIndex(index);
  };

  function ElevationScroll(props: any) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 5 : 0,
    });
  }

  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

  return (
    <ElevationScroll>
      <AppBar position="fixed">
        <Toolbar>
          <Tabs
            sx={styles.tabContainer}
            value={tabIndex}
            onChange={handleTabChange}
          >
            <Tab sx={styles.tab} component={Link} to="/" label="Home" />
            <Tab sx={styles.tab} component={Link} to="/upload" label="Upload" />
            <Tab sx={styles.tab} component={Link} to="/perfil" label="Perfil" />
            <Tab
              sx={styles.tab}
              component={Link}
              to="/projetos"
              label="Projetos"
            />
            <Tab
              sx={styles.tab}
              component={Link}
              to="/prob-bib"
              label="Prod bib"
            />
            <Tab
              sx={styles.tab}
              component={Link}
              to="/mentoria"
              label="Mentoria"
            />
            <Tab
              sx={styles.tab}
              component={Link}
              to="/"
              label="Sair"
              onClick={logout}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
