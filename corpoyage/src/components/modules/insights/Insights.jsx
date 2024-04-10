import React from "react";
import { Card } from "react-bootstrap";
import "./Insights.css";
import { BsTruck } from "react-icons/bs";
import { PiCurrencyDollarLight, PiShoppingCartLight } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import ReactApexChart from "react-apexcharts";
import { Link, useLocation } from "react-router-dom";

const Insights = () => {
  const cardsData = [
    {
      title: "Eployees Onboarded",
      icon: <BsTruck style={{ color: "#3b7ddd", fontSize: 20 }} />,
      value: "2.289",
      change: {
        value: -3.65,
        label: "Since last week",
        color: "text-danger",
      },
    },
    {
      title: "Reimbursement Request",
      icon: (
        <PiCurrencyDollarLight style={{ color: "#3b7ddd", fontSize: 20 }} />
      ),
      value: "$21.300",
      change: {
        value: 6.65,
        label: "Since last week",
        color: "text-success",
      },
    },
    {
      title: "Travel Request Received",
      icon: <GoPeople style={{ color: "#3b7ddd", fontSize: 20 }} />,
      value: "2.289",
      change: {
        value: 14.212,
        label: "Since last week",
        color: "text-success",
      },
    },
    {
      title: "Travel Request Closed",
      icon: <PiShoppingCartLight style={{ color: "#3b7ddd", fontSize: 20 }} />,
      value: "64",
      change: {
        value: -3.65,
        label: "Since last week",
        color: "text-danger",
      },
    },
  ];

  const location = useLocation();
  const { pathname } = location;
  const pathnames = location.pathname.split("/").filter((x) => x);

  let pageTitle = 'Insights';

  if (pathname === '/') {
    pageTitle = 'Insights';
  } else if (pathname === '/master-data') {
    pageTitle = 'Master Data';
  } else if (pathname === '/admin-management') {
    pageTitle = 'Admin Management';
  } else if (pathname === '/expense-management') {
    pageTitle = 'Expense Management';
  }

  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",],
      },
      yaxis: {
        title: {
          text: "Eployees Onboarded", // Specify the Y-axis title here
        },
      },
      dataLabels: {
        enabled: false, // Set this to false to hide data labels
      },
    },
    series: [
      {
        name: "Travel Request Received",
        data: [35, 60, 45, 15, 62, 73, 38, 66, 49],
      },
      {
        name: "Reimbursement Request",
        data: [89, 99, 83, 75, 112, 93, 115, 100, 98],
      },
      {
        name: "Travel Request Closed",
        data: [12, 19, 43, 45, 27, 32, 36, 48, 33],
      },
    ],
  };

  return (
    <>
      <div className="col-md-12">
        <div className="container-fluid ">
          <h4 style={{ color: "#012970", fontFamily: "Nunito, sans-serif", fontWeight:600 }}>
            {pageTitle}
          </h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/insights" style={{ textDecoration: "none", color: "#2471A3" }}>
                  home
                </Link>
              </li>
              {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                return (
                  <li key={name} className={`breadcrumb-item ${isLast ? "active" : ""}`}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {isLast ? name : <Link style={{ color: isLast ? '' : '#2471A3', textDecoration: isLast ? '' : 'none'}} 
                    to={routeTo}>{name}</Link>}
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                {cardsData.map((card, index) => (
                  <div className="col-md-6 mb-3" key={index}>
                    <Card className="rounded-2 shadow-lg" border="light">
                      <div className="mx-3 my-4">
                        <div className="row mb-3">
                          <div className="d-flex justify-content-between">
                            <p style={{color: "#012970",fontFamily: "Poppins, sans-serif",fontWeight: "bold",}}>
                              {card.title}
                            </p>
                            <div className="iconback">{card.icon}</div>
                          </div>
                        </div>
                        <h3 className="mb-3">{card.value}</h3>
                        <div>
                          <span className={card.change.color}>{`${card.change.value}%`}</span>
                          <span className="text-muted ms-1">{card.change.label}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-5">
              <Card className="rounded-2 shadow-lg" border="light">
                <div className="mx-2 my-4">
                  <h6 className="mb-2" style={{color: "#012970",fontFamily: "Poppins, sans-serif",fontWeight: 600,}}>
                    Column Chart
                  </h6>
                  <div className="mb-1">
                    <div className="column-chart">
                      <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;
