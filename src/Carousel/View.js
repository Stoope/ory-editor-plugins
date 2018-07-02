import React, { Fragment } from "react";
import createPlugin from "../createPlugin";
import Lightbox from "react-images";

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="rgb(255, 255, 255)"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

class View extends React.Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0
  };
  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  };
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  };
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };
  gotoImage = index => {
    this.setState({
      currentImage: index
    });
  };
  handleClickImage = () => {
    if (this.state.currentImage === this.props.state.images.length - 1) return;

    this.gotoNext();
  };

  renderGallery = () => {
    const { images, cols, lightbox, previewHeight } = this.props.state;

    if (!images) return;
    const width = `calc((100% - ${(+cols + 1) * 10}px) / ${cols})`;

    const gallery = images.map((obj, i) => {
      return (
        <a
          style={{
            marginTop: "4px",
            marginBottom: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            cursor: lightbox ? "pointer" : "default",
            height: previewHeight ? `${previewHeight}px` : "auto"
          }}
          href={obj.src}
          key={i}
          onClick={e =>
            lightbox ? this.openLightbox(i, e) : e.preventDefault()
          }
        >
          <img
            style={{
              minWidth: "100%",
              minHeight: "100%"
            }}
            src={obj.src}
            alt=""
          />
        </a>
      );
    });

    return (
      <div
        style={{
          display: "grid",
          gridGap: "10px",
          gridTemplateColumns: new Array(+cols + 1).join(`${width} `)
        }}
      >
        {gallery}
      </div>
    );
  };
  render() {
    const { state } = this.props;
    return (
      <div style={{ minWidth: "40px", minHeight: "40px" }}>
        {this.renderGallery()}
        <Lightbox
          currentImage={this.state.currentImage}
          images={state.images}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
          imageCountSeparator=" из "
        />
      </div>
    );
  }
}

export default createPlugin({
  Component: View,
  name: "ory-editor-plugins/carousel",
  text: "Карусель",
  description: "Набор изображений",
  IconComponent: <Icon />,
  handleFocus: (props, source, ref) => {
    if (!ref) {
      return;
    }
    setTimeout(() => ref.focus());
  },
  createInitialState: () => ({
    images: [],
    cols: 2,
    previewHeight: 100,
    lightbox: true
  })
});
