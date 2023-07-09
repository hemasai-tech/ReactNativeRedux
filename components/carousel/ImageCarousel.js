import React, {useRef, useEffect} from 'react';
import {View, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const ImageCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    startCarousel();
  }, []);

  const startCarousel = () => {
    carouselRef.current.startAutoplay();
  };

  const images = [
    {id: 1, source: require('../../assets/image1.jpg')},
    {id: 2, source: require('../../assets/image2.jpg')},
    {id: 3, source: require('../../assets/image3.jpg')},
  ];

  const renderItem = ({item}) => (
    <View>
      <Image
        source={item.source}
        style={{width: '100%', height: 250}}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View>
      <Carousel
        layout = {'default'}
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
        autoplay={true}
        autoplayInterval={3000}
      />
    </View>
  );
};

export default ImageCarousel;