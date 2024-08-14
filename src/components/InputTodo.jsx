import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const colors = [
  "#FFFFFF", // white
  "#00BFFF", // sky blue
  "#FF4F5A", // bright coral
  "#7CFC00", // lime green
  "#FFFF00", // bright yellow
  "#FF69B4", // hot pink
  "#8A2BE2", // vivid purple
  "#FFD700", // golden yellow
];

const InputTodo = ({ onAddTodo, onClose }) => {
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [showColors, setShowColors] = useState(false);
  const animation = useState(new Animated.Value(0))[0];
  const inputRef = useRef(null);
  const theme = useSelector((state) => state.displayTheme.mode);

  useEffect(() => {
    inputRef.current?.focus();

    const backAction = () => {
      Keyboard.dismiss();
      onClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleAdd = () => {
    if (text.trim()) {
      onAddTodo({
        text,
        color: selectedColor,
      });
      setText("");
      setSelectedColor(colors[0]);
      setShowColors(false);
      Keyboard.dismiss();
      onClose();
    }
  };

  const toggleColors = () => {
    Keyboard.dismiss(); 
    setShowColors(!showColors);
    Animated.timing(animation, {
      toValue: showColors ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColors(false);
  };

  const colorPickerScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const gradientColors = [
    `${selectedColor}80`,
    `${selectedColor}60`,
    `${selectedColor}40`,
  ];

  const backgroundColor = theme === "dark" ? "#333" : "#fff";
  const inputBackgroundColor = theme === "dark" ? "#444" : "#fff";
  const borderColor = theme === "dark" ? "#888" : "#ccc";
  const colorPickerBackground = theme === "dark" ? "#222" : "#fff";
  const checkMarkColor = theme === "dark" ? "#fff" : "#000";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.overlay, { backgroundColor: selectedColor }]}
    >
      <LinearGradient
        colors={gradientColors}
        style={[styles.container, { backgroundColor }]}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[
              styles.colorCircle,
              { backgroundColor: selectedColor, borderColor },
            ]}
            onPress={toggleColors}
          >
            {selectedColor !== "#FFFFFF" && (
              <MaterialIcons name="check" size={24} color={checkMarkColor} />
            )}
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              { backgroundColor: inputBackgroundColor, borderColor },
            ]}
            value={text}
            onChangeText={setText}
            placeholder="Add a new todo"
            placeholderTextColor={borderColor}
            onSubmitEditing={handleAdd}
            onFocus={() => setShowColors(false)}
          />
        </View>
        {showColors && (
          <Animated.View
            style={[
              styles.colorPicker,
              {
                backgroundColor: colorPickerBackground,
                transform: [{ scaleY: colorPickerScale }],
              },
            ]}
          >
            <FlatList
              data={colors}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.colorCircle,
                    { backgroundColor: item, borderColor },
                  ]}
                  onPress={() => {
                    handleColorSelect(item);
                  }}
                >
                  {selectedColor === item && (
                    <MaterialIcons
                      name="check"
                      size={24}
                      color={checkMarkColor}
                    />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 5 }}
            />
          </Animated.View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              Keyboard.dismiss();
              onClose();
            }}
          >
            <MaterialIcons name="close" size={45} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <MaterialIcons name="check" size={45} color="green" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 10,
  },
  container: {
    borderRadius: 10,
    padding: 10,
    elevation: 15,
    zIndex: 1000,
    flexDirection: "column",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    elevation: 3,
  },
  colorPicker: {
    padding: 10,
    borderRadius: 8,
    elevation: 10,
    zIndex: 1000,
    position: "absolute",
    top: 30,
    left: 30,
    right: 30,
  },
  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  closeButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
});

export default InputTodo;
