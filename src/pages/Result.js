import { useLocation } from 'react-router-dom';
import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';
import background from '../image/background.jpg';
import profile from '../image/profile.png'

const BgImage = () => {
  const [image] = useImage(background);
  return <Image image={image} width={1280} height={720} />;
};

class URLImage extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}

function Result() {
    const location = useLocation();
    const { message,img } = location.state;
    console.log(message.textInput);
    console.log(img.images[0].data_url);
    const [imageProfile] = useImage(img.images[0].data_url);


    return (
      <div className="App">
        <header className="App-header">
        <Stage width={1280} height={720}>
          <Layer>
            <BgImage />
            <Image image={imageProfile} width={250} height={250} x={180} y={250} />
            <Text
              text={message.textInput}
              width={450}
              wrap='300'
              x={650}
              y={350}
              fontSize={16}
              fontFamily="Arial"
              fill="black"
              padding={5}
            />
          </Layer>
        </Stage>
        </header>
      </div>
    );
  }
  
  export default Result;