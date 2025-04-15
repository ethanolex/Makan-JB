import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import ImageViewer from './components/ImageViewer';

const { width } = Dimensions.get('window');
const IMAGE_GAP = 10; // Space between images
const IMAGE_WIDTH = (width - IMAGE_GAP * 3) / 2; // Subtracting gaps and container padding

const RestaurantGallery = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQwTPSldW6NcCZVMh81nVuEbBlaRtvEEWntA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF3aYyofmL1K189fKOxTR1LmZ13-dnv_l4Rw&s",
    "https://makanlookout.wordpress.com/wp-content/uploads/2021/01/whatsapp-image-2021-01-01-at-11.58.02-am.jpeg",
    "https://media2.malaymail.com/uploads/articles/2018/2018-09/ramly_burger_1309e.jpg",
    "https://www.chompslurrpburp.com/wp-content/uploads/2023/03/KL-foodie.jpg",
    "https://media2.malaymail.com/uploads/articles/2018/2018-09/ramly_burger_1309b.jpg",
    "https://www.you.co/sg/wp-content/uploads/sites/2/2022/12/RB-4.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHsRLqbTxSEYXXOLG1mrZM7Vebia-1TmkCw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5JJeCaEFzAXueHNLxJkJE3TwZILJl1bJAw&s",
    "https://eatbook.sg/wp-content/uploads/2019/05/Ramly-Burger-Recipe-1024x683.jpg",
  ];

  const openImage = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  // Function to render images in centered rows of 2
  const renderImages = () => {
    let rows = [];
    for (let i = 0; i < images.length; i += 2) {
      const rowImages = [
        <TouchableOpacity key={i} onPress={() => openImage(i)}>
          <Image source={{uri: images[i]}} style={styles.galleryImage} />
        </TouchableOpacity>
      ];
      
      if (i + 1 < images.length) {
        rowImages.push(
          <TouchableOpacity key={i+1} onPress={() => openImage(i + 1)}>
            <Image source={{uri: images[i + 1]}} style={styles.galleryImage} />
          </TouchableOpacity>
        );
      } else {
        // Add empty view to maintain grid alignment for odd number of images
        rowImages.push(<View key={i+1} style={styles.galleryImage} />);
      }

      rows.push(
        <View key={i} style={styles.imageRow}>
          {rowImages}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
          <Image 
            source={{uri: "https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png"}}
            style={{width: 80, height: 80}}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.nav}>
        <Text style={styles.navLink}>Food</Text>
        <Text style={styles.navLink}>Search</Text>
        <Text style={styles.navLink}>About us</Text>
      </View>

      <TouchableOpacity 
        style={styles.backLink} 
        onPress={() => navigation.goBack()}
      >
        <Text>Back to Restaurant</Text>
      </TouchableOpacity>

      <View style={styles.galleryContainer}>
        <Text style={styles.galleryTitle}>TSB Ramli Burger</Text>
        <View style={styles.galleryGrid}>
          {renderImages()}
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ImageViewer 
          images={images} 
          initialIndex={selectedIndex} 
          onClose={() => setModalVisible(false)} 
        />
      </Modal>
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
  galleryContainer: {
    flex: 1,
    paddingHorizontal: IMAGE_GAP,
    alignItems: 'center'
  },
  galleryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  galleryGrid: {
    width: '100%',
    alignItems: 'center'
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: IMAGE_GAP,
    width: '100%'
  },
  galleryImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.75, // 4:3 aspect ratio
    borderRadius: 8,
    marginHorizontal: IMAGE_GAP / 2,
    backgroundColor: '#f2f2f2' // Background for empty views
  },
  backLink: {
    padding: 15,
    paddingLeft: 20
  }
});

export default RestaurantGallery;
