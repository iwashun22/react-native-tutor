import React, { ReactElement } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/reducers/countReducer';

export default function MyTodo(props: any): ReactElement {
  const count = useSelector((state: any) => state.count.value);
  const dispatch = useDispatch();

  const handleIncrease = () => dispatch(increment());
  const handleDecrease = () => dispatch(decrement());
  return (
    <View style={style.todoListContainer}>
      <Text style={style.textStyle}>Count: {count}</Text>
      <View style={style.buttonContainer}>
        <Button title="increase" onPress={handleIncrease} color="#27C343"/>
        <Button title="decrease" onPress={handleDecrease} color="#C33427"/>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#33ACE8'
  },
  textStyle: {
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  counterButton: {
    flex: 1
  }
})