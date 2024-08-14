import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TodoList = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <View style={styles.listContainer}>
      {todos.map((todo) => (
        <View key={todo.id} style={styles.todoItem}>
          <LinearGradient
            colors={
              todo.completed
                ? [
                    "rgba(200, 200, 200, 0.7)", // Light gray
                    "rgba(150, 150, 150, 0.5)", // Medium gray
                    "rgba(100, 100, 100, 0.4)", // Darker gray
                  ]
                : [
                    "rgba(255, 255, 255, 0.9)", // White with more opacity
                    "rgba(255, 255, 255, 0.7)", // White
                    "rgba(255, 255, 255, 0.5)", // Light white
                  ]
            }
            style={[styles.todoItemContent, { backgroundColor: todo.color }]}
          >
            <TouchableOpacity
              onPress={() => onToggleComplete(todo.id)}
              style={styles.checkboxContainer}
            >
              <Checkbox
                value={todo.completed}
                onValueChange={() => onToggleComplete(todo.id)}
                style={styles.checkbox}
              />
              <Text
                style={
                  todo.completed ? styles.completedText : styles.incompleteText
                }
              >
                {todo.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(todo.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
  },
  todoItem: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  todoItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
    fontSize: 16,
  },
  incompleteText: {
    color: "#333",
    fontSize: 16,
  },
});

export default TodoList;
