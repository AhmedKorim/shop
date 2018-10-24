import React, {Component, Fragment} from 'react'
import Swiper from 'react-id-swiper';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";
import styled from 'styled-components';
import './imgSwipper.scss';
// const Caro = styled.div`
//  overflow: hidden;
//   max-width: 100%;
//   height: 300px;
//   position: relative;
//   .slidNavButton {
//     position: absolute;
//     z-index: 44;
//     background-color: #fff;
//      }
//
//      .next {
//     right: 0;
//     top: 50%;
//     transform: translate3d(-50%, -50%, 0);
//   }
//   .prev {
//     left: 0;
//     top: 50%;
//     transform: translate3d(50%, -50%, 0);
//   }
//   .swiper-container {
//     height: 100%;
//     width: 100%;
//     position: relative;
//     background-color: transparent;
//     padding: 0;
//   }
//   .SlideItem {
//     z-index: 4;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   .imgWrapper {
//     height: 0;
//     width: 75%;
//     padding-top: 50%;
//     position: relative;
//   }
//     .swiper-pagination-bullets {
//     .swiper-pagination-bullet{
//       transition: all ease-out .5s;
//       transform: scale(1);
//       will-change: transform;
//       &.swiper-pagination-bullet-active {
//         transform: scale(1.5,1.6);
//       }
//     }
//
//
//     .swiper-lazy {
//     top: 0;
//     left: 0;
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     background-size: contain;
//     background-position: center center;
//     background-repeat: no-repeat;
//   }
// `
const parms = {
    slidesPerView: 1,
    spaceBetween: 0,
    clickable: true,
    lazy: true,
    preloadImages: false,
    loadPrevNext: false,
    loop: true,
    a11y: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    autoplay: {
        delay: 5000
    }
};

class ImgSwipper extends Component {


    mainSwiperNav = (action) => {
        if (!this.mainSwiper) return;
        if (action === 'prev') {
            this.mainSwiper.slidePrev();
            return;
        }
        this.mainSwiper.slideNext();
    };

    render() {
        const {
            props: {
                imagesArray
            },
            mainSwiperNav
        } = this;
        console.log(this.props);
        return (
            <div className="productImagesSwiper">
                <Fragment>
                    <Tooltip title="previous slide">
                        <Button className="slidNavButton prev"
                                variant="fab" color="default"
                                onClick={() => mainSwiperNav('prev')}
                                mini><Icon>chevron_left</Icon></Button></Tooltip>
                    <Tooltip title="next slide">
                        <Button className="slidNavButton next"
                                variant="fab" color="default"
                                onClick={() => mainSwiperNav('next')}
                                mini><Icon>chevron_right</Icon></Button></Tooltip>
                    <div className="swipperWrapper">
                        <Swiper {...parms} ref={(node) => node ? this.mainSwiper = node.swiper : void 0} className="swiperContainer">
                            {imagesArray.map(image => <div className="SlideItem" key={Object.keys(image)[0]}>
                                    <div className="imgWrapper">
                                        <div data-background={Object.values(image)[0]} className="swiper-lazy"></div>
                                    </div>
                                    <div className="swiper-lazy-preloader"></div>
                                </div>
                            )}
                        </Swiper>
                    </div>
                </Fragment>
            </div>
        )
    }
}

export default ImgSwipper;