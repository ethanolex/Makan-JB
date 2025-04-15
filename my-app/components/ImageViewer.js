import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, PanResponder } from 'react-native';

const ImageViewer = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const [isZoomed, setIsZoomed] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (isZoomed) {
        translateX.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (!isZoomed) {
        if (gestureState.dx < -50 && currentIndex < images.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else if (gestureState.dx > 50 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true
        }).start();
      }
    }
  });

  const handleZoom = () => {
    if (isZoomed) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 2,
        useNativeDriver: true
      }).start();
    }
    setIsZoomed(!isZoomed);
  };

  return (
    <View style={styles.imageViewerContainer}>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={onClose}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              { scale },
              { translateX }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={handleZoom}
        >
          <Image
            source={{ uri: images[currentIndex] }}
            style={styles.fullSizeImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageViewerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1
  },
  closeButtonText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '100%',
    height: '80%'
  },
  fullSizeImage: {
    width: '100%',
    height: '100%'
  },
  pagination: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    margin: 5
  },
  paginationDotActive: {
    backgroundColor: 'white'
  }
});

export default ImageViewer;
