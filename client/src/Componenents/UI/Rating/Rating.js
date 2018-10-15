import React from 'react'
import "./Rating.scss";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";

const Rating = props => {
    let {rate, reviews} = props;
    return (
        <div className="ratingComponent">
            <Tooltip title={(reviews || reviews > 0) ? reviews + 'reviews' : "no reviews yet"} placement="bottom-end">
                <Grid container alignItems="center" justify="center">
                    <Grid item className="rateingGrid">
                        <div className="ratingWrapper">
                            <div className="rate">
                                <div className="stars value " style={{width: rate ? rate + '%' : 100 + '%'}}>
                                    <div className="rateValue">
                                        <i className="material-icons starRate">star</i>
                                        <i className="material-icons starRate">star</i>
                                        <i className="material-icons starRate">star</i>
                                        <i className="material-icons starRate">star</i>
                                        <i className="material-icons starRate">star</i>
                                    </div>
                                </div>
                                <div className="stars ">
                                    <i className="material-icons starRate">star_border</i>
                                    <i className="material-icons starRate">star_border</i>
                                    <i className="material-icons starRate">star_border</i>
                                    <i className="material-icons starRate">star_border</i>
                                    <i className="material-icons starRate">star_border</i>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Tooltip>
        </div>

    )
}
export default Rating