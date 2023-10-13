import React, { ReactElement, useCallback, useState, useRef } from 'react';
import { 
  SafeAreaView, Text, Button, 
  View, StyleSheet, Pressable, 
  Modal, Alert, TextInput, TouchableOpacity
} from 'react-native';
import Icon from '../components/Icon';
import { MaterialIcons } from '@expo/vector-icons';

import { addTodo, removeTodo, toggleTodoComplete, Task } from '../redux/reducers/todoReducer';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';

export default function MyTodoList() {
  const todoList = useSelector<RootState, Array<Task>>((state: any) => state.todo.list);
  const [formIsVisible, setFormVisibility] = useState<boolean>(false);
  const dispatch = useCallback(useDispatch(), []);

  const add = useCallback((task: Task) => {
    dispatch(addTodo(task));
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
          <Text>created at: {formatDate(todo.createdAt)}</Text>
          {ToggleButton(todo.complete, todo.id)}
          <Button title="delete" onPress={() => deleteTodo(todo.id)}/>
        </View>
      ))}
      <Form isVisible={formIsVisible} add={add} setFormVisibility={setFormVisibility}/>
      { !formIsVisible && (
        <TouchableOpacity
        style={style.addIcon}
        onPress={() => setFormVisibility(true)}
        >
          <Icon iconName="plus" color="#01BD1A" size={addIconSize}/>
        </TouchableOpacity>
      ) }
    </SafeAreaView>
  )
}

function formatDate(date: Date) {
  date = new Date(date);
  const getDate = new Intl.DateTimeFormat().format(date);
  const { hours, minutes } = {
    hours: date.getHours(),
    minutes: date.getMinutes()
  };
  const fixedHours = hours <= 12 ? hours: hours - 12;
  const suffix = hours <= 12 ? 'am':'pm';
  return `${getDate} ${fixedHours}:${minutes}${suffix}`;
}

// TODO: create form JSX
function Form({ isVisible, add, setFormVisibility }: {
  isVisible: boolean,
  add: (task: Task) => void,
  setFormVisibility: React.Dispatch<React.SetStateAction<boolean>>
}): ReactElement {
  const [taskName, setTaskName] = useState<string>("");
  const addNewTodo = useCallback((t: string) => {
    const id = Math.floor(Math.random()*(10**10)).toString(16);
    add({
      id,
      taskName: t,
      complete: false,
      createdAt: new Date(Date.now())
    })
  }, [])
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert("Form has been closed.");
        setFormVisibility(false);
      }}
      onShow={() => {
        setTaskName("");
      }}
    >
      <View style={style.formBackgroundView}>
      <View style={style.formContainer}>
        <TextInput
          onChangeText={setTaskName}
          value={taskName}
          placeholder='task name'
          placeholderTextColor="#949494"
          style={style.textInputStyle}
          multiline={true}
          autoFocus
        />
        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={[
              style.relative,
              { left: 10 }
            ]}
            onPress={() => setFormVisibility(false)}
            >
            <Text style={[
              style.textButton,
              { color: 'red' }
            ]}>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              style.relative,
              { right: 10 }
            ]}
            onPress={() => {
              if(taskName) { 
                addNewTodo(taskName);
                setFormVisibility(false);
              }
            }}
          >
              <Text style={[
                style.textButton,
                { color: 'green' }
              ]}>add</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
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
  },
  formBackgroundView: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)#4F4F4F',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '85%',
    paddingVertical: 40,
    borderRadius: 25
  },
  textInputStyle: {
    fontSize: 16,
    width: '70%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginBottom: 40,
  },
  buttonContainer:  {
    width: '90%',
    height: 20,
    flexDirection: 'row',
    position: 'relative',
  },
  relative: {
    position: 'absolute',
    top: 0,
  },
  textButton: {
    textTransform: 'uppercase',
    fontSize: 16
  }
})