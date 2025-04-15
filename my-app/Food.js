import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  FlatList,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Restaurant data
const restaurants = {
  mustEats: [
    {
      id: '1',
      name: 'The Golden Fork',
      cuisine: 'Fine Dining',
      rating: 4.8,
      deliveryTime: '30-45 min',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      location: 'Sutera Utama',
      cuisineType: 'Western',
      restaurantType: ['Halal', 'Cafe'],
    },
    {
      id: '2',
      name: 'Burger Palace',
      cuisine: 'American',
      rating: 4.5,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      location: 'Mount Austin',
      cuisineType: 'Western',
      restaurantType: ['Halal', 'Pub'],
    },
    {
      id: '3',
      name: 'Sushi World',
      cuisine: 'Japanese',
      rating: 4.7,
      deliveryTime: '25-40 min',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
      location: 'Pelangi',
      cuisineType: 'Japanese/Korean',
      restaurantType: ['Seafood', 'Hotpot'],
    },
  ],
  superDeals: [
    {
      id: '4',
      name: 'Taco Fiesta',
      cuisine: 'Mexican',
      rating: 4.3,
      deliveryTime: '15-25 min',
      deal: '50% OFF',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
      location: 'Austin',
      cuisineType: 'Others',
      restaurantType: ['Street food', 'Local'],
    },
    {
      id: '5',
      name: 'Pizza Planet',
      cuisine: 'Italian',
      rating: 4.4,
      deliveryTime: '20-30 min',
      deal: 'Buy 1 Get 1 Free',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      location: 'Permas Jaya',
      cuisineType: 'Western',
      restaurantType: ['Halal', 'Vegetarian'],
    },
  ],
  recommended: [
    {
      id: '6',
      name: 'Green Leaf',
      cuisine: 'Vegetarian',
      rating: 4.6,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      location: 'Eco Botanic',
      cuisineType: 'Others',
      restaurantType: ['Vegan', 'Vegetarian'],
    },
    {
      id: '7',
      name: 'Steak Master',
      cuisine: 'American',
      rating: 4.7,
      deliveryTime: '30-45 min',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      location: 'Sutera Utama',
      cuisineType: 'Western',
      restaurantType: ['Halal', 'Pub'],
    },
  ],
  streetFood: [
    {
      id: '8',
      name: 'Night Market Stalls',
      cuisine: 'Local Delights',
      rating: 4.2,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
      location: 'Johor Jaya',
      cuisineType: 'Local',
      restaurantType: ['Street food', 'Halal'],
    },
    {
      id: '9',
      name: 'Satay King',
      cuisine: 'Malay Cuisine',
      rating: 4.4,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246',
      location: 'Tampoi',
      cuisineType: 'Local',
      restaurantType: ['Street food', 'Halal'],
    },
  ],
  dessert: [
    {
      id: '10',
      name: 'Ice Cream Dream',
      cuisine: 'Desserts',
      rating: 4.6,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f',
      location: 'Eco Botanic',
      cuisineType: 'Dessert',
      restaurantType: ['Dessert', 'Vegetarian'],
    },
    {
      id: '11',
      name: 'Chocolate Heaven',
      cuisine: 'Dessert Cafe',
      rating: 4.5,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
      location: 'Sutera Utama',
      cuisineType: 'Dessert',
      restaurantType: ['Dessert', 'Cafe'],
    },
  ],
};

const Tag = ({ text }) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
};

const RestaurantCard = ({ restaurant, category }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: restaurant.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.cuisineType}>{restaurant.cuisine}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{restaurant.rating}</Text>
          <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
        </View>
        
        <View style={styles.tagContainer}>
          <Tag text={restaurant.location} />
        </View>
        
        <View style={styles.tagRow}>
          <Tag text={restaurant.cuisineType} />
          {restaurant.restaurantType.map((type, index) => (
            <Tag key={index} text={type} />
          ))}
        </View>
        
        {category === 'superDeals' && restaurant.deal && (
          <View style={styles.dealBadge}>
            <Text style={styles.dealText}>{restaurant.deal}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const PaginationDots = ({ data, scrollX, carouselWidth }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * carouselWidth,
          index * carouselWidth,
          (index + 1) * carouselWidth,
        ];
        
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: 'clamp',
        });
        
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.paginationDot,
              { width: dotWidth, opacity },
            ]}
          />
        );
      })}
    </View>
  );
};

const RestaurantCarousel = ({ title, data, category, onSeeMore }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);
  const carouselWidth = width * 0.8;
  
  return (
    <View style={styles.carouselContainer}>
      <View style={styles.carouselHeader}>
        <Text style={styles.carouselTitle}>{title}</Text>
        <TouchableOpacity 
          style={styles.seeMoreButton} 
          onPress={() => onSeeMore(category)}
        >
          <Text style={styles.seeMoreText}>See more</Text>
          <Ionicons name="chevron-forward" size={16} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={carouselRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard restaurant={item} category={category} />
        )}
        contentContainerStyle={styles.carouselContent}
        snapToInterval={carouselWidth}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      <PaginationDots 
        data={data} 
        scrollX={scrollX} 
        carouselWidth={carouselWidth} 
      />
    </View>
  );
};

const Food = ( { navigation }) => {
  const handleSeeMore = (category) => {
    console.log(`See more clicked for ${category}`);
    // Add your navigation logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image 
          source={{uri: "https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png"}}
          style={{width: 80, height: 80}}
        />
      </View>
      
      <View style={styles.nav}>
        <Text style={styles.navLink}>Food</Text>
        <Text style={styles.navLink}>Search</Text>
        <Text style={styles.navLink}>About us</Text>
      </View>

      <View style={styles.contentContainer}>
        <RestaurantCarousel
          title="Must Eats"
          data={restaurants.mustEats}
          category="mustEats"
          onSeeMore={handleSeeMore}
        />

        <RestaurantCarousel
          title="Super Deals"
          data={restaurants.superDeals}
          category="superDeals"
          onSeeMore={handleSeeMore}
        />

        <RestaurantCarousel
          title="Recommended For You"
          data={restaurants.recommended}
          category="recommended"
          onSeeMore={handleSeeMore}
        />

        <RestaurantCarousel
          title="Street Food"
          data={restaurants.streetFood}
          category="streetFood"
          onSeeMore={handleSeeMore}
        />

        <RestaurantCarousel
          title="Dessert"
          data={restaurants.dessert}
          category="dessert"
          onSeeMore={handleSeeMore}
        />
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
  contentContainer: {
    paddingBottom: 20,
  },
  carouselContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  carouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#ff6b6b',
    marginRight: 4,
    fontWeight: '500',
  },
  carouselContent: {
    paddingHorizontal: 8,
  },
  card: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cuisineType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rating: {
    color: '#ffaa00',
    fontWeight: 'bold',
  },
  deliveryTime: {
    color: '#666',
  },
  tagContainer: {
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 10,
    color: '#555',
  },
  dealBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff4757',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  dealText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
});

export default Food;
