import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useUser } from "./user";
const styles = {
  tabContainer: {
    marginLeft: "auto",
    "&& .Mui-selected": {
      color: "#00000099",
    },
  },
  tab: {
    textTransform: "none",
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: "1rem",
  },
};

const HeaderAdmin = () => {
  const { logout } = useUser();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const idx = [
      "/",
      "/linhas-de-pesquisa",
      "/qualis-per",
      "/qualis-anais",
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
            <Tab
              sx={styles.tab}
              component={Link}
              to="/linhas-de-pesquisa"
              label="Linhas de pesquisa"
            />

            <Tab
              sx={styles.tab}
              component={Link}
              to="/qualis-per"
              label="Qualis Per"
            />

            <Tab
              sx={styles.tab}
              component={Link}
              to="/qualis-anais"
              label="Qualis Anais"
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

export default HeaderAdmin;
