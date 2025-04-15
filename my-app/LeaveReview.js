import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Animated,
  Easing,
  ImageBackground,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const StarRating = ({ rating, setRating, size = 30, activeColor = '#FFD700', inactiveColor = '#D3D3D3' }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const animateStar = (starIndex) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.3,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start(() => setRating(starIndex));
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 5 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity 
          key={star} 
          onPress={() => animateStar(star)}
          activeOpacity={0.7}
        >
          <Animated.Text 
            style={{
              fontSize: size,
              color: star <= rating ? activeColor : inactiveColor,
              textShadowColor: star <= rating ? 'rgba(255, 215, 0, 0.5)' : 'transparent',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
              marginHorizontal: 5,
              transform: [{ scale: star === rating ? scaleValue : 1 }]
            }}
          >★</Animated.Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// App starts here...
const LeaveReview = ({ navigation }) => {
  const [overallRating, setOverallRating] = useState(0);
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [atmosphereRating, setAtmosphereRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showAspectRatings, setShowAspectRatings] = useState(false);
  const [images, setImages] = useState([]);
  const [imageCaptions, setImageCaptions] = useState({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleOverallRating = (rating) => {
    setOverallRating(rating);
    setShowAspectRatings(true);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        const newImages = result.assets.map(asset => asset.uri);
        setImages([...images, ...newImages]);
        
        // Initialize empty captions for new images
        const newCaptions = {...imageCaptions};
        newImages.forEach(uri => {
          if (!newCaptions[uri]) {
            newCaptions[uri] = '';
          }
        });
        setImageCaptions(newCaptions);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const removedUri = newImages[index];
    newImages.splice(index, 1);
    setImages(newImages);
    
    // Remove the caption for the deleted image
    const newCaptions = {...imageCaptions};
    delete newCaptions[removedUri];
    setImageCaptions(newCaptions);
  };

  const handleCaptionChange = (uri, text) => {
    setImageCaptions({
      ...imageCaptions,
      [uri]: text
    });
  };

  const handleSubmit = () => {
    if (overallRating === 0) {
      Alert.alert('Rating Required', 'Please provide an overall rating before submitting');
      return;
    }

    const reviewData = {
      overallRating,
      foodRating,
      serviceRating,
      atmosphereRating,
      reviewText,
      images: images.map(uri => ({
        uri,
        caption: imageCaptions[uri] || ''
      }))
    };

    console.log('Review submitted:', reviewData);
    
    Alert.alert(
      'Thank You!',
      'Your review has been submitted successfully!',
      [
        { 
          text: 'OK', 
          onPress: () => {
            setOverallRating(0);
            setFoodRating(0);
            setServiceRating(0);
            setAtmosphereRating(0);
            setReviewText('');
            setShowAspectRatings(false);
            setImages([]);
            setImageCaptions({});
          }
        }
      ]
    );
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
          <Image 
            source={{uri: "https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png"}}
            style={{width: 80, height: 80}}
          />
        </TouchableOpacity>
      </View>
      
      {/* Navigation */}
      <View style={styles.nav}>
        <Text style={styles.navLink}>
        Food
        </Text>
        <Text style={styles.navLink}>Search</Text>
        <Text style={styles.navLink}>About us</Text>
      </View>

      <TouchableOpacity 
        style={styles.backLink} 
        onPress={() => navigation.goBack()}
      >
        <Text>Back to Restaurant</Text>
      </TouchableOpacity>

      {/* Review Form Section */}
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewHeader}>Leave a review</Text>
        
        <View style={styles.form}>
          {/* Overall Rating */}
          <View style={styles.ratingSection}>
            <Text style={styles.label}>Overall Rating</Text>
            <StarRating 
              rating={overallRating} 
              setRating={handleOverallRating} 
              size={45}
            />
          </View>

          {/* Aspect Ratings (appears after overall rating) */}
          {showAspectRatings && (
            <View style={styles.aspectRatingsContainer}>
              <View style={styles.aspectRating}>
                <Text style={styles.subLabel}>Food</Text>
                <StarRating 
                  rating={foodRating} 
                  setRating={setFoodRating} 
                  size={35}
                />
              </View>

              <View style={styles.aspectRating}>
                <Text style={styles.subLabel}>Service</Text>
                <StarRating 
                  rating={serviceRating} 
                  setRating={setServiceRating} 
                  size={35}
                />
              </View>

              <View style={styles.aspectRating}>
                <Text style={styles.subLabel}>Atmosphere</Text>
                <StarRating 
                  rating={atmosphereRating} 
                  setRating={setAtmosphereRating} 
                  size={35}
                />
              </View>
            </View>
          )}

          {/* Review Text Input */}
          <View style={styles.reviewInputContainer}>
            <Text style={styles.label}>Your Review</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={6}
              placeholder="Share your experience..."
              placeholderTextColor="#999"
              value={reviewText}
              onChangeText={setReviewText}
            />
          </View>

          {/* Image Upload Section */}
          <View style={styles.imageUploadContainer}>
            <Text style={styles.label}>Add images (optional)</Text>
            
            {/* Display uploaded images */}
            {images.length > 0 && (
              <View>
                <View style={styles.imagePreviewContainer}>
                  {images.map((imageUri, index) => (
                    <View key={index} style={styles.imageWithCaptionContainer}>
                      <View style={styles.imagePreviewWrapper}>
                        <ImageBackground 
                          source={{ uri: imageUri }} 
                          style={styles.imagePreview}
                          resizeMode="cover"
                        >
                          <TouchableOpacity 
                            style={styles.removeImageButton}
                            onPress={() => handleRemoveImage(index)}
                          >
                            <Text style={styles.removeImageButtonText}>×</Text>
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    </View>
                  ))}
                </View>
                
                {/* Image Captions Section - Only shows when there are images */}
                {images.length > 0 && (
                  <View style={styles.captionsContainer}>
                    <Text style={styles.captionLabel}>Image captions</Text>
                    {images.map((imageUri, index) => (
                      <TextInput
                        key={`caption-${index}`}
                        style={styles.captionInput}
                        placeholder={`Caption for image ${index + 1}...`}
                        value={imageCaptions[imageUri] || ''}
                        onChangeText={(text) => handleCaptionChange(imageUri, text)}
                        multiline
                      />
                    ))}
                  </View>
                )}
              </View>
            )}
            
            {/* Add Image Button */}
            <TouchableOpacity 
              style={styles.addImageButton}
              onPress={pickImage}
            >
              <View style={styles.dottedBorder}>
                <Text style={styles.addImageText}>Add images here...</Text>
                <Text style={styles.plusSign}>+</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.imageNote}>You can select multiple photos</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton,
              overallRating > 0 && styles.submitButtonActive
            ]} 
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fffff'
  },
  header: {
    backgroundColor: '#FCF7F3',
    padding: 20,
    alignItems: 'center'
  },
  logo: {
    width: 80, 
    height: 80
  },
  nav: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  navLink: {
    color: '#333',
    textDecorationLine: 'none',
    marginHorizontal: 8,
    marginVertical: 5,
    fontSize: 14
  },
  reviewContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  reviewHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  form: {
    width: '100%',
  },
  ratingSection: {
    marginBottom: 25,
    alignItems: 'center',
  },
  aspectRatingsContainer: {
    marginBottom: 20,
  },
  aspectRating: {
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  subLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
  reviewInputContainer: {
    marginBottom: 25,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    padding: 15,
    minHeight: 150,
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
    fontSize: 16,
    color: '#333',
  },
  imageUploadContainer: {
    marginBottom: 25,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  imageWithCaptionContainer: {
    width: '100%',
    marginBottom: 15,
  },
  imagePreviewWrapper: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
    position: 'relative',
  },
  imagePreview: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  captionsContainer: {
    marginTop: 10,
  },
  captionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FAFAFA',
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    marginBottom: 10,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  addImageButton: {
    marginTop: 10,
  },
  dottedBorder: {
    borderWidth: 2,
    borderColor: '#D3D3D3',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FAFAFA',
  },
  addImageText: {
    color: '#888',
    fontSize: 16,
    marginBottom: 8,
  },
  plusSign: {
    color: '#888',
    fontSize: 32,
    fontWeight: '200',
  },
  imageNote: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#DDD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonActive: {
    backgroundColor: '#333',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    padding: 15,
    paddingLeft: 20
  }
});

export default LeaveReview;
