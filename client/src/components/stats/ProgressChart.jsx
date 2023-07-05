import Class from "./ProgressChart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {useState, useEffect} from "react";
import {getWeightLogs} from "../../apis/weightApi";
import ChartForm from "./ChartForm";

function ProgressChart() {
  const [sortByFrame, setSortByFrame] = useState("30 days");
  const [logs, setLogs] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(300);
  const [sortedLogsByDay, setSortedLogsByDay] = useState([]);
  const [sortedLogsByMonth, setSortedLogsByMonth] = useState([]);
  const [sortedLogsAll, setSortedLogsAll] = useState([]);

  const sortLogDatesByDay = (logs) => {
    const thirtyDayFilter = new Date();
    thirtyDayFilter.setDate(thirtyDayFilter.getDate() - 30);
    const sortedLogs = logs.filter((log) => new Date(log.date) >= thirtyDayFilter);
    setSortedLogsByDay(
      sortedLogs.map((log) => {
        return {x: log.date, y: log.weight};
      })
    );
  };
  const sortLogDatesByMonth = (logs) => {
    setSortedLogsByMonth(
      logs.map((log) => {
        return {x: log.date, y: log.weight};
      })
    );
  };
  const sortAllLogs = (logs) => {
    const latestLog = logs[logs.length - 1];
    setSortedLogsAll(
      logs.map((log) => {
        return {x: log.date, y: log.weight};
      })
    );
  };
  //
  // Line chart Config
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const data = {
    labels: [],
    datasets: [
      {
        label: "Weight",
        data:
          sortByFrame === "30 days" ? sortedLogsByDay : sortByFrame === "12 months" ? sortedLogsByMonth : sortedLogsAll,
        borderColor: "#bf7d60",
        backgroundColor: "#bf7d60",
      },
    ],
  };
  // options for the line chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weight-loss Progress",
      },
    },
    scales: {
      y: {
        ticks: {
          // this function returns the y-axis value with ' lbs' attach, expl: '10 lbs'
          callback: function (value) {
            return value + " lbs";
          },
        },
        suggestedMin: parseInt(min.weight) - 20,
        suggestedMax: parseInt(max.weight) + 20,
      },
    },
  };
  //
  //

  const getLogsAndSetData = async () => {
    const logs = await getWeightLogs();
    const sortedLogs = logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    setLogs(sortedLogs);
    setMin(
      logs.reduce((prev, current) => {
        return prev.weight < current.weight ? prev : current;
      })
    );

    setMax(
      logs.reduce((prev, current) => {
        return prev.weight > current.weight ? prev : current;
      })
    );
    sortLogDatesByDay(logs);
    sortLogDatesByMonth(logs);
    sortAllLogs(logs);
  };

  const addWeightLogHandler = (log) => {
    setLogs((prevLogs) => {
      const newLogs = [...prevLogs, log];
      const sortedLogs = newLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
      sortLogDatesByDay(sortedLogs);
      sortLogDatesByMonth(sortedLogs);
      sortAllLogs(sortedLogs);
      return sortedLogs;
    });
  };

  const dateInputHandler = (e) => {
    e.preventDefault();
    setSortByFrame(e.target.value);
  };

  useEffect(() => {
    getLogsAndSetData();
  }, []);

  return (
    <div className={Class.chartContainer}>
      <div className={Class.chartCard}>
        <form className={Class.sortBy}>
          <label>Sort by:</label>
          <select onChange={dateInputHandler}>
            <option> 30 days </option>
            <option> 12 months </option>
            <option> All </option>
          </select>
        </form>
        <div className={Class.chart}>
          <Line options={options} datasetIdKey="id" data={data} />
        </div>
        <ChartForm addWeightLog={addWeightLogHandler} />
      </div>
    </div>
  );
}

export default ProgressChart;
