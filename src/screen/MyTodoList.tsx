import React, { useCallback } from 'react';
import { SafeAreaView, Text, Button, View, StyleSheet, Pressable, Modal } from 'react-native';
import Icon from '../components/Icon';

import { addTodo, removeTodo, toggleTodoComplete, Task } from '../redux/reducers/todoReducer';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';

export default function MyTodoList() {
  const todoList = useSelector<RootState, Array<Task>>((state: any) => state.todo.list);
  const dispatch = useCallback(useDispatch(), []);

  const addTestTodo = useCallback(() => {
    const id = Math.floor(Math.random()*(10**10)).toString(16);
    dispatch(addTodo({ 
      id,
      taskName: 'test',
      complete: false,
      createdAt: new Date()
    }))
  }, [])
  const deleteTodo = useCallback((id: string) => {
    dispatch(removeTodo({id}));
  }, [])
  const toggleComplete = useCallback((id: string) => {
    dispatch(toggleTodoComplete({id}));
  }, []);
  const ToggleButton = useCallback((complete: boolean, id: string) => {
    let title = "done";
    if(complete) {
      title = "undo"
    }
    return (
      <Button title={title} onPress={() => toggleComplete(id)}/>
    )
  }, [])
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Text style={style.headerText}>My Todos</Text>
      {todoList.map(todo => (
        <View key={todo.id}>
          <Text>id: {todo.id}</Text>
          <Text>task: {todo.taskName}</Text>
          <Text>is complete: {todo.complete.toString()}</Text>
          <Text>created at: {todo.createdAt.toString()}</Text>
          {ToggleButton(todo.complete, todo.id)}
          <Button title="delete" onPress={() => deleteTodo(todo.id)}/>
        </View>
      ))}
      <Pressable style={style.addIcon}>
        <Icon iconName="plus" color="#01BD1A" size={addIconSize}/>
      </Pressable>
      {/* TODO: ADD FORM  */}
      <Button title="add" onPress={() => addTestTodo()}/>
    </SafeAreaView>
  )
}

// TODO: create form JSX
function Form() {
  return (
    Modal
  )
}

const addIconSize = 50;

const style = StyleSheet.create({
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15
  },
  addIcon: {
    position: 'absolute',
    left: '50%',
    bottom: 30,
    transform: [{translateX: -(addIconSize/2)}],
    zIndex: 100
  }
})