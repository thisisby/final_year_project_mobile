import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade animation
  const slideAnim = useRef(new Animated.Value(0)).current; // For slide animation

  const toggleDropdown = () => {
    if (isOpen) {
      // Close dropdown with animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setIsOpen(false));
    } else {
      // Open dropdown with animation
      setIsOpen(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const closeDropdown = () => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setIsOpen(false));
    }
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0], // Slide up effect
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.trigger}>
        <Text style={styles.triggerText}>Open Dropdown</Text>
      </TouchableOpacity>

      {isOpen && (
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.dropdown,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>Option 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>Option 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>Option 3</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  trigger: {
    padding: 10,
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    alignItems: "center",
  },
  triggerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 50, // Adjust based on your trigger height
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Dropdown;
