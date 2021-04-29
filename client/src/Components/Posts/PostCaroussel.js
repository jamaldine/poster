import React from "react";

import { PATH_IMAGES } from "../../utils/config";

import "react-responsive-carousel/lib/styles/carousel.min.css";

var Carousel = require("react-responsive-carousel").Carousel;

const PostCaroussel = ({ images }) => {
  return (
    <Carousel showArrows={true}>
      {images
        ? images.map((item) => {
            return (
              <div key={item}>
                <img src={PATH_IMAGES + "post/" + item} />{" "}
              </div>
            );
          })
        : null}
    </Carousel>
  );
};

export default PostCaroussel;
