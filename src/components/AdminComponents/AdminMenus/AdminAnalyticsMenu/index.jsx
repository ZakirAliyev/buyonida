import {useState, useRef, useEffect} from "react";
import {Line} from "react-chartjs-2";
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
import Box from "@mui/material/Box";
import {DatePicker} from "antd";
import moment from "moment";
import "./index.scss";
import {useGetAdminDashboardQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {FaManatSign} from "react-icons/fa6";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartWithGradient = ({data, options, refSetter}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;
        // React-Chartjs-2 v4+ kullanımında chart instance direkt chartRef.current içinde
        const chart = chartRef.current.$context?.chart || chartRef.current;
        if (!chart) return;

        const ctx = chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(250, 217, 97, 0.4)");
        gradient.addColorStop(1, "rgba(250, 217, 97, 0)");

        chart.data.datasets[0].backgroundColor = gradient;
        chart.update();

        // İsteğe bağlı dışarıya chart instance göndermek için
        if (refSetter) refSetter(chart);
    }, [data, refSetter]);

    return <Line ref={chartRef} data={data} options={options}/>;
};

const ChartComponent = () => {
    const getFormattedDate = (date) => date.toISOString().split("T")[0];

    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 7);

    const [endDate, setEndDate] = useState(getFormattedDate(today));
    const [startDate, setStartDate] = useState(getFormattedDate(threeDaysAgo));
    const [filteredData, setFilteredData] = useState([]);
    const marketId = Cookies.get("chooseMarket");
    const {data: getAdminDashboard} = useGetAdminDashboardQuery({
        startDate,
        endDate,
        marketId,
    });
    const dashboardData = getAdminDashboard?.data;

    useEffect(() => {
        if (!dashboardData?.dailyData) {
            setFilteredData([]);
            return;
        }

        const filtered = dashboardData.dailyData.filter((item) => {
            const itemDate = new Date(item.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start && itemDate < start) return false;
            if (end && itemDate > end) return false;
            return true;
        });

        setFilteredData(filtered);
    }, [dashboardData, startDate, endDate]);

    // Etiketler: tarih bilgisi
    const chartLabels = filteredData.length
        ? filteredData.map((item) =>
            new Date(item.date).toLocaleDateString("tr-TR")
        )
        : ["Veri Yok"];

    // 1. Grafik için: Günlük satışlar
    const chartSalesData = filteredData.length
        ? filteredData.map((item) => item.totalSales)
        : [0];

    // 2. Grafik için: Her günün averageOrderValue değeri
    const averageDataArray = filteredData.length
        ? filteredData.map((item) => item.averageOrderValue)
        : [0];

    // 3. Grafik için: Her günün totalOrders değeri
    const ordersDataArray = filteredData.length
        ? filteredData.map((item) => item.totalOrders)
        : [0];

    // 4. Grafik için: Her günün returningCustomerRate değeri
    const returningDataArray = filteredData.length
        ? filteredData.map((item) => item.returningCustomerRate)
        : [0];

    // 1. Grafik: Satışlar
    const salesData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Satışlar",
                data: chartSalesData,
                borderColor: "#FAD961",
                pointBorderColor: "#FAD961",
                pointBackgroundColor: "#ffffff",
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                backgroundColor: "#f38b4a",
                fill: true
            },
        ],
    };

    // 2. Grafik: Ortalama Sipariş Değeri
    const averageData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Ortalama Sipariş Değeri",
                data: averageDataArray,
                borderColor: "#4287f5",
                pointBorderColor: "#4287f5",
                pointBackgroundColor: "#ffffff",
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
                backgroundColor: "rgba(66, 135, 245, 0.2)",
            },
        ],
    };

    // 3. Grafik: Toplam Sipariş (totalOrders)
    const ordersData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Toplam Sipariş",
                data: ordersDataArray,
                borderColor: "#34a853",
                pointBorderColor: "#34a853",
                pointBackgroundColor: "#ffffff",
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    // 4. Grafik: Tekrar Eden Müşteri Oranı
    const returningData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Tekrar Eden Müşteri Oranı",
                data: returningDataArray,
                borderColor: "#f54242",
                pointBorderColor: "#f54242",
                pointBackgroundColor: "#ffffff",
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
                backgroundColor: "rgba(245, 66, 66, 0.2)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#333",
                titleColor: "#fff",
                bodyColor: "#fff",
                cornerRadius: 8,
                padding: 8,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#666",
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(0,0,0,0.05)",
                },
                ticks: {
                    color: "#666",
                    font: {
                        size: 12,
                    },
                },
                min: 0
            },
        },
    };

    return (
        <section id="adminAnalyticsMenu">
            <div className="textWrapper">
                <h2 style={{padding: '0 16px'}}>Analytics</h2>
            </div>
            {/* Tarih seçiciler */}
            <Box style={{padding: '0 16px 0 16px'}} sx={{display: "flex", gap: 2, marginBottom: 2}}>
                <DatePicker
                    placeholder="Başlangıç Tarihi"
                    value={startDate ? moment(startDate, "YYYY-MM-DD") : null}
                    onChange={(date, dateString) => setStartDate(dateString)}
                />
                <DatePicker
                    placeholder="Bitiş Tarihi"
                    value={endDate ? moment(endDate, "YYYY-MM-DD") : null}
                    onChange={(date, dateString) => setEndDate(dateString)}
                />
            </Box>
            {/* Grafiklerin düzeni */}
            <div className="row">
                {/* 1. Grafik: Satışlar */}
                <div className="pd0 col-6">
                    <div className="wrapper">
                        <div className="chartContainer">
                            <h5>Total sales</h5>
                            <h2>{dashboardData?.totalSales} <FaManatSign className={"icon"}/></h2>
                            <ChartWithGradient data={salesData} options={options}/>
                        </div>
                    </div>
                </div>
                {/* 2. Grafik: Ortalama Sipariş Değeri */}
                <div className="pd0 col-6">
                    <div className="wrapper">
                        <div className="chartContainer">
                            <h5>Average order value</h5>
                            <h2>{dashboardData?.averageOrderValue} <FaManatSign className={"icon"}/></h2>
                            <ChartWithGradient data={averageData} options={options}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* 3. Grafik: Toplam Sipariş (totalOrders) */}
                <div className="pd0 col-6">
                    <div className="wrapper">
                        <div className="chartContainer">
                            <h5>Total orders</h5>
                            <h2>{dashboardData?.totalOrders}</h2>
                            <ChartWithGradient data={ordersData} options={options}/>
                        </div>
                    </div>
                </div>
                {/* 4. Grafik: Tekrar Eden Müşteri Oranı */}
                <div className="pd0 col-6">
                    <div className="wrapper">
                        <div className="chartContainer">
                            <h5>Returning customer rate</h5>
                            <h2>{dashboardData?.returningCustomerRate} %</h2>
                            <ChartWithGradient data={returningData} options={options}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChartComponent;
