import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { CardMedia } from '@mui/material';
import config from '../../../config';
import NoImage from '../../../assets/images/product/no-image.png';

const ImageSlide = ({ images, onClickImage }) => {
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
        {images?.length > 0 ? (
          images?.map((item, index) => (
            <SwiperSlide key={index}>
              <CardMedia
                onClick={() => {
                  onClickImage(index);
                }}
                component="img"
                image={config.apiImage + item?.url}
                sx={{ height: '350px', objectFit: 'contain' }}
                alt="Image"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <CardMedia component="img" image={NoImage} sx={{ height: '350px', objectFit: 'contain' }} alt="Image" />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default ImageSlide;
