import React from 'react';

import styled from 'styled-components';
import scriptLoader from 'react-async-script-loader';
import {darkTheme} from "../../../assets/googleMapsStyled";
import {locations} from "../../../assets/googleMapsStyled";
import {withTheme} from '@material-ui/core';

const MapWrapper = styled.div`
width: 100%;
height: 100%;
position:absolute;
top: 0;
left: 0;
`
const Wrapper = styled.div`
  padding-top:45%;
  width: 100%;
  position:relative;
`

class GoogleMap extends React.Component {
    state = {
        mapReady: false
    }

    initMap = () => {
        const imgUrl = 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + this.props.theme.palette.primary.main.replace(/#/, "") + '|40|_|%E2%80%A2';
        this.markerImage = new window.google.maps.MarkerImage(imgUrl,
            new window.google.maps.Size(21, 34),
            new window.google.maps.Point(0, 0),
            new window.google.maps.Point(10, 34),
            new window.google.maps.Size(21, 34));

        this.setState({mapReady: true});
        this.map = new window.google.maps.Map(this.mapWrapper, {
            center: {lat: 40.7413549, lng: -73.9980244},
            zoom: 9,
            disableDefaultUI: true,
            styles: darkTheme,
            markerOptions: {}
        });
        this.infoWindow = new window.google.maps.InfoWindow()
        this.createMarkers();
    };
    createMarkers = () => {
        const that = this;
        for (const [index, position] of locations.entries()) {
            const {title, location} = position;
            const marker = new window.google.maps.Marker({
                position: location,
                title,
                id: index,
                animation: window.google.maps.Animation.DROP,
                map: that.map
            })
        }
    }


    componentDidMount() {
        console.log('map loaded');
    }

    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                this.initMap();
            }
        }
    }

    render() {
        return (
            <Wrapper>
                <MapWrapper role="aplicaton" innerRef={node => this.mapWrapper = node}/>
            </Wrapper>
        )
    }
}


export default scriptLoader(
    ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCXbw5wy_UfZMPbf7iKGZO7q0ktmdgLkXw',],
)(withTheme()(GoogleMap));
