import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, ImageBackground, Keyboard, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import { addTodo, deleteTodo, editTodo, toggleComplete } from '../redux/todoslice';

const TodoListScreen = () => {
  const [showInputTodo, setShowInputTodo] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const scrollY = useRef(new Animated.Value(0)).current;
  const todos = useSelector((state) => state.todos.todos);
  const backgroundImage = useSelector((state) => state.theme.backgroundImage) || require('../assets/main.jpg');
  const dispatch = useDispatch();

  const handleAddTodo = (todo) => {
    dispatch(addTodo(todo));
    hideInputTodo();
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, newText) => {
    dispatch(editTodo({ id, newText }));
  };

  const showInputTodoBar = () => {
    setShowInputTodo(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideInputTodo = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowInputTodo(false);
      Keyboard.dismiss();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={styles.backgroundImageEffect}
      >
        <Animated.View style={[styles.backgroundImageOverlay]}>
          <ScrollView
            contentContainerStyle={styles.innerContainer}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            <TodoList
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onUpdateTodo={handleUpdateTodo}
            />
          </ScrollView>
        </Animated.View>
        {showInputTodo && (
          <TouchableWithoutFeedback onPress={hideInputTodo}>
            <Animated.View style={[styles.popupContainer]}>
              <InputTodo
                onAddTodo={handleAddTodo}
                onClose={hideInputTodo}
                onBlur={hideInputTodo}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => showInputTodoBar()}
        >
          <MaterialIcons name="add" size={40} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
    paddingTop: 100,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImageEffect: {
    opacity: 0.7,
    blurRadius: 5,
  },
  backgroundImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  addButton: {
    backgroundColor: '#0c0',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 5,
  },
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 15,
    padding: 20,
    zIndex: 1000,
    backgroundColor: 'transparent'
  },
});

export default TodoListScreen;
