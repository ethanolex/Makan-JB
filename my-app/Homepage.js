import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

// Defining variables and functions...
const GRID_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = SCREEN_WIDTH / GRID_COLUMNS;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

// Calculate rows needed for 12 items (4 rows)
const VISIBLE_ROWS = 4; // Force 4 rows to show all 12 items
const ITEMS_PER_PAGE = VISIBLE_ROWS * GRID_COLUMNS;

// Custom Gallery Component for different icons
const IconGallery = ({ onClose, item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  // Content for all 12 icons
  const contentMap = {
    'Durian': {
      title: "Premium Durian Stalls",
      description: "Discover the best durian varieties in Malaysia",
      images: [
        "https://img.freepik.com/free-photo/close-up-durian-fruit_141793-2720.jpg",
        "https://img.freepik.com/free-photo/delicious-durian-slices-wooden-table_1150-26586.jpg"
      ],
      details: {
        "Season": "June - August",
        "Price Range": "RM20 - RM100/kg",
        "Popular Varieties": ["Musang King", "D24", "XO"],
        "Best Locations": ["SS2", "Batu Ferringhi", "Raub"]
      }
    },
    'Ramly Burger': {
      title: "Authentic Ramly Burgers",
      description: "Malaysia's famous street burger since 1979",
      images: [
        "https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger_90220-1190.jpg",
        "https://img.freepik.com/free-photo/front-view-burger-stand_141793-15542.jpg"
      ],
      details: {
        "Price": "RM5 - RM15",
        "Signature": "Special sauce and egg wrap",
        "Availability": "Night markets and roadside stalls"
      }
    },
    'Pharmacy': {
      title: "24-Hour Pharmacies",
      description: "Find emergency medical supplies near you",
      images: [
        "https://img.freepik.com/free-photo/pharmacy-interior-with-medicines-shelves_23-2149217002.jpg",
        "https://img.freepik.com/free-photo/pharmacist-showing-medicine-bottle-patient_23-2149217005.jpg"
      ],
      details: {
        "Services": ["Prescription", "OTC Medicine", "Health Consultation"],
        "Popular Chains": ["Guardian", "Watson", "Caring"],
        "Operating Hours": "24/7 available"
      }
    },
    'Nail Manicure': {
      title: "Nail Salons & Spas",
      description: "Premium nail care and pampering services",
      images: [
        "https://img.freepik.com/free-photo/woman-getting-her-nails-done-nail-salon_23-2149026980.jpg",
        "https://img.freepik.com/free-photo/close-up-woman-getting-manicure_23-2149026983.jpg"
      ],
      details: {
        "Services": ["Manicure", "Pedicure", "Nail Art", "Gel Polish"],
        "Price Range": "RM30 - RM150",
        "Duration": "30-90 minutes"
      }
    },
    'Massage': {
      title: "Therapeutic Massage Centers",
      description: "Relaxation and wellness treatments",
      images: [
        "https://img.freepik.com/free-photo/massage-therapy-spa_1150-18976.jpg",
        "https://img.freepik.com/free-photo/woman-receiving-back-massage_23-2148872445.jpg"
      ],
      details: {
        "Types": ["Thai", "Swedish", "Aromatherapy", "Sports"],
        "Benefits": ["Stress relief", "Pain reduction", "Improved circulation"],
        "Duration": "60-120 minutes"
      }
    },
    'Seafood': {
      title: "Fresh Seafood Restaurants",
      description: "Ocean-to-table dining experience",
      images: [
        "https://img.freepik.com/free-photo/seafood-platter-with-lobster-shrimp-mussels_23-2148625430.jpg",
        "https://img.freepik.com/free-photo/grilled-fish-with-vegetables_23-2148625427.jpg"
      ],
      details: {
        "Specialties": ["Chilli Crab", "Butter Prawns", "Steamed Fish"],
        "Price Range": "RM30 - RM200",
        "Best Locations": ["Port Klang", "Kuala Selangor", "Penang"]
      }
    },
    'Grocery Shopping': {
      title: "Supermarkets & Grocers",
      description: "Everything for your daily needs",
      images: [
        "https://img.freepik.com/free-photo/supermarket-shelves-with-various-products_23-2148887680.jpg",
        "https://img.freepik.com/free-photo/fresh-vegetables-supermarket_23-2148887677.jpg"
      ],
      details: {
        "Chains": ["Tesco", "Giant", "AEON", "NSK"],
        "Opening Hours": "8AM - 10PM",
        "Specialties": ["Local produce", "Imported goods", "Halal certified"]
      }
    },
    'Salon': {
      title: "Hair & Beauty Salons",
      description: "Professional styling and treatments",
      images: [
        "https://img.freepik.com/free-photo/hair-salon-interior_23-2148102999.jpg",
        "https://img.freepik.com/free-photo/woman-getting-her-hair-cut-hairdresser_23-2148103002.jpg"
      ],
      details: {
        "Services": ["Haircut", "Coloring", "Treatment", "Styling"],
        "Price Range": "RM30 - RM300",
        "Popular Chains": ["Jean Yip", "Regis", "Toni&Guy"]
      }
    },
    'Fun': {
      title: "Entertainment & Leisure",
      description: "Exciting activities and attractions",
      images: [
        "https://img.freepik.com/free-photo/people-enjoying-theme-park_23-2149096799.jpg",
        "https://img.freepik.com/free-photo/kids-playing-arcade-games_23-2149096802.jpg"
      ],
      details: {
        "Options": ["Theme Parks", "Arcades", "Escape Rooms", "KTV"],
        "Popular Venues": ["Sunway Lagoon", "ESCAPE Penang", "TopGolf"]
      }
    },
    'Dental': {
      title: "Dental Clinics",
      description: "Complete oral healthcare services",
      images: [
        "https://img.freepik.com/free-photo/dentist-patient_23-2149217008.jpg",
        "https://img.freepik.com/free-photo/dental-check-up_23-2149217011.jpg"
      ],
      details: {
        "Services": ["Cleaning", "Whitening", "Braces", "Implants"],
        "Price Range": "RM50 - RM5000",
        "Insurance": "Most major providers accepted"
      }
    },
    'Hotel': {
      title: "Hotels & Accommodations",
      description: "Comfortable stays for every budget",
      images: [
        "https://img.freepik.com/free-photo/luxury-hotel-room_23-2149096796.jpg",
        "https://img.freepik.com/free-photo/hotel-lobby_23-2149096793.jpg"
      ],
      details: {
        "Types": ["Budget", "Boutique", "Luxury", "Resorts"],
        "Price Range": "RM80 - RM2000/night",
        "Amenities": ["Pool", "Gym", "Breakfast", "WiFi"]
      }
    },
    'Delivery': {
      title: "Food Delivery Services",
      description: "Meals delivered to your doorstep",
      images: [
        "https://img.freepik.com/free-photo/delivery-man-holding-food-container_23-2148887683.jpg",
        "https://img.freepik.com/free-photo/hands-holding-take-away-food_23-2148887686.jpg"
      ],
      details: {
        "Platforms": ["GrabFood", "FoodPanda", "AirAsia Food"],
        "Delivery Time": "30-60 minutes",
        "Fees": "RM3 - RM8 per order"
      }
    }
  };

  const content = contentMap[item.label] || {
    title: `${item.label} Information`,
    description: `Explore the best ${item.label} options in Malaysia`,
    images: [
      "https://via.placeholder.com/500x300?text=Image+1",
      "https://via.placeholder.com/500x300?text=Image+2"
    ],
    details: {
      "Info": "Coming soon",
      "Features": ["Premium quality", "Affordable prices"]
    }
  };

  const OpenModal = (src) => {
    setModalSrc(src);
    setModalOpen(true);
  };

  const CloseModal = () => {
    setModalOpen(false);
  };

  const HandleBackdropClick = (e) => {
    CloseModal();
  };

  return (
    <ScrollView style={styles.galleryBody}>
      <View style={styles.galleryHeader}>
        <TouchableOpacity onPress={onClose}>
          <Image 
            source={{uri: "https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png"}}
            style={{width: 154, height: 154}}
          />
        </TouchableOpacity>
      </View>
      
      {/* Scrollable Navigation Bar */}
      <View style={styles.galleryNavContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryNavContent}
        >
          {['Food', 'Shopping', 'Massage', 'Fun', 'Salon/Nail', 'Hotel', 'Delivery', 'Health', 'Services'].map((navItem) => (
            <TouchableOpacity key={navItem} style={styles.galleryNavLinkContainer}>
              <Text style={styles.galleryNavLink}>{navItem}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <TouchableOpacity style={styles.galleryBackLink} onPress={onClose}>
        <Text>Back</Text>
      </TouchableOpacity>

      <View style={styles.galleryContainer}>
        <Text style={styles.galleryTitle}>{content.title}</Text>
        <Text style={styles.galleryDescription}>{content.description}</Text>
        
        <View style={styles.detailsContainer}>
          {Object.entries(content.details).map(([key, value]) => (
            Array.isArray(value) ? (
              <View key={key}>
                <Text style={styles.detailTitle}>{key}:</Text>
                {value.map((item, i) => (
                  <Text key={i} style={styles.detailText}>• {item}</Text>
                ))}
              </View>
            ) : (
              <View key={key}>
                <Text style={styles.detailTitle}>{key}: <Text style={styles.detailText}>{value}</Text></Text>
              </View>
            )
          ))}
        </View>

        <View style={styles.galleryGrid}>
          {content.images.map((src, index) => (
            <TouchableOpacity key={index} onPress={() => OpenModal(src)}>
              <Image
                source={{uri: src}}
                style={styles.galleryImage}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
        visible={modalOpen}
        transparent={true}
        onRequestClose={CloseModal}
      >
        <TouchableOpacity 
          style={styles.galleryModal} 
          activeOpacity={1}
          onPress={HandleBackdropClick}
        >
          <TouchableOpacity style={styles.galleryClose} onPress={CloseModal}>
            <Text style={{color: 'white', fontSize: 30}}>×</Text>
          </TouchableOpacity>
          <Image 
            source={{uri: modalSrc}}
            style={styles.galleryModalImage}
          />
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};
// Actual app starts here...
const Homepage = ({ navigation }) => {
  const allItems = [
    {
      id: '1',
      icon: 'https://cdn-icons-png.flaticon.com/512/4899/4899162.png',
      label: 'Durian',
    },
    {
      id: '2',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPFzvQj0hAYphYrCYFz26bFaOpNvOUAQcRw&s',
      label: 'Ramly Burger',
    },
    {
      id: '3',
      icon: 'https://cdn-icons-png.flaticon.com/512/1596/1596389.png',
      label: 'Pharmacy',
    },
    {
      id: '4',
      icon: 'https://cdn-icons-png.flaticon.com/512/14018/14018852.png',
      label: 'Nail Manicure',
    },
    {
      id: '5',
      icon: 'https://cdn-icons-png.flaticon.com/512/1986/1986244.png',
      label: 'Massage',
    },
    {
      id: '6',
      icon: 'https://cdn-icons-png.flaticon.com/512/3082/3082055.png',
      label: 'Seafood',
    },
    {
      id: '7',
      icon: 'https://cdn-icons-png.flaticon.com/512/3082/3082011.png',
      label: 'Grocery Shopping',
    },
    {
      id: '8',
      icon: 'https://cdn-icons-png.flaticon.com/512/452/452705.png',
      label: 'Salon',
    },
    {
      id: '9',
      icon: 'https://cdn-icons-png.flaticon.com/512/12193/12193825.png',
      label: 'Fun',
    },
    {
      id: '10',
      icon: 'https://cdn-icons-png.flaticon.com/512/2641/2641391.png',
      label: 'Dental',
    },
    {
      id: '11',
      icon: 'https://cdn-icons-png.flaticon.com/512/2038/2038263.png',
      label: 'Hotel',
    },
    {
      id: '12',
      icon: 'https://cdn-icons-png.flaticon.com/512/9126/9126605.png',
      label: 'Delivery',
    }
  ];

  const [items, setItems] = useState(allItems);
  const [draggedIndex, setDraggedIndex] = useState(-1);
  const [currentItem, setCurrentItem] = useState(null);
  const pan = useRef(new Animated.ValueXY()).current;
  const containerRef = useRef();

  const handleIconPress = (item) => {
    setCurrentItem(item);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      containerRef.current.measure((x, y, width, height, pageX, pageY) => {
        const touchX = evt.nativeEvent.pageX - pageX;
        const touchY = evt.nativeEvent.pageY - pageY;
        
        const col = Math.floor(touchX / ITEM_WIDTH);
        const row = Math.floor(touchY / ITEM_HEIGHT);
        const index = row * GRID_COLUMNS + col;
        
        if (index >= 0 && index < items.length) {
          setDraggedIndex(index);
          pan.setValue({
            x: touchX - (col * ITEM_WIDTH) - (ITEM_WIDTH / 2),
            y: touchY - (row * ITEM_HEIGHT) - (ITEM_HEIGHT / 2)
          });
        }
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      if (draggedIndex >= 0) {
        pan.setValue({
          x: gestureState.dx,
          y: gestureState.dy
        });
      }
    },
    onPanResponderRelease: () => {
      if (draggedIndex >= 0) {
        const currentX = (draggedIndex % GRID_COLUMNS) * ITEM_WIDTH + pan.x._value;
        const currentY = Math.floor(draggedIndex / GRID_COLUMNS) * ITEM_HEIGHT + pan.y._value;
        
        const newCol = Math.round(currentX / ITEM_WIDTH);
        const newRow = Math.round(currentY / ITEM_HEIGHT);
        const newIndex = Math.min(newRow * GRID_COLUMNS + newCol, items.length - 1);
        
        if (newIndex !== draggedIndex) {
          const newItems = [...items];
          const [removed] = newItems.splice(draggedIndex, 1);
          newItems.splice(newIndex, 0, removed);
          setItems(newItems);
        }
        
        setDraggedIndex(-1);
        pan.setValue({ x: 0, y: 0 });
      }
    },
  });

  if (currentItem) {
    return <IconGallery onClose={() => setCurrentItem(null)} item={currentItem} />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png' }}
          style={styles.logo}
        />
      </View>
      
      {/* Compact Navigation Bar --> Needs changing*/}
      <View style={styles.navContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navContent}
        >
          {['Food', 'Shopping', 'Massage', 'Fun', 'Salon/Nail', 'Hotel', 'Delivery', 'Health', 'Services'].map((item) => (
            <TouchableOpacity key={item} style={styles.navLink}>
              <Text style={styles.navLinkText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Draggable Grid */}
      <View 
        ref={containerRef}
        style={[styles.grid, { height: VISIBLE_ROWS * ITEM_HEIGHT, marginTop: 20 }]} 
        {...panResponder.panHandlers}
      >
        {items.map((item, index) => {
          const row = Math.floor(index / GRID_COLUMNS);
          const col = index % GRID_COLUMNS;
          
          if (index === draggedIndex) {
            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.itemContainer,
                  {
                    left: col * ITEM_WIDTH,
                    top: row * ITEM_HEIGHT,
                    transform: pan.getTranslateTransform(),
                    zIndex: 10,
                  }
                ]}
              >
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => handleIconPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconBox}>
                    <Image source={{ uri: item.icon }} style={styles.iconImage} />
                  </View>
                  <Text style={styles.iconLabel}>{item.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          }
          
          return (
            <View
              key={item.id}
              style={[
                styles.itemContainer,
                {
                  left: col * ITEM_WIDTH,
                  top: row * ITEM_HEIGHT,
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => handleIconPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.iconBox}>
                  <Image source={{ uri: item.icon }} style={styles.iconImage} />
                </View>
                <Text style={styles.iconLabel}>{item.label}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FCF7F3',
    padding: 12,
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
  },
  navContainer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 6,
    height: 40,
  },
  navContent: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  navLink: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  navLinkText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  grid: {
    width: '100%',
    position: 'relative',
  },
  itemContainer: {
    position: 'absolute',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    padding: 8,
  },
  iconButton: {
    alignItems: 'center',
    width: '100%',
  },
  iconBox: {
    backgroundColor: '#f2f2f2',
    width: 70,
    height: 70,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  iconLabel: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 2,
    marginTop: 4,
  },
  // Gallery Styles
  galleryBody: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  galleryHeader: {
    backgroundColor: '#FCF7F3',
    padding: 20,
    alignItems: 'center'
  },
  galleryNavContainer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 6,
    height: 40,
  },
  galleryNavContent: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  galleryNavLinkContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  galleryNavLink: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  galleryBackLink: {
    color: 'black',
    padding: 10,
    paddingLeft: 20
  },
  galleryContainer: {
    padding: 20,
    paddingBottom: 40
  },
  galleryTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#5a2d0c'
  },
  galleryDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555'
  },
  detailsContainer: {
    backgroundColor: '#f9f3e9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  detailTitle: {
    fontWeight: 'bold',
    marginTop: 5,
    color: '#5a2d0c'
  },
  detailText: {
    marginBottom: 5,
    color: '#333'
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    margin: 10
  },
  galleryModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  galleryModalImage: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
    resizeMode: 'contain'
  },
  galleryClose: {
    position: 'absolute',
    top: 20,
    right: 40,
    color: 'white',
    fontSize: 30
  }
});

export default Homepage;
