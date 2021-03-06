/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flickityReady: false,
    };

    this.refreshFlickity = this.refreshFlickity.bind(this);
  }

  componentDidMount() {
    this.flickity = new Flickity(this.flickityNode, this.props.options || {});

    this.setState({
      flickityReady: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const flickityDidBecomeActive =
      !prevState.flickityReady && this.state.flickityReady;
    let childrenDidChange;
    if (prevProps.children) {
      childrenDidChange =
        prevProps.children.length !== this.props.children.length;
    }

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity();
    }
  }

  // componentWillUnmount() {
  //   console.log('unmounting');
  //   this.flickity.destroy();
  // }

  refreshFlickity() {
    this.flickity.reloadCells();
    this.flickity.resize();
    this.flickity.updateDraggable();
  }

  renderPortal() {
    if (!this.flickityNode) {
      return null;
    }

    const mountNode = this.flickityNode.querySelector('.flickity-slider');

    if (mountNode) {
      return ReactDOM.createPortal(this.props.children, mountNode);
    }
  }

  render() {
    return [
      <div
        className="test car-style"
        key="flickityBase"
        ref={(node) => (this.flickityNode = node)}
      />,
      this.renderPortal(),
    ].filter(Boolean);
  }
}
