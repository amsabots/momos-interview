/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";

const Video = ({ data = [] }) => {
  const columns = useMemo(() => [
    {
      name: "url",
      label: "Video Url",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <strong>{value}</strong>;
        },
        customHeadLabelRender: (columnMeta) => {
          return (
            <strong style={{ color: "#d94939" }}>{columnMeta.label}</strong>
          );
        },
      },
    },
    {
      name: "createdAt",
      label: "Created On",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <strong>{moment(value).fromNow()}</strong>;
        },
        customHeadLabelRender: (columnMeta) => {
          return (
            <strong style={{ color: "#d94939" }}>{columnMeta.label}</strong>
          );
        },
      },
    },
  ]);
  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    selectableRows: false,
  };
  const d = data;

  if (!data.length)
    return (
      <div className="alert alert-danger p-4 mt-3">
        <strong>Results not available!</strong> Video URL scraper could not find
        any tag matching "video" or "source". Make sure the URL you are testing
        with supports the required tag format
      </div>
    );
  return (
    <MUIDataTable
      title={<h5 style={{ color: "#d94939" }}> VIDEO SCRAPPER DATA</h5>}
      data={d}
      columns={columns}
      options={options}
    />
  );
};

export default Video;
