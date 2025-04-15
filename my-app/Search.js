import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Restaurant Search Component
const RestaurantSearch = () => {
  // Enhanced restaurant data with locations
  const restaurantData = [
    { 
      id: 1, 
      name: 'Italian Bistro', 
      tags: ['Italian', 'Pasta', 'Fine Dining'], 
      location: 'Downtown',
      description: 'Authentic Italian cuisine' 
    },
    { 
      id: 2, 
      name: 'Burger Palace', 
      tags: ['American', 'Burgers', 'Fast Food'], 
      location: 'Midtown',
      description: 'Best burgers in town' 
    },
    { 
      id: 3, 
      name: 'Sushi World', 
      tags: ['Japanese', 'Sushi', 'Asian'], 
      location: 'Uptown',
      description: 'Fresh sushi and sashimi' 
    },
    { 
      id: 4, 
      name: 'Taco Fiesta', 
      tags: ['Mexican', 'Tacos', 'Street Food'], 
      location: 'Downtown',
      description: 'Vibrant Mexican flavors' 
    },
    { 
      id: 5, 
      name: 'Vegan Heaven', 
      tags: ['Vegan', 'Healthy', 'Organic'], 
      location: 'Westside',
      description: 'Plant-based delights' 
    },
    { 
      id: 6, 
      name: 'Pizza Corner', 
      tags: ['Italian', 'Pizza', 'Casual'], 
      location: 'Eastside',
      description: 'Wood-fired pizzas' 
    },
  ];

  // All available tags (cuisine types + locations)
  const allCuisineTags = [...new Set(restaurantData.flatMap(restaurant => restaurant.tags))];
  const allLocationTags = [...new Set(restaurantData.map(restaurant => restaurant.location))];
  const allTags = [...allCuisineTags, ...allLocationTags];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData);
  const [selectedTags, setSelectedTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeFilterType, setActiveFilterType] = useState('all');

  // Filter restaurants based on search query and selected tags
  useEffect(() => {
    let results = restaurantData;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(query)) ||
        restaurant.location.toLowerCase().includes(query)
      );
    }
    
    if (selectedTags.length > 0) {
      results = results.filter(restaurant =>
        selectedTags.some(tag => 
          restaurant.tags.includes(tag) || 
          restaurant.location === tag
        )
      );
    }
    
    setFilteredRestaurants(results);
  }, [searchQuery, selectedTags]);

  // Generate suggestions
  useEffect(() => {
    if (searchQuery.length > 0) {
      const query = searchQuery.toLowerCase();
      
      const matchedNames = restaurantData
        .filter(restaurant => restaurant.name.toLowerCase().includes(query))
        .map(restaurant => ({ 
          type: 'name',
          value: restaurant.name 
        }));
      
      const matchedTags = allTags
        .filter(tag => tag.toLowerCase().includes(query))
        .map(tag => ({
          type: 'tag',
          value: tag
        }));
      
      setSuggestions([...matchedNames, ...matchedTags]);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleTagPress = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setSearchQuery('');
  };

  const handleSuggestionPress = (suggestion) => {
    if (suggestion.type === 'tag') {
      handleTagPress(suggestion.value);
    } else {
      setSearchQuery(suggestion.value);
    }
    setSuggestions([]);
  };

  return (
    <View style={[searchStyles.container, { backgroundColor: 'white' }]}>
      {/* Search Bar */}
      <View style={searchStyles.searchContainer}>
        <TextInput
          style={searchStyles.searchInput}
          placeholder="Search restaurants or tags..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <View style={searchStyles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={searchStyles.suggestionItem}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text style={searchStyles.suggestionText}>
                  {item.value}
                  <Text style={searchStyles.suggestionType}>
                    {item.type === 'tag' ? ' (tag)' : ''}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Filter Type Selector */}
      <View style={searchStyles.filterTypeContainer}>
        <TouchableOpacity
          style={[
            searchStyles.filterTypeButton, 
            activeFilterType === 'all' ? searchStyles.activeFilterType : searchStyles.inactiveFilterType
          ]}
          onPress={() => setActiveFilterType('all')}
        >
          <Text style={[
            searchStyles.filterTypeText,
            activeFilterType === 'all' ? searchStyles.activeFilterTypeText : searchStyles.inactiveFilterTypeText
          ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            searchStyles.filterTypeButton, 
            activeFilterType === 'cuisine' ? searchStyles.activeFilterType : searchStyles.inactiveFilterType
          ]}
          onPress={() => setActiveFilterType('cuisine')}
        >
          <Text style={[
            searchStyles.filterTypeText,
            activeFilterType === 'cuisine' ? searchStyles.activeFilterTypeText : searchStyles.inactiveFilterTypeText
          ]}>
            Cuisine
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            searchStyles.filterTypeButton, 
            activeFilterType === 'location' ? searchStyles.activeFilterType : searchStyles.inactiveFilterType
          ]}
          onPress={() => setActiveFilterType('location')}
        >
          <Text style={[
            searchStyles.filterTypeText,
            activeFilterType === 'location' ? searchStyles.activeFilterTypeText : searchStyles.inactiveFilterTypeText
          ]}>
            Location
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tags Filter */}
      <View style={searchStyles.tagsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(activeFilterType === 'all' ? allTags : 
            activeFilterType === 'cuisine' ? allCuisineTags : allLocationTags)
            .map(tag => (
              <TouchableOpacity
                key={tag}
                style={[
                  searchStyles.tag,
                  selectedTags.includes(tag) && searchStyles.selectedTag,
                  allLocationTags.includes(tag) && searchStyles.locationTag
                ]}
                onPress={() => handleTagPress(tag)}
              >
                <Text style={[
                  searchStyles.tagText,
                  selectedTags.includes(tag) && searchStyles.selectedTagText
                ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      {/* Results */}
      <FlatList
        data={filteredRestaurants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={searchStyles.restaurantItem}>
            <Text style={searchStyles.restaurantName}>{item.name}</Text>
            <Text style={searchStyles.restaurantLocation}>{item.location}</Text>
            <Text style={searchStyles.restaurantDescription}>{item.description}</Text>
            <View style={searchStyles.restaurantTags}>
              {item.tags.map(tag => (
                <Text key={tag} style={searchStyles.restaurantTag}>{tag}</Text>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={searchStyles.emptyContainer}>
            <Text style={searchStyles.emptyText}>No restaurants found</Text>
          </View>
        }
      />
    </View>
  );
};

const Search = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image 
            source={{uri: "https://static.wixstatic.com/media/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png/v1/fill/w_154,h_154,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/818cbe_6b80915765e4490eae3775030fe869d4~mv2.png"}}
            style={{width: 80, height: 80}}
          />
        </View>
        
        <View style={styles.nav}>
          <Text style={styles.navLink}>Food</Text>
          <Text style={styles.navLink}>Shopping</Text>
          <Text style={styles.navLink}>About us</Text>
        </View>

        {/* Integrated Restaurant Search Component with white background */}
        <RestaurantSearch />
      </ScrollView>
    </View>
  );
};

// Original styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollContainer: {
    flexGrow: 1,
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
});

// Search component styles
const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    fontSize: 16,
  },
  suggestionsContainer: {
    maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
  },
  suggestionType: {
    fontSize: 14,
    color: '#888',
  },
  filterTypeContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 4,
  },
  filterTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  activeFilterType: {
    backgroundColor: '#6200ee',
  },
  inactiveFilterType: {
    backgroundColor: 'transparent',
  },
  filterTypeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterTypeText: {
    color: 'white',
  },
  inactiveFilterTypeText: {
    color: 'black',
  },
  tagsContainer: {
    marginBottom: 16,
    height: 50,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  locationTag: {
    backgroundColor: '#e0f7fa',
    borderColor: '#b2ebf2',
  },
  selectedTag: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTagText: {
    color: 'white',
  },
  restaurantItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantLocation: {
    fontSize: 14,
    color: '#6200ee',
    marginBottom: 4,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  restaurantTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  restaurantTag: {
    fontSize: 12,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default Search;
