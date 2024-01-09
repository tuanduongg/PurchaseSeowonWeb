import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { CardMedia } from '@mui/material';
import config from '../../../config';

const ImageSlide = ({ images }) => {
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images?.map((item, index) => (
          <SwiperSlide key={index}>
            <CardMedia component="img" image={config.apiImage + item?.url} sx={{ height: '350px', objectFit: 'contain' }} alt="Image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlide;
