import React from 'react';
import Radar from 'react-d3-radar';

class RadarChart extends React.Component {
    render() {
        return (
            <Radar
                width={250}
                height={250}
                padding={10}
                domainMax={10}
                highlighted={null}
                onHover={(point) => {
                    if (point) {
                        console.log('hovered over a data point');
                    } else {
                        console.log('not over anything');
                    }
                }}
                data={{
                    variables: [
                        {key: 'weight', label: 'Weight'},
                        {key: 'strength', label: 'Strength'},
                        {key: 'adaptability', label: 'Adaptability'},
                        {key: 'maximumSpeed', label: 'Maximum Speed'},
                        {key: 'stiffness', label: 'Stiffness'},
                        {key: 'safety', label: 'Safety'},
                    ],
                    sets: [
                        {
                            key: 'me',
                            label: 'My Scores',
                            values: {
                                Weight: 8,
                                strength: 8,
                                adaptability: 8,
                                maximumSpeed: 8,
                                stiffness: 8,
                                safety: 8,
                            },
                        },
                        {
                            key: 'avarage',
                            label: 'Everyone',
                            values: {
                                Weight: 7,
                                strength: 7,
                                adaptability: 7,
                                maximumSpeed: 7,
                                stiffness: 7,
                                safety: 7,
                            },
                        },
                    ],
                }}
            />
        )
    }
}

export default RadarChart;