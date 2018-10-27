import PropTypes from 'prop-types'
import React from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import {withTheme} from '@material-ui/core';

const Slide = styled.div`
background-color:#fff;
div${Image}{
  box-shadow: ${({shadow}) => shadow[1]};

}
&.myActiveSlide{
  div${Image}{
  box-shadow: ${({shadow}) => shadow[16]};
  }
}
`


const Image = styled.div`
background:#fff url('${({src}) => src}') center center no-repeat;
width: 100%;
height: 240px;
background-size: contain;

`
const params = {
    scrollbar: '.swiper-scrollbar',
    effect: 'coverflow',
    direction: 'horizontal',
    slideToClickedSlide: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 5,
    freeMode: false,
    loop: true,
    slideActiveClass: 'myActiveSlide',
    freeModeSticky: true,
    // loop: true,
    // grabCursor: true,
    coverflowEffect: {
        slideShadows: true,
        depth: 100,
        rotate: 50,
        modifier: 1
    },
};


class CoverFlowSwiper extends React.Component {


    componentDidMount() {
        const swiper = this.swiper;
        if (swiper) {
            const aciveSlide = this.props.slides[swiper.realIndex];
            if (aciveSlide) {
                this.props.getActiveKey(aciveSlide.id)
            }
            swiper.on('slideChange', () => {
                const aciveSlide = this.props.slides[swiper.realIndex];
                if (aciveSlide) {
                    this.props.getActiveKey(aciveSlide.id)
                }

            })
        }
    }


    render() {
        const {slides, theme} = this.props;
        return (
            <div className="pt-4">
                <Swiper {...params} ref={node => node && (this.swiper = node.swiper)}>
                    {slides.map(slide => <Slide key={slide.id} shadow={theme.shadows}>
                        <Image src={window.location.origin + '/' + slide.image}/>
                    </Slide>)}
                </Swiper>
            </div>
        )
    }
}

export default withTheme()(CoverFlowSwiper);

CoverFlowSwiper.propTypes = {
    slides: PropTypes.array.isRequired,
    getActiveKey: PropTypes.func
}