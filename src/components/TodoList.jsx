import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const TodoList = ({ todos, onToggleComplete, onDelete, onUpdateTodo }) => {
  const [editingId, setEditingId] = useState(null);
  const [editableText, setEditableText] = useState("");
  const textInputRef = useRef(null); // Create a ref for TextInput

  // Focus on the TextInput and move cursor to the end of the text
  useEffect(() => {
    if (editingId !== null && textInputRef.current) {
      textInputRef.current.focus(); // Focus on the TextInput to open the keyboard
      // Move cursor to the end of the text
      textInputRef.current.setSelection(editableText.length, editableText.length);
    }
  }, [editingId, editableText]);

  const handleEditPress = (todo) => {
    setEditingId(todo.id);
    setEditableText(todo.text);
  };

  const handleSavePress = () => {
    if (editableText.trim()) {
      onUpdateTodo(editingId, editableText);
      setEditingId(null);
      setEditableText("");
    }
  };

  const handleCancelPress = () => {
    setEditingId(null);
    setEditableText("");
  };

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
            {editingId === todo.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  ref={textInputRef} 
                  style={styles.editableTextInput}
                  value={editableText}
                  onChangeText={setEditableText}
                  onSubmitEditing={handleSavePress}
                />
                <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
                  <MaterialIcons name="check" size={30} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelPress} style={styles.cancelButton}>
                  <MaterialIcons name="cancel" size={30} color="red" />
                </TouchableOpacity>
              </View>
            ) : (
              <>
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
                      todo.completed
                        ? styles.completedText
                        : styles.incompleteText
                    }
                  >
                    {todo.text}
                  </Text>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => handleEditPress(todo)}>
                    <MaterialIcons name="edit" size={30} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDelete(todo.id)}>
                    <MaterialIcons name="delete" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              </>
            )}
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
    padding: 12,
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
    fontSize: 18,
  },
  incompleteText: {
    color: "#333",
    fontSize: 18,
  },
  editableTextInput: {
    fontSize: 18,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    marginRight: 10,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButton: {
    marginLeft: 10,
  },
  cancelButton: {
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default TodoList;
