import Fade from "@material-ui/core/Fade/Fade";
import Grow from "@material-ui/core/Grow/Grow";
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from 'prop-types'
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
position:relative;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
min-height: 200px;
max-height: 250px;
padding: 1rem;
input{
display:none;
}

`;
const ExposedtListener = styled.div`
position:absolute;
top: 1rem;
left: 1rem;
border: 1px dashed  ${props => props.borderColor};
transition: all .3s ease-in-out;
background:${props => props.background} center center no-repeat;
background-size:contain;
border-radius: .2rem;
  width: calc(100% - 1rem);
  justify-content: center;
  align-items: center;
  display: flex;
  height: calc(100% - 1rem);
  >div{
  display:flex;
  flex-direction: column;
  >div{
  text-align: center;
  }
  }
  .icon{
  font-size: 3rem;
  }
  
`

class FilerUploader extends React.Component {
    state = {
        DnD: true,
        dragState: null,
    }

    componentDidMount() {
        if (!('FileReader' in window) && this.state.DnD) {
            this.setState({DnD: false})
        }
    }

    dragFileUpload = (e) => {
        e.preventDefault();
        e.stopPropagation();
        switch (e.type) {
            case"dragenter":
            case"dragover":
                if (!this.state.dragState) {
                    this.setState({dragState: "#448AFF"})
                }
                break;
            case "drop": {
                const files = e.dataTransfer.files;
                console.log(e);
                if (this.props.single) {
                    this.props.fileHandler(files[0]);
                    this.setState({dragState: "#00C853"})

                } else {
                    this.setState({dragState: "#00C853"})
                    this.props.fileHandler(files);

                }
            }
                break;
            default:
                if (this.state.dragState) {
                    this.setState({dragState: null})
                }
        }
    }


    render() {
        const {
            state: {
                dragState,
            },
            props: {
                single,
                files,
                backgroundUrl
            },
            dragFileUpload
        } = this;
        const added = !!backgroundUrl;
        return (
            <Wrapper>
                <input type="file"
                       ref={node => this.fileInput = node}
                />
                <ExposedtListener
                    borderColor={dragState || 'grey'}
                    background={dragState ? (backgroundUrl && single) ? `rgba(255,255,255,.5) url(${backgroundUrl}) ` : "rgba(0,0,0,.1)" : "transparent"}
                    onClick={(e) => {
                        console.log(e.type);
                        this.fileInput.click();
                    }}
                    onDrag={dragFileUpload}
                    onDragStart={dragFileUpload}
                    onDragLeave={dragFileUpload}
                    onDragEnter={dragFileUpload}
                    onDragEnd={dragFileUpload}
                    onDragOver={dragFileUpload}
                    onDrop={dragFileUpload}
                >
                    {
                        this.state.DnD ?
                            <div>
                                <div>
                                    <Grow in={true} key={(files || added) ? "add" : "append"} timeout={300}>
                                        <Icon className="icon"
                                              color="primary"> {files || added ? (added ? "check_circle" : "add") : "cloud_upload"} </Icon>
                                    </Grow>
                                </div>
                                <Fade in={true} key={files ? "add" : files} timeout={300}>
                                    <Typography>{files ? ` ${files} files uploaded drop more files?` : "Drag Files To Upload"}</Typography>
                                </Fade>
                            </div>
                            :
                            <div>drag and drop is not supported</div>
                    }
                </ExposedtListener>
            </Wrapper>
        )
    }
}

FilerUploader.propTypes = {
    single: PropTypes.bool,
    files: PropTypes.number
}
export default FilerUploader;

