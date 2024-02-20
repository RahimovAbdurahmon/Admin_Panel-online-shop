import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import income from "../../assets/images/income.png";
import visitor from "../../assets/images/visitor.jpg";
import order from "../../assets/images/oredr.png";
import sale from "../../assets/images/sale.png";
import { DoneAll } from "@mui/icons-material";

const Home = () => {
  const [state] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  const [state2] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const [state3] = useState({
    series: [
      {
        name: "Q1 Budget",
        group: "budget",
        data: [44000, 55000, 41000, 67000, 22000],
      },
      {
        name: "Q1 Actual",
        group: "actual",
        data: [48000, 50000, 40000, 65000, 25000],
      },
      {
        name: "Q2 Budget",
        group: "budget",
        data: [13000, 36000, 20000, 8000, 13000],
      },
      {
        name: "Q2 Actual",
        group: "actual",
        data: [20000, 40000, 25000, 10000, 12000],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      dataLabels: {
        formatter: (val) => {
          return val / 1000 + "K";
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [
          "Online advertising",
          "Sales Training",
          "Print advertising",
          "Catalogs",
          "Meetings",
        ],
        labels: {
          formatter: (val) => {
            return val / 1000 + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
    },
  });

  const totalData = [
    {
      id: 1,
      title: "Total Income",
      img: income,
      size: 22000,
      checked: "Last month",
      protsent: 5.1,
    },
    {
      id: 2,
      title: "Total Visitor",
      img: visitor,
      size: 10000,
      checked: "Last week",
      protsent: 4.5,
    },
    {
      id: 3,
      title: "Total Orders",
      img: order,
      size: 5000,
      checked: "Last month",
      protsent: 10,
    },
    {
      id: 4,
      title: "Total Sales",
      img: sale,
      size: 10000,
      checked: "This week",
      protsent: 99,
    },
  ];

  return (
    <>
      <div className="text-[20px] lg:text-[30px] pl-[30px] font-[600] font-custom max-w-[1200px] mx-auto">
        Dishboard
      </div>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-[30px] max-w-[1200px] mx-auto">
        {totalData.map((elem) => {
          return (
            <div
              key={elem.id}
              className="pt-[30px] p-[20px] rounded-[10px] shadow-xl"
            >
              <div className="flex items-start justify-between">
                <h1 className="text-[20px] font-[600]">{elem.title}</h1>
                <img src={elem.img} className="w-[50px]" alt="" />
              </div>
              <h1 className="text-[18px]">{elem.size}</h1>
              <div className="flex items-center justify-between pt-[5px]">
                <p className="text-green-500">
                  <DoneAll /> {elem.protsent}%
                </p>
                <p className="text-[16px] text-gray-400">{elem.checked}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-start gap-[50px] flex-wrap max-w-[1200px] mx-auto w-[100%] py-[30px] 2xl:flex-nowrap rounded-[5px]">
        <div className="shadow-xl w-[100%] 2xl:w-[670px]">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            width={"100%"}
            height={400}
          />
        </div>
        <div className="shadow-xl w-[100%] 2xl:w-[450px] h-[400px] rounded-[5px]">
          <ReactApexChart
            options={state2.options}
            series={state2.series}
            className="m-auto"
            type="pie"
            width={450}
            height={500}
          />
        </div>
      </div>
      <div className="w-[100%] max-w-[1200px] mx-auto">
        <ReactApexChart
          options={state3.options}
          series={state3.series}
          type="bar"
          // width={500}
          height={350}
        />
      </div>
    </>
  );
};

export default Home;
