import Grid from "@material-ui/core/Grid/Grid";
import React from 'react';
import {reader} from "../../../Shared/FileReader";
import FilerUploader from "../../UI/FormControl/FilerUploader";
import FromControl from "../../UI/FormControl/FormControl";
import RadarChart from "../../UI/RadarChart/RadarChart";
import styled from 'styled-components';

const InputGrid = styled(Grid)`
box-sizing: border-box;
&&{padding: 0 .4rem ;}
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
        },
        backgroundUrl: null
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
        /*   this.productData = this.state.controllers.reduce((acc, controllerCollection) => ({
               ...acc,
               [Object.keys(controllerCollection)[0]]: controllerCollection.map(controller => ({[controller.name]: controller.value}))
           }), {})*/
        this.productData = this.productData || {};
        for (const controllerCollection in this.state.controllers) {
            this.productData[controllerCollection] = this.state.controllers[controllerCollection].map(controller => ({[controller.name]: controller.value}));
        }
    }
    fileSelectedHandler = (files, branch, name) => {
        if (name === "image") {
            reader.onload = (event) => {
                this.setState({backgroundUrl: event.target.result})
            }
            try {
                reader.readAsDataURL(files);
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
                backgroundUrl
            },
            buildProductData,
            productData

        } = this;
        buildProductData();
        return (
            <Grid container justify="center">
                <Grid xs item>
                    <form>
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
                                        statistics={productData ? productData.statistics : []}/>
                                </Grid>}
                            </Grid>
                            <br/>
                            <br/>
                            <Grid item xs={12}>
                                <FilerUploader fileHandler={(file) => this.fileSelectedHandler(file, "slider", null)}/>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

export default ProductEditor;