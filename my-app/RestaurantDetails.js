import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RestaurantDetails = ({ navigation }) => {
  const checkScrollEnd = (e) => {
    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
    if (contentOffset.x + layoutMeasurement.width >= contentSize.width) {
      // Handle scroll end
    }
  };
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewScrollRef = useRef(null);

  const openDirections = () => {
    const mapsUrl = 'https://www.google.com/maps/place/TSB+Ramli+Burger/@1.5104654,103.7256118,17z/data=!3m1!4b1!4m6!3m5!1s0x31da739b04758fcf:0x8fd13f0ff3d51803!8m2!3d1.5104654!4d103.7281867!16s%2Fg%2F11t5b8spcz?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D';
    
    Linking.canOpenURL(mapsUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'Unable to open maps');
        } else {
          return Linking.openURL(mapsUrl);
        }
      })
      .catch((err) => {
        Alert.alert('Error', 'An error occurred while trying to open maps');
        console.error('An error occurred', err);
      });
  };
  
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Share via',
        message: 'Check out this amazing Ramly Burger Stall!\n\nTSB Ramli Burger\n2, 12-8, Jalan Sri Bahagia 10, Taman Sri Bahagia, 81200 Johor Bahru',
        url: 'https://example.com/warakuya',
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const makePhoneCall = () => {
    const phoneNumber = '+852 92622099';
    let phoneUrl;
    
    if (Platform.OS === 'android') {
      phoneUrl = `tel:${phoneNumber}`;
    } else {
      phoneUrl = `telprompt:${phoneNumber}`;
    }
    
    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'Phone calls are not supported on this device');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch(err => {
        console.error('An error occurred', err);
        Alert.alert('Error', 'Failed to make phone call');
      });
  };

  const socialPosts = [
    { 
      title: 'Great food!', 
      description: 'Delicious sauce, very fragrant and yummy!', 
      likes: 6, 
      comments: 6,
      image: 'https://placehold.co/250x250'
    },
    { 
      title: 'Very Yummy', 
      description: 'Filled my tummy and is very yummy too!', 
      likes: 8, 
      comments: 3,
      image: 'https://placehold.co/250x250'
    },
    { 
      title: 'Best burger EVER!', 
      description: 'Best burger I have ever tasted!', 
      likes: 10, 
      comments: 12,
      image: 'https://placehold.co/250x250'
    },
    { 
      title: 'Very yummy taste', 
      description: 'Extremely memorable delicious taste. Will visit again!', 
      likes: 15, 
      comments: 5,
      image: 'https://placehold.co/250x250'
    }
  ];

  const reviews = [
    {
      title: 'Brilliant Service!',
      rating: '★★★★★',
      text: 'I had an amazing time at this restaurant. The food was delicious, the service was great, and the atmosphere was simply perfect.',
      images: [
        'https://www.chompslurrpburp.com/wp-content/uploads/2023/03/KL-foodie.jpg',
        'https://www.chompslurrpburp.com/wp-content/uploads/2023/03/KL-foodie.jpg'
      ]
    },
    {
      title: 'Exceptional Dining Experience!',
      rating: '★★★★★',
      text: 'I had an amazing time at this restaurant. The food was delicious, the service was impeccable, and the atmosphere was simply perfect.',
      images: [
        'https://www.chompslurrpburp.com/wp-content/uploads/2023/03/KL-foodie.jpg',
        'https://www.chompslurrpburp.com/wp-content/uploads/2023/03/KL-foodie.jpg'
      ]
    },
    {
      title: 'Fantastic Service and Ambiance',
      rating: '★★★★☆',
      text: 'I was thoroughly impressed with this restaurant. The staff was friendly and attentive, and the overall ambiance was wonderful.',
      images: [
        'https://www.chompslurrpburp.com/wp-content/uploads/2023/03/KL-foodie.jpg',
        'https://www.chompslurrpburp.com/wp-content/uploads/2023/03/KL-foodie.jpg'
      ]
    }
  ];

  const handleReviewScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (width - 40));
    setCurrentReviewIndex(index);
  };

  const scrollToReview = (index) => {
    reviewScrollRef.current?.scrollTo({
      x: index * (width - 40),
      animated: true
    });
    setCurrentReviewIndex(index);
  };

  const buttons = [
    { 
      icon: 'https://static-00.iconduck.com/assets.00/call-icon-2047x2048-1v137evf.png', 
      width: 22, 
      alt: 'Call',
      onPress: makePhoneCall
    },
    { 
      icon: 'https://static.vecteezy.com/system/resources/previews/014/455/886/non_2x/share-icon-on-transparent-background-free-png.png', 
      width: 24, 
      alt: 'Share',
      onPress: handleShare
    },
    { 
      icon: 'https://cdn.iconscout.com/icon/free/png-256/free-directions-1782209-1512759.png?f=webp&w=256', 
      width: 32, 
      alt: 'Directions',
      onPress: openDirections 
    },
    { 
      icon: 'https://cdn.icon-icons.com/icons2/3912/PNG/512/grab_logo_icon_248153.png', 
      width: 44, 
      alt: 'Grab',
      onPress: () => {} 
    }
  ];

  // Random tags for restaurant features
  const randomTags = [
    'Street Food',
    'Ramly Burger',
    'Open Late',
  ];

  return (
    <ScrollView style={styles.body} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
          <Image 
            source={{uri: "https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png"}}
            style={{width: 80, height: 80}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Food')}>
          <Text style={styles.navLink}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={styles.navLink}>Search</Text>
        </TouchableOpacity>
        <Text style={styles.navLink}>About us</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.restaurantDetails}>
          <View style={styles.restaurantHeader}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Gallery')} 
              style={styles.restaurantImageContainer}
            >
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipOHg3XJP0-4ed_EkYzIn7Q-RhaHRZi4Fomhftbh=w408-h544-k-no' }}
                style={styles.restaurantImage}
              />
            </TouchableOpacity>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>TSB Ramli Burger</Text>
              <Text style={styles.cuisineType}>Street Food</Text>
              <Text style={styles.rating}>★★★★☆</Text> 
            </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            <View style={styles.buttonsRow}>
              {buttons.map((button, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.circleButton}
                  onPress={button.onPress}
                >
                  <Image 
                    source={{ uri: button.icon }}
                    style={{ 
                      width: button.width,
                      height: button.width,
                      resizeMode: 'contain'
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.reviewsHeader}>
        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 10 }}>Reviews</Text>
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate('RestaurantReviews')} // You'll need to create this screen
        >
          <Text style={styles.seeMoreText}>See more</Text>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' }}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
          
          <ScrollView 
            ref={reviewScrollRef}
            horizontal 
            style={styles.reviewGallery}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={handleReviewScroll}
          >
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>{review.title}</Text>
                <Text style={{ fontSize: 16, color: '#ffa500', marginBottom: 8 }}>{review.rating}</Text>
                <Text style={{ fontSize: 14, marginBottom: 15 }}>{review.text}</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {review.images.map((img, imgIndex) => (
                    <Image 
                      key={imgIndex}
                      source={{ uri: img }}
                      style={{ width: 120, height: 120, borderRadius: 6 }}
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.paginationDots}>
            {reviews.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentReviewIndex && styles.activeDot
                ]}
                onPress={() => scrollToReview(index)}
              />
            ))}
          </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('LeaveReview')}>
            <Text style={styles.leaveReview}>Leave a review</Text>
          </TouchableOpacity>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Image 
                source={{ uri: 'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202002/Maps_Pin_FullColor-x1000.png' }}
                style={{ width: 20, height: 20 }}
              />
              <Text>12-8, Jalan Sri Bahagia 10, Taman Sri Bahagia</Text>
            </View>
            <View style={styles.detailItem}>
              <Image 
                source={{ uri: 'https://www.iconpacks.net/icons/1/free-phone-icon-1-thumb.png' }}
                style={{ width: 16, height: 16 }}
              />
              <Text>(123) 456-7890</Text>
            </View>
            <View style={styles.detailItem}>
              <Image 
                source={{ uri: 'https://static.thenounproject.com/png/2683718-200.png' }}
                style={{ width: 16, height: 16 }}
              />
              <Text>Mon-Sun:9pm-11pm</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Featured by Creators</Text>
          <View style={styles.socialPostsContainer}>
            {socialPosts.map((post, index) => (
              <View key={index} style={styles.socialPostCard}>
                <Image 
                  source={{ uri: post.image }}
                  style={styles.socialPostImage}
                />
                <View style={styles.socialPostContent}>
                  <Text style={styles.socialPostTitle}>{post.title}</Text>
                  <Text style={styles.socialPostDescription}>{post.description}</Text>
                  <View style={styles.socialPostStats}>
                    <Text style={styles.statText}>{post.likes} Likes</Text>
                    <Text style={styles.statText}>{post.comments} Comments</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Random Tags Section */}
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsTitle}>Restaurant Tags</Text>
            <View style={styles.tagsWrapper}>
              {randomTags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    fontFamily: 'Montserrat',
    backgroundColor: '#fffff'
  },
  header: {
    backgroundColor: '#FCF7F3',
    padding: 20,
    alignItems: 'center'
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
  container: {
    flex: 1,
    width: width,
    paddingHorizontal: 0
  },
  restaurantDetails: {
    backgroundColor: 'white',
    padding: 15
  },
  restaurantHeader: {
    alignItems: 'center',
    marginBottom: 15
  },
  restaurantImageContainer: {
    width: width,
    height: 250,
    marginBottom: 15
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
  restaurantInfo: {
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  restaurantName: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center'
  },
  cuisineType: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    textAlign: 'center'
  },
  rating: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 10,
    textAlign: 'center'
  },
  actionButtonsContainer: {
    paddingVertical: 15,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%'
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 20
  },
  circleButton: {
    backgroundColor: '#f2f2f2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 5
  },
  arrowIcon: {
    width: 16,
    height: 16
  },
  reviewGallery: {
    flexDirection: 'row',
    overflow: 'scroll',
    marginBottom: 10,
    paddingLeft: 10
  },
  reviewCard: {
    width: width - 40,
    padding: 15,
    backgroundColor: '#FCF7F3',
    borderRadius: 8,
    marginRight: 15
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5
  },
  activeDot: {
    backgroundColor: '#FF6B6B',
    width: 12
  },
  details: {
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 10
  },
  socialPostsContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20
  },
  socialPostCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: width - 40,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  socialPostImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover'
  },
  socialPostContent: {
    padding: 15,
    alignItems: 'center'
  },
  socialPostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  socialPostDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center'
  },
  socialPostStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20
  },
  statText: {
    fontSize: 12,
    color: '#888'
  },
  leaveReview: {
    color: 'black',
    textDecorationLine: 'none',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center'
  },
  tagsContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 1
  },
  tagsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333'
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10
  },
  tag: {
    backgroundColor: '#FCF7F3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  tagText: {
    fontSize: 12,
    color: '#333'
  },

});

export default RestaurantDetails;
