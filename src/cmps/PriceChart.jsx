import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PriceChart() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    if (!toys) return
    const labels = toyService.getLabels()
    const pricePerLabelMap = toyService.calcAvgPricePerLabel(toys, labels)

    const data = {
        labels: Object.keys(pricePerLabelMap),
        datasets: [
            {
                label: 'avarege toy price',
                data: Object.values(pricePerLabelMap),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(156,39,160,0.2)',
                    'rgba(139, 150, 74, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(139, 150, 74, 1)',
                    'rgba(156,39,160,1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return <section className="chart-container">
        <Pie data={data} />;
    </section>
}


