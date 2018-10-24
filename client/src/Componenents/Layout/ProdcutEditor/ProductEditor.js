import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import React from 'react';
import styled from 'styled-components';
import {axiosBase} from "../../../Shared/axios";
import {reader} from "../../../Shared/FileReader";
import FilerUploader from "../../UI/FormControl/FilerUploader";
import FromControl from "../../UI/FormControl/FormControl";
import RadarChart from "../../UI/RadarChart/RadarChart";

const InputGrid = styled(Grid)`
box-sizing: border-box;
&&{padding: 0 .4rem ;}
`
const AnimatedGrid = styled(Grid)`
width: ${props => props.width};
transition: all .5s ease;
`
const ImagePreview = styled(Grid)`
background: url(${({slide}) => slide}) center center no-repeat;

background-size: contain;
width: 7rem;
padding: .4rem;
border: 1px solid grey;
background-clip: padding-box;
height: 5rem;
transition: all .5s ease;
`

class ProductEditor extends React.Component {
    state = {
        controllers: {
            metaData: [
                {label: "Product Name", type: "text", value: "", name: "product_name"},
                {label: "Product Price", type: "text", value: "", name: "product_price"},
                {label: "Image", type: "file", value: "", name: "image"},
                {label: "Brand", type: "text", value: "", name: "brand"},
                {label: "Available", type: "text", value: "", name: "available"},
                {label: "Product description", type: "text", value: "", name: "product_description", multiline: true},
            ],
            statistics: [
                {label: "weight", name: "weight", value: "55", type: "text",},
                {label: "strength", name: "strength", value: "55", type: "text",},
                {label: "adaptability", name: "adaptability", value: "55", type: "text",},
                {label: "maximumSpeed", name: "maximumSpeed", value: "55", type: "text",},
                {label: "stiffness", name: "stiffness", value: "55", type: "text",},
                {label: "safety", name: "safety", value: "55", type: "text",},
            ],
            slides: []
        },
        backgroundUrl: null,
        slidesPreviews: []
    }

    onChangeHandler = ({target: {value}}, name, branch) => {
        const updatedObject = {...this.state.controllers[branch].find(controller => controller.name === name)};
        updatedObject.value = value;
        this.setState({
            controllers: {
                ...this.state.controllers,
                [branch]: this.state.controllers[branch].map(controller => controller.name !== name ? controller : updatedObject)
            }
        })
    }
    buildProductData = () => {
        /*   /!*   this.productData = this.state.controllers.reduce((acc, controllerCollection) => ({
                  ...acc,
                  [Object.keys(controllerCollection)[0]]: controllerCollection.map(controller => ({[controller.name]: controller.value}))
              }), {})*!/

           this.productData = {};
           for (const controllerCollection in this.state.controllers) {
               this.productData[controllerCollection] = this.state.controllers[controllerCollection]
                   .map(controller => {
                       if (Object.keys(controllerCollection)[0] !== 'slides') {
                           return ({[controller.name]: controller.value})
                       } else {
                           console.log(controllerCollection);
                       }
                   });
           }*/
        const productData = new FormData();
        let metaData;
        for (const controllerGroup in this.state.controllers) {
            if (controllerGroup !== "slides") {
                // metaData = {
                //     ...metaData, [controllerGroup]: this.state.controllers[controllerGroup].map(controller => {
                //         if (controller.type !== 'file') {
                //             return {[controller.name]: controller.value}
                //         } else {
                //             return new FormData("image", controller.value);
                //         }
                //     })
                // }
            } else {
                const fd = new FormData();
                for (const file of this.state.controllers[controllerGroup]) {
                    fd.append('slide' + file.name, file);
                }
                dataToSend = {
                    ...dataToSend,
                    [controllerGroup]: fd
                }
            }
        }
        return dataToSend;
    }
    handelStatisticData = () => {
        return this.state.controllers.statistics.reduce((acc, item) => ({...acc, [item.name]: item.value}), {});
    }
    sendData = (e) => {
        e.preventDefault();
        axiosBase.post("/api/products", this.buildProductData(), {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    fileSelectedHandler = (files, branch, name) => {
        if (name === "image") {
            reader.onload = (event) => {
                const newMetadata = this.state.controllers.metaData.map(controller => controller.name !== "image" ?
                    controller :
                    {...controller, value: files});
                this.setState({
                    backgroundUrl: event.target.result,
                    controllers: {
                        ...this.state.controllers,
                        metaData: newMetadata
                    }
                })
            }
            try {
                reader.readAsDataURL(files);
            } catch (e) {
                console.log(e);
            }
        } else {
            // set files array
            const that = this;
            try {
                for (const file of files) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.setState({
                            slidesPreviews: [...that.state.slidesPreviews].concat({
                                data: event.target.result,
                                size: event.total,
                                id: event.total + new Date().getTime()
                            }),
                            controllers: {
                                ...that.state.controllers,
                                slides: [...that.state.controllers.slides].concat({
                                    file: file,
                                })
                            }
                        })

                    }
                    reader.readAsDataURL(file)
                }
            } catch (e) {
                console.log(e);
            }
        }
    }


    render() {
        const {
            state: {
                controllers: {
                    statistics,

                },
                backgroundUrl,
                slidesPreviews
            },
            sendData,
            handelStatisticData
        } = this;
        const statisticsData = handelStatisticData();
        return (
            <Grid container justify="center">
                <Grid xs item>
                    <form onSubmit={sendData}>
                        <Grid container>
                            <Grid item xs={8} container>
                                {this.state.controllers.metaData.map(controller => controller.type !== "file" &&
                                    <InputGrid key={controller.name} xs={controller.multiline ? 12 : 6} item>
                                        <FromControl payload={{...controller}} changeHandler={(e, name) => this.onChangeHandler(e, name, "metaData")}/>
                                    </InputGrid>
                                )}
                            </Grid>
                            <Grid item xs={4} container>
                                <Grid key="product_image" xs={12} item>
                                    <FilerUploader single backgroundUrl={backgroundUrl}
                                                   fileHandler={(file) => this.fileSelectedHandler(file, "slider", "image")}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        <Grid container>
                            <Grid item xs={8} container>
                                {this.state.controllers.statistics.map(controller => <InputGrid key={controller.name} xs={6} item>
                                    <FromControl payload={{...controller}} changeHandler={(e, name) => this.onChangeHandler(e, name, "statistics")}/>
                                </InputGrid>)}
                            </Grid>
                            <Grid item xs={4} container>
                                {statistics && <Grid xs item>
                                    <RadarChart
                                        current="test"
                                        statistics={statistics ? statisticsData : []}/>
                                </Grid>}
                            </Grid>
                            <br/>
                            <br/>
                            <Grid item container xs={12}>
                                <AnimatedGrid item width={slidesPreviews.length > 0 ? "50%" : "0%"}>
                                    <Grid container justify="flex-start" style={{padding: "1rem"}}>
                                        {slidesPreviews.map((slide, index) => <Grid item xs> <ImagePreview key={slide.size} slide={slide.data}/> </Grid>)}
                                    </Grid>
                                </AnimatedGrid>
                                <AnimatedGrid item xs width={slidesPreviews.length > 0 ? "50%" : "100%"}>
                                    <FilerUploader files={this.state.controllers.slides.length}
                                                   fileHandler={(file) => this.fileSelectedHandler(file, "slider", null)}/>
                                </AnimatedGrid>
                            </Grid>
                        </Grid>
                        <Button type="submit" color="primary" variant="raised"><Typography>Add The item</Typography></Button>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

export default ProductEditor;