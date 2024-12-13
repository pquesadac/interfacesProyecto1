import React, { useState, useRef, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native'
import { Movie } from '../config/entities/Movie'

interface Movies {
  movies: Movie[];
  height: number;
}

export default function Slider({ movies, height }: Movies) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = 200; 
  const imageMargin = 1; 

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.floor(contentOffsetX / (imageWidth + imageMargin * 2) / Math.floor(screenWidth / (imageWidth + imageMargin * 2)));
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage >= movies.length) {
      scrollViewRef.current?.scrollTo({ x: 0, animated: false });
      setCurrentPage(0);
    }
  }, [currentPage, movies]);

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.contenedor} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={imageWidth + imageMargin * 2}
        decelerationRate="fast"
      >
       
        {[...movies, ...movies].map((item, index) => (
          <Image 
            key={`${item.id}-${index}`}
            style={styles.imagen} 
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster}`,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contenedor: {
    height: 300,
  }, 
  imagen: {
    width: 200,
    height: 300,
    margin: 1
  }
});