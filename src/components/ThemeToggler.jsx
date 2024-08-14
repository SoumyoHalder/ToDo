import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDarkTheme, setLightTheme } from "../redux/displayThemeSlice";

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.displayTheme.mode);
  const [animation] = React.useState(
    new Animated.Value(mode === "dark" ? 1 : 0)
  );

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: mode === "dark" ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [mode]);

  const handleToggle = () => {
    if (mode === "light") {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLightTheme());
    }
  };

  const iconStyle = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "270deg"],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.container}>
      <Animated.View style={iconStyle}>
        {mode === "light" ? (
          <Ionicons name="sunny" size={30} color="yellow" />
        ) : (
          <Ionicons name="moon" size={30} color="black" />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

export default ThemeToggler;
