import {withTheme} from '@material-ui/core';
import Grid from "@material-ui/core/Grid/Grid";
import React from 'react';
import {Bar, Doughnut, Line} from "react-chartjs-2";
import styled from 'styled-components';
import GoogleMap from "../../GoogleMap/GoogleMap";
import Container from "../Container/Container";
import StatisticsCard from "./StatsisticCard";

const Wrapper = styled.section`
display: flex;
`
const EnhancedGrid = styled(Grid)`
margin: .4rem!important;
`;

class DashboardHome extends React.Component {


    render() {
        const {theme} = this.props;
        const textColor = theme.palette.text;
        return (
            <Wrapper>
                <Container wrap='no-wrap'>
                    <Grid container wrap="nowrap">
                        <EnhancedGrid item xs={12} sm md>
                            <StatisticsCard styling={theme}
                                            chart={() => <Doughnut data={{

                                                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                                                datasets: [{
                                                    label: '# of Votes',
                                                    data: [12, 19, 3, 5, 2, 3],
                                                    backgroundColor: [
                                                        'rgb(255, 99, 132)',
                                                        'rgb(54, 162, 235)',
                                                        'rgb(255, 206, 86)',
                                                        'rgb(75, 192, 192)',
                                                        'rgb(153, 102, 252)',
                                                        'rgb(255, 159, 64)'
                                                    ],
                                                    borderColor: [
                                                        'rgba(255,99,132,1)',
                                                        'rgba(54, 162, 235, 1)',
                                                        'rgba(255, 206, 86, 1)',
                                                        'rgba(75, 192, 192, 1)',
                                                        'rgba(153, 102, 255, 1)',
                                                        'rgba(255, 159, 64, 1)'
                                                    ],
                                                    borderWidth: 1
                                                }]
                                            }}
                                                                   options={{
                                                                       title: {
                                                                           display: true,
                                                                           text: 'Brands sales share',
                                                                           position: "bottom",
                                                                           fontSize: 16,
                                                                           fontColor: textColor.secondary
                                                                       }
                                                                   }}
                                                                   legend={{display: false}}
                                            />}
                            />
                        </EnhancedGrid>
                        <EnhancedGrid item xs={12} sm md>
                            <StatisticsCard styling={theme}
                                            chart={() => <Line
                                                data={{

                                                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                                                    datasets: [
                                                        {
                                                            label: '# of Votes',
                                                            data: [12, 19, 3, 5, 2, 3],

                                                            borderColor: [
                                                                "#E040FB"

                                                            ],
                                                            borderWidth: 3,


                                                        }
                                                    ]
                                                }}
                                                options={{
                                                    title: {
                                                        display: true,
                                                        text: 'Products On Stock',
                                                        position: "bottom",
                                                        fontSize: 16,
                                                        fontColor: textColor.secondary
                                                    },

                                                }}
                                                legend={{display: false}}
                                            />}
                            />
                        </EnhancedGrid>
                        <EnhancedGrid item xs={12} sm md>
                            <StatisticsCard styling={theme}
                                            chart={() => <Bar
                                                data={{

                                                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                                                    datasets: [{
                                                        label: '# of Votes',
                                                        data: [12, 19, 3, 5, 2, 3],
                                                        backgroundColor: [
                                                            '#008744',
                                                            '#303f94',
                                                            '#7B1FA2',
                                                            '#1976D2',
                                                            '#00796B',
                                                            '#F57C00',

                                                        ],
                                                        borderColor: [
                                                            '#00ce6d',
                                                            '#475dd4',
                                                            '#4A0072',
                                                            '#004BA0',
                                                            '#004C40',
                                                            '#BB4D00',

                                                        ],
                                                        borderWidth: 1
                                                    }]
                                                }}
                                                options={{
                                                    title: {
                                                        display: true,
                                                        text: "Location of Top sales",
                                                        position: "bottom",
                                                        fontSize: 16,
                                                        fontColor: textColor.secondary
                                                    }
                                                }}
                                                legend={{display: false}}
                                            />}
                            />
                        </EnhancedGrid>
                        <EnhancedGrid item xs={12} sm md>
                            <StatisticsCard styling={theme}
                                            chart={() => <Line
                                                data={{

                                                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                                                    datasets: [
                                                        {
                                                            label: '# of Votes',
                                                            data: [15, 19, 8, 12, 22, 30],

                                                            borderColor: [
                                                                "#00E676"

                                                            ],
                                                            borderWidth: 3,


                                                        }
                                                    ]
                                                }}
                                                options={{
                                                    title: {
                                                        display: true,
                                                        text: 'Market Funneling',
                                                        position: "bottom",
                                                        fontSize: 16,
                                                        fontColor: textColor.secondary
                                                    },

                                                }}
                                                legend={{display: false}}
                                            />}
                            />
                        </EnhancedGrid>
                    </Grid>
                    <Grid container wrap="nowrap">
                        <EnhancedGrid item sm={12} md={6}>
                            <StatisticsCard styling={theme} disablePadding action>
                                <GoogleMap/>
                            </StatisticsCard>
                        </EnhancedGrid>
                        <EnhancedGrid item sm={12} md={6}/>
                    </Grid>
                </Container>
            </Wrapper>
        )
    }
}

export default withTheme()(DashboardHome);