import styles from "./slide.module.css";
import { useState } from "react";

export const Carousel = ({
  data,
  onClick,
  sliderData,
  slideNext,
  slidePrev,
}) => {
  const [translateNumber, setTranslateNumber] = useState(0);

  const previewNext = () => {
    setTranslateNumber((prev) => {
      return prev - 155;
    });
  };

  const previewPrev = () => {
    if (translateNumber === 0) {
      return;
    }
    setTranslateNumber((prev) => {
      return prev + 155;
    });
  };
  return (
    <>
      <div className={styles.box}>
        {sliderData && (
          <img
            style={{ borderRadius: "8px" }}
            src={sliderData?.url}
            alt="sliderImage"
            width="100%"
            height="500"
          />
        )}
        <div className={styles.button_wrapper}>
          <button className={styles.slider_button_prev} onClick={slidePrev}>
            &#60;
          </button>
          <button className={styles.slider_button_next} onClick={slideNext}>
            &#62;
          </button>
        </div>
      </div>

      <div className={styles.slider_image_preview_wrapper}>
        <button className={styles.preview_button_prev} onClick={previewPrev}>
          &#60;
        </button>
        <button className={styles.preview_button_next} onClick={previewNext}>
          &#62;
        </button>
        <div
          className={styles.slider_image_preview}
          style={{ transform: `translateX(${translateNumber}px)` }}
        >
          {data &&
            data.map((item, index) => {
              const { id, thumbnailUrl } = item;
              return (
                <div key={id}>
                  <img
                    className={
                      sliderData?.id === id
                        ? styles.clicked
                        : styles.preview_img
                    }
                    src={thumbnailUrl}
                    alt="sliderImage"
                    onClick={() => {
                      onClick(index);
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
