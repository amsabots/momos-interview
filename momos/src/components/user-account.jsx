import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { color_scheme, server_ip } from "../constants";
import { action_current_user, actions_app_utils } from "../store-actions";
import Swal from "sweetalert2";
import axios from "axios";
axios.defaults.baseURL = server_ip;

const UserAccount = ({ user }) => {
  const [urls, setUrls] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  //
  const dispatch = useDispatch();

  useEffect(() => {
    const split_urls = urls
      .trim()
      .split("|")
      .filter((e) => !!e);
    setInfo(
      `${split_urls.length} url endpoints will be scrapped - axios timeout [30secs]`
    );
  }, [urls]);

  const handle_submit = (e) => {
    e.preventDefault();
    dispatch(actions_app_utils.is_loading(true));
    setLoading(true);
    axios
      .post(`/scraper/generate-url`, { urls: urls.trim().split("|") })
      .then((res) =>
        Swal.fire(
          "Data has been Generated",
          "Kindly change tab to either video or images to preview your scraped data",
          "success"
        )
      )
      .catch((e) =>
        Swal.fire(
          "Invalid URL entry detected",
          "Please ensure that you provide urls that point to an openly accessible endpoint",
          "error"
        )
      )
      .finally(() => {
        dispatch(actions_app_utils.is_loading(false));
        setLoading(false);
      });
  };
  return (
    <div className="row">
      <div className="col-md-6 col-sm-12 mx-auto">
        <form onSubmit={(e) => handle_submit(e)} className="mt-4">
          <div className="form-group">
            <label htmlFor="" style={{ color: color_scheme.primary }}>
              Provide all your URLs you want to scrape separated by{" "}
              <strong className="text-dark">|</strong> pipe symbol
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUrls(e.target.value)}
              required
            />
            <small className="text-muted">{info}</small>

            {!loading ? (
              <div className="form-group mt-4">
                <div className="mt-5">
                  <button className="btn btn-primary btn-block">
                    <b>Run Scraper</b>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAccount;
