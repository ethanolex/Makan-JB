import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const RestaurantReviews = ({ navigation, route }) => {
  // Initial reviews
  const initialReviews = [
    {
      id: 1,
      title: "Exceptional Dining Experience!",
      rating: 4,
      text: "Great atmosphere and delicious food! The service was attentive, making the dining experience enjoyable."
    },
    {
      id: 2,
      title: "Fantastic Service and Ambiance",
      rating: 5,
      text: "Wonderful service and a fantastic dessert selection. I highly recommend the chocolate lava cake!"
    },
    {
      id: 3,
      title: "Delicious and Innovative Cuisine",
      rating: 3,
      text: "Unique dishes and a cozy setting. A nice place to try something different, though the service was a bit slow."
    },
    {
      id: 4,
      title: "Restaurant D",
      rating: 4,
      text: "Excellent seafood dishes! The grilled salmon was cooked to perfection, and the staff was friendly."
    },
    {
      id: 5,
      title: "Restaurant E",
      rating: 4,
      text: "A great spot for brunch. The pancakes were fluffy and delicious, and the coffee was top-notch!"
    }
  ];

  const [reviews, setReviews] = useState(initialReviews);

  // Check for new review from navigation params
  useEffect(() => {
    if (route.params?.newReview) {
      setReviews([route.params.newReview, ...reviews]);
    }
  }, [route.params?.newReview]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
          <Image 
            source={{uri: "https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png"}}
            style={{width: 80, height: 80}}
          />
        </TouchableOpacity>
      </View>

      {/* Navigation */}
      <View style={styles.navContainer}>
        <View style={styles.navContent}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>About Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.leaveReviewButton}
        onPress={() => navigation.navigate('LeaveReview')}
      >
        <Text style={styles.leaveReviewButtonText}>Leave a review</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.restaurantTitle}>Warakuya Japanese Garden</Text>
        
        {/* Rating Container */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingGrid}>
            <View style={styles.averageRatingContainer}>
              <Text style={styles.averageRating}>4.6</Text>
              <Text style={styles.reviewCount}>{reviews.length}+ reviews</Text>
            </View>
            
            <View style={styles.starsContainer}>
              {/* 5 Star */}
              <View style={styles.starRow}>
                <Text style={styles.starLabel}>5</Text>
                <View style={styles.bar}>
                  <View style={[styles.filled, { width: '90%' }]} />
                </View>
              </View>
              
              {/* 4 Star */}
              <View style={styles.starRow}>
                <Text style={styles.starLabel}>4</Text>
                <View style={styles.bar}>
                  <View style={[styles.filled, { width: '70%' }]} />
                </View>
              </View>
              
              {/* 3 Star */}
              <View style={styles.starRow}>
                <Text style={styles.starLabel}>3</Text>
                <View style={styles.bar}>
                  <View style={[styles.filled, { width: '40%' }]} />
                </View>
              </View>
              
              {/* 2 Star */}
              <View style={styles.starRow}>
                <Text style={styles.starLabel}>2</Text>
                <View style={styles.bar}>
                  <View style={[styles.filled, { width: '20%' }]} />
                </View>
              </View>
              
              {/* 1 Star */}
              <View style={styles.starRow}>
                <Text style={styles.starLabel}>1</Text>
                <View style={styles.bar}>
                  <View style={[styles.filled, { width: '10%' }]} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Review Cards */}
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Text style={styles.reviewTitle}>{review.title}</Text>
            <Text style={styles.reviewRating}>Rating: {renderStars(review.rating)}</Text>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#FCF7F3',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 154,
    height: 154,
  },
  navContainer: {
    backgroundColor: '#f2f2f2',
    height: 50,
    justifyContent: 'center',
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    marginHorizontal: 15,
  },
  navText: {
    color: '#333',
    fontSize: 16,
  },
  mainContent: {
    padding: 20,
  },
  restaurantTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ratingContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
  },
  ratingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  averageRatingContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  averageRating: {
    fontSize: 65,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  reviewCount: {
    color: '#666',
    fontSize: 16,
  },
  starsContainer: {
    flex: 1,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  starLabel: {
    width: 30,
    fontSize: 18,
  },
  bar: {
    flex: 1,
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginLeft: 10,
    overflow: 'hidden',
  },
  filled: {
    backgroundColor: '#4CAF50',
    height: '100%',
    borderRadius: 10,
  },
  reviewCard: {
    backgroundColor: '#FCF7F3',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewRating: {
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 10,
  },
  reviewText: {
    color: '#333',
    fontSize: 16,
  },
  leaveReviewButton: {
    backgroundColor: '#FCF7F3',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  leaveReviewButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default RestaurantReviews;
