import { MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TodoList = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <View style={styles.listContainer}>
      {todos.map(todo => (
        <View key={todo.id} style={styles.todoItem}>
          <TouchableOpacity onPress={() => onToggleComplete(todo.id)} style={styles.checkboxContainer}>
            <Checkbox
              value={todo.completed}
              onValueChange={() => onToggleComplete(todo.id)}
              style={styles.checkbox}
            />
            <Text style={todo.completed ? styles.completedText : styles.incompleteText}>
              {todo.text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(todo.id)}>
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 16,
  },
  incompleteText: {
    color: '#333',
    fontSize: 16,
  },
});

export default TodoList;
