import React, { ReactElement, useCallback } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/reducers/countReducer';

export default function MyTodo(props: any): ReactElement {
  const count = useSelector((state: any) => state.count.value);
  const dispatch = useCallback(useDispatch(), []);

  const handleIncrease = useCallback(() => dispatch(increment()), []);
  const handleDecrease = useCallback(() => dispatch(decrement()), []);
  return (
    <View style={styles.todoListContainer}>
      <Text style={styles.textStyle}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="increase" onPress={handleIncrease} color="#27C343"/>
        <Button title="decrease" onPress={handleDecrease} color="#C33427"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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