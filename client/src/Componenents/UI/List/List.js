import Divider from "@material-ui/core/Divider/Divider";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types';
import React, {Fragment} from 'react'
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from 'styled-components';

const Img = styled.img`
max-width: 90%;
display: block;
`
const EnhancedList = styled(List)`
padding: 0 .2rem !important;
margin: 0!important;
.productsListItem{
padding:  .1rem ;
width: 240px !important;
}
.itemData{
text-align: center;
}
.productTitle{
font-weight: bold;
text-transform: capitalize;
}
`

function ProudctList(props) {
    let {listItems} = props;
    return (
        <Fragment>
            {listItems.length > 0 ?
                <PerfectScrollbar>
                    <EnhancedList component="ul" className="productsList">
                        {listItems.map((item, index, array) => <Tooltip key={item.id} title="more to page details" placement="bottom-end">
                                <Fragment>
                                    <ListItem component="li" button className="productsListItem" onClick={void 0}>
                                        <Grid alignItems="center" container className="productItem" justify="center">
                                            <Grid container item xs={10}>
                                                <Grid container justify="center" alignItems="center">
                                                    <Grid item xs={4}>
                                                        <Img src={item.image} alt="productName"/>
                                                    </Grid>
                                                    <Grid item container alignItems="center" xs className="itemData">
                                                        <Grid xs={12} item className="cartItemheader">
                                                            <Typography variant="subheading" className="productTitle">
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs item className="cartItemPrice">
                                                            <Typography variant="subheading" className="productPrice">
                                                                {item.price}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={2} item container alignItems="center" justify="center">
                                                <div className="actionWrapper">
                                                    <div className="buttonFlooter">
                                                        <Tooltip title="remove item from the cart" placement="bottom-end">
                                                            <IconButton className="cartItemButton"
                                                                        onClick={(event) => (event.stopPropagation())}>
                                                                <Icon>delete</Icon>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    {(array.length > 1 && index < array.length - 1) && <Divider className="divider"/>}
                                </Fragment>
                            </Tooltip>
                        )}
                    </EnhancedList>
                </PerfectScrollbar> : null
            }
        </Fragment>

    )
}

ProudctList.propTypes = {
    listItems: PropTypes.arrayOf(PropTypes.shape({
            item: PropTypes.shape({
                image: PropTypes.string,
                id: PropTypes.string,
                price: PropTypes.price,
                name: PropTypes.string,
            })
        }).isRequired
    ).isRequired
}

export default ProudctList;

