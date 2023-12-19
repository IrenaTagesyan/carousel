import { Carousel } from "./Carousel";
import { useEffect, useRef, useState } from "react";
import { getImages } from "./utils";
import styles from "./mainPage.module.css";

export const ImageCarousel = () => {
  const [data, setData] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const [start, setStart] = useState();
  const intervalRef = useRef(null);

  const clearingInterval = () => {
    clearInterval(intervalRef.current);
    setStart(false);
  };

  const startInterval = () => {
    setStart(true);
  };

  const slideNext = () => {
    clearingInterval();
    const newIndex = sliderData.index + 1;
    const newSliderData = data[newIndex];
    setSliderData({ ...newSliderData, index: newIndex });
  };

  const slidePrev = () => {
    clearingInterval();
    if (sliderData.index === 0) {
      return;
    }
    const newIndex = sliderData.index - 1;
    const newSliderData = data[newIndex];
    setSliderData({ ...newSliderData, index: newIndex });
  };

  const handelClick = (index) => {
    clearingInterval();
    const newSliderData = data[index];
    setSliderData({ ...newSliderData, index });
  };

  const getData = async () => {
    try {
      const data = await getImages();
      const firstHundred = data.data.slice(0, 100);
      setData(firstHundred);
      setSliderData({ ...firstHundred[0], index: 0 });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!sliderData || start === false) {
      return;
    }

    intervalRef.current = setInterval(() => {
      const newIndex = ++sliderData.index;
      const newSliderData = data[newIndex];
      setSliderData({ ...newSliderData, index: newIndex });
    }, 1500);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, start]);

  return (
    <div className={styles.wrapper}>
      <Carousel
        data={data}
        onClick={handelClick}
        sliderData={sliderData}
        slideNext={slideNext}
        slidePrev={slidePrev}
      />
      <button className={styles.start_button} onClick={startInterval}>
        Start
      </button>
    </div>
  );
};
