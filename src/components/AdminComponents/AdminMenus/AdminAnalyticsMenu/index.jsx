import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Box from '@mui/material/Box';
import { DatePicker } from 'antd';
import moment from 'moment';
import './index.scss';
import { useGetAdminDashboardQuery } from '../../../../service/userApi.js';
import Cookies from 'js-cookie';
import { FaManatSign } from 'react-icons/fa6';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartWithGradient = ({ data, options, refSetter }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const chart = chartRef.current.$context?.chart || chartRef.current;
        if (!chart) return;

        const ctx = chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(250, 217, 97, 0.4)');
        gradient.addColorStop(1, 'rgba(250, 217, 97, 0)');

        chart.data.datasets[0].backgroundColor = gradient;
        chart.update();

        if (refSetter) refSetter(chart);
    }, [data, refSetter]);

    return <Line ref={chartRef} data={data} options={options} />;
};

const ChartComponent = () => {
    const getFormattedDate = (date) => date.toISOString().split('T')[0];

    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 7);

    const [endDate, setEndDate] = useState(getFormattedDate(today));
    const [startDate, setStartDate] = useState(getFormattedDate(threeDaysAgo));
    const [filteredData, setFilteredData] = useState([]);
    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const marketId = Cookies.get('chooseMarket');
    const { data: getAdminDashboard } = useGetAdminDashboardQuery({
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

    // Prevent mouse wheel from changing date picker
    useEffect(() => {
        const handleWheel = (e) => {
            console.log('Wheel event blocked on DatePicker panel'); // Debugging
            e.preventDefault();
        };

        const attachListeners = () => {
            const datePickers = document.querySelectorAll('.ant-picker-panel');
            datePickers.forEach((picker, index) => {
                console.log(`Attaching wheel listener to picker ${index}`); // Debugging
                picker.addEventListener('wheel', handleWheel, { passive: false });
            });
        };

        const detachListeners = () => {
            const datePickers = document.querySelectorAll('.ant-picker-panel');
            datePickers.forEach((picker, index) => {
                console.log(`Detaching wheel listener from picker ${index}`); // Debugging
                picker.removeEventListener('wheel', handleWheel);
            });
        };

        // Delay attachment to ensure DOM is updated
        const timeoutId = setTimeout(attachListeners, 100);

        return () => {
            clearTimeout(timeoutId);
            detachListeners();
        };
    }, [startOpen, endOpen]);

    const chartLabels = filteredData.length
        ? filteredData.map((item) =>
            new Date(item.date).toLocaleDateString('tr-TR')
        )
        : ['Veri Yok'];

    const chartSalesData = filteredData.length
        ? filteredData.map((item) => item.totalSales)
        : [0];
    const averageDataArray = filteredData.length
        ? filteredData.map((item) => item.averageOrderValue)
        : [0];
    const ordersDataArray = filteredData.length
        ? filteredData.map((item) => item.totalOrders)
        : [0];
    const returningDataArray = filteredData.length
        ? filteredData.map((item) => item.returningCustomerRate)
        : [0];

    const salesData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Satışlar',
                data: chartSalesData,
                borderColor: '#FAD961',
                pointBorderColor: '#FAD961',
                pointBackgroundColor: '#ffffff',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                backgroundColor: '#f38b4a',
                fill: true,
            },
        ],
    };

    const averageData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Ortalama Sipariş Değeri',
                data: averageDataArray,
                borderColor: '#4287f5',
                pointBorderColor: '#4287f5',
                pointBackgroundColor: '#ffffff',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(66, 135, 245, 0.2)',
            },
        ],
    };

    const ordersData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Toplam Sipariş',
                data: ordersDataArray,
                borderColor: '#34a853',
                pointBorderColor: '#34a853',
                pointBackgroundColor: '#ffffff',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const returningData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Tekrar Eden Müşteri Oranı',
                data: returningDataArray,
                borderColor: '#f54242',
                pointBorderColor: '#f54242',
                pointBackgroundColor: '#ffffff',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(245, 66, 66, 0.2)',
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
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
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
                    color: '#666',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
                ticks: {
                    color: '#666',
                    font: {
                        size: 12,
                    },
                },
                min: 0,
            },
        },
    };

    return (
        <section id="adminAnalyticsMenu">
            <div className="textWrapper">
                <h2 style={{ padding: '0 16px' }}>Analytics</h2>
            </div>
            <Box style={{ padding: '0 16px 0 16px' }} sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <DatePicker
                    placeholder="Başlangıç Tarihi"
                    value={startDate ? moment(startDate, 'YYYY-MM-DD') : null}
                    onChange={(date, dateString) => setStartDate(dateString)}
                    open={startOpen}
                    onOpenChange={(open) => setStartOpen(open)}
                    onFocus={() => setStartOpen(true)}
                    onBlur={() => setStartOpen(false)}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    onPanelChange={(value, mode) => console.log('Start Date panel changed:', value, mode)} // Debugging
                />
                <DatePicker
                    placeholder="Bitiş Tarihi"
                    value={endDate ? moment(endDate, 'YYYY-MM-DD') : null}
                    onChange={(date, dateString) => setEndDate(dateString)}
                    open={endOpen}
                    onOpenChange={(open) => setEndOpen(open)}
                    onFocus={() => setEndOpen(true)}
                    onBlur={() => setEndOpen(false)}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    onPanelChange={(value, mode) => console.log('End Date panel changed:', value, mode)} // Debugging
                />
            </Box>
            <div className="row">
                <div className="pd0 col-6">
                    <div className="wrapper">
                        <div className="chartContainer">
                            <h5>Total sales</h5>
                            <h2>
                                {dashboardData?.totalSales} <FaManatSign className="icon" />
                            </h2>
                            <ChartWithGradient data={salesData} options={options} />
                        </div>
                    </div>
                </div>
                <div className="pd0 col-6">
                    <div className="wrapper">
                        <div className="chartContainer">
                            <h5>Average order value</h5>
                            <h2>
                                {dashboardData?.averageOrderValue} <FaManatSign className="icon" />
                            </h2>
                            <ChartWithGradient data={averageData} options={options} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="pd0 col-6">
                    <div className="wrapper">
                        <div className="chartContainer">
                            <h5>Total orders</h5>
                            <h2>{dashboardData?.totalOrders}</h2>
                            <ChartWithGradient data={ordersData} options={options} />
                        </div>
                    </div>
                </div>
                <div className="pd0 col-6">
                    <div className="wrapper">
                        <div className="chartContainer">
                            <h5>Returning customer rate</h5>
                            <h2>{dashboardData?.returningCustomerRate} %</h2>
                            <ChartWithGradient data={returningData} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChartComponent;