import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Music, Video, UserAccount } from "../components";
import { Footer, Header } from "../layout";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { server_ip } from "../constants";
import { actions_app_utils, action_current_user } from "../store-actions";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
  const { app_utils, current_user } = state;
  return { app_utils, current_user };
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1, py: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = ({ app_utils, current_user }) => {
  const [value, setValue] = React.useState(0);
  const [video, setVideo] = useState([]);
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [page_size, setPageSize] = useState(1000);
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    //check if session is valid
    const { currentUser, ttl } = current_user;
    console.log(`[file:home.jsx] [ttl: ${ttl}]`);
    if (ttl < new Date().getTime() || !currentUser) {
      dispatch(action_current_user.logout());
      navigate("/auth/login", { replace: true });
    }
    dispatch(actions_app_utils.is_loading(true));
    axios
      .get(`${server_ip}/scraper?limit=${page_size}&offset=${offset}`)
      .then((res) => {
        const d = res.data;
        setImages(d.filter((el) => el.type === "image"));
        setVideo(d.filter((el) => el.type === "video"));
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(actions_app_utils.is_loading(false));
      });
  }, []);

  return (
    <div className="w-100">
      <Header />
      <div
        className="container bg-light wrapper pt-2"
        style={{ marginTop: "60px" }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", zIndex: 1000 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="momos"
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label="Music" {...a11yProps(0)} />
              <Tab label="Videos" {...a11yProps(1)} />
              <Tab label="Scraper Generator" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <div>
            <TabPanel value={value} index={0}>
              <Music data={images} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Video data={video} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <UserAccount user={current_user.currentUser} />
            </TabPanel>
          </div>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps)(Home);
