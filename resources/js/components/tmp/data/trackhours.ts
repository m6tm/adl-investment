

/**
 * Report track hours chart apex
 */

import { ApexOptions } from "apexcharts";
import moment from "moment";
import { ActivityInterface } from "../interfaces/pages/trackhours";


const $primary = '#5686E3',
        $success = '#39DA8A',
        $danger = '#FF5B5C',
        $warning = '#1A233A',
        $info = '#8EAEEC',
        $label_color_light = '#E6EAEE';

const themeColors = [$primary, $warning, $danger, $success, $info];

// Line Chart
// ----------------------------------
export const lineChartOptions = {

        series: (hours: Array<string>) => ([{
                name: 'Hours',
                type: 'area',
                data: hours.map(hour => parseInt(hour.split(':')[0])),
        }]),
        options: (labels: Array<string>): ApexOptions => ({
                chart: {
                        height: 350,
                        type: 'line',
                        stacked: false,
                },
                colors: themeColors,
                stroke: {
                        width: 2,
                        curve: 'smooth'
                },
                plotOptions: {
                        bar: {
                                columnWidth: '50%'
                        }
                },

                fill: {
                        opacity: 0.25,
                        gradient: {
                                inverseColors: false,
                                shade: 'light',
                                type: "vertical",
                                opacityFrom: 0.85,
                                opacityTo: 0.55,
                                stops: [0, 100, 100, 100]
                        }
                },
                labels,
                markers: {
                        size: 0
                },
                xaxis: {
                        type: "category",
                        categories: labels
                },
                yaxis: {
                        title: {
                                text: 'Hours',
                        },
                        min: 0,
                        max: 24
                },
                tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                                formatter: function (y: any, z: any) {
                                        if (typeof y !== "undefined") {
                                                return y.toFixed(2);
                                        }
                                        return y;

                                }
                        } as any,
                }
        })
}

export const StaticActivity: ActivityInterface = {
        id: 0,
        user_id: 0,
        companie_id: 0,
        occupancy: 0,
        time: '00:00:00',
        screenshots: [],
        updated_at: '2023-08-09T12:01:00Z',
        created_at: '2023-08-09T12:00:00Z'
    }