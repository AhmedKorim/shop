import PropTypes from 'prop-types'
import React from 'react';
import {Radar} from "react-chartjs-2";

class RadarChart extends React.Component {
    render() {
        const {
            current,
            statistics
        } = this.props;

        const data = (statistics || [{}]).reduce((acc, item) => ({...acc, [Object.keys(item)[0]]: Object.values(item)[0]}), {});
        console.log(data);
        return (
            <Radar data={{
                labels: ["Weight",
                    "Strength",
                    "Adaptability",
                    "Maximum Speed",
                    "Stiffness",
                    "Safety"],
                datasets: [
                    {
                        label: "Average",
                        data: [51, 35, 55, 12, 50, 15],
                        backgroundColor: "rgba(66, 165, 245,.4)",
                        borderColor: "rgba(240, 98, 146.5)"
                    }, {
                        label: current,
                        data: [data.weight,
                            data.strength,
                            data.adaptability,
                            data.maximumSpeed,
                            data.stiffness,
                            data.safety],
                        backgroundColor: ["rgba(165, 214, 167,.6)",
                            "rgb(0, 200, 83)",],
                        borderColor: "rgba(0, 200, 83,.7)"
                    }

                ],
                options: {
                    title: {
                        display: false
                    }
                },
                borderWidth: 1
            }}
                   legend={{display: false}}
            />
        )
    }
}

export default RadarChart;

RadarChart.propTypes = {
    current: PropTypes.string,
    statistics: PropTypes.object
}