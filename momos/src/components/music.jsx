/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";

const Music = ({ data = [] }) => {
  const columns = useMemo(() => [
    {
      name: "url",
      label: "Images Url",
      options: {
        filter: false,
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
        filter: false,
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
      <div className="alert alert-warning p-4 mt-3">
        <strong>Results not available!</strong> This means that the urls
        provided might be invalid, do not have image eligible for scrapping
      </div>
    );
  return (
    <MUIDataTable
      title={<h5 style={{ color: "#d94939" }}>MUSIC SCRAPPER DATA</h5>}
      data={d}
      columns={columns}
      options={options}
    />
  );
};

export default Music;
