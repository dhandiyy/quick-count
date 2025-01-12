import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarChartWithLinks = ({ chartData, totalData, links }) => {
	// Create a custom plugin to draw clickable areas
	const clickableAreasPlugin = {
		id: 'clickableAreas',
		afterDraw: (chart) => {
			const ctx = chart.ctx;
			chart.data.datasets[0].data.forEach((_, index) => {
				const meta = chart.getDatasetMeta(0);
				const rect = meta.data[index].getProps(['x', 'y', 'width', 'height']);

				// Store the clickable areas data for later use
				if (!chart.clickableAreas) chart.clickableAreas = [];
				chart.clickableAreas[index] = {
					left: rect.x - rect.width / 2,
					right: rect.x + rect.width / 2,
					top: rect.y,
					bottom: chart.height
				};
			});
		}
	};

	return (
		<div className="relative p-4 rounded-2xl flex flex-col h-full row-span-2 order-1 lg:order-2 aspect-square lg:aspect-auto">
			{/* Overlay clickable areas with Links */}
			<div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
				{chartData.labels.map((label, index) => (
					<Link
						key={index}
						to={links[index]}
						className="absolute"
						style={{
							left: `${(index / chartData.labels.length) * 100}%`,
							width: `${(1 / chartData.labels.length) * 100}%`,
							height: '100%',
							pointerEvents: 'auto',
						}}
					>
						<span className="sr-only">View details for {label}</span>
					</Link>
				))}
			</div>

			<Bar
				className="h-full"
				data={chartData}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						title: {
							display: true,
							text: 'Hasil Perhitungan Suara (%)' ,
						},
						tooltip: {
							enabled: true
						},
						legend: {
							display: false
						},
						datalabels: {
							display: true,
							color: 'white',
							align: 'center',
							anchor: 'center',
							font: {
								weight: 'bold',
								size: 32,
							},
							formatter: function (value) {
								return Math.round((value / totalData.counted) * 100) + '%';
							},
						},
					},
					onHover: (event, elements) => {
						event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
					},
				}}
				plugins={[clickableAreasPlugin]}
			/>

		</div>
	);
};

export default BarChartWithLinks;