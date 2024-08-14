import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, Dimensions, Image, FlatList as RNFlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundImage } from '../redux/themeSlice';

const { width } = Dimensions.get('window');

const images = [
  require('../assets/main.jpg'),
  require('../assets/bridge.jpg'),
  require('../assets/autumn-leaves.jpg'),
  require('../assets/galaxy.jpg'),
  require('../assets/horizon.jpg'),
  require('../assets/leaves.jpg'),
  require('../assets/tree-trunk.jpg'),
  require('../assets/waterfall.jpg'),
  require('../assets/wood-wall.jpg'),
  require('../assets/black-dog.jpg'),
  require('../assets/frog.jpg'),
  require('../assets/giraffe.jpg'),
  require('../assets/jelly-fish.jpg'),
  require('../assets/lazy-tiger.jpg'),
  require('../assets/panda.jpg'),
  require('../assets/whale.jpg'),
];

const FlatList = Animated.createAnimatedComponent(RNFlatList);

const ThemesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const scrollY = new Animated.Value(0);
  const currentBackgroundImage = useSelector((state) => state.theme.backgroundImage);

  useEffect(() => {
    if (!currentBackgroundImage) {
      dispatch(setBackgroundImage(images[0]));  // Set initial background image if not already set
    }
  }, [dispatch, currentBackgroundImage]);

  const handleSelectImage = (image) => {
    dispatch(setBackgroundImage(image));  // Dispatch Redux action to update background image
    navigation.goBack();  // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectImage(item)}>
            <View style={styles.imageContainer}>
              <Image
                source={item}
                style={[
                  styles.image,
                  item === currentBackgroundImage && styles.selectedImage,
                ]}
              />
              {item === currentBackgroundImage && (
                <Ionicons
                  name="checkmark-circle"
                  size={50}
                  color="white"
                  style={styles.checkmark}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        windowSize={5}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: (width / 2) - 20,
    height: 200,
    margin: 5,
    borderRadius: 10,
  },
  selectedImage: {
    opacity: 0.5,
  },
  checkmark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
});

export default ThemesScreen;
