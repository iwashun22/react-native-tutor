import React, { ReactElement, useCallback, useState } from 'react';
import { 
  SafeAreaView, Text, 
  View, StyleSheet, FlatList, 
  Modal, Alert, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import Icon from '../components/Icon';
import TodoBox from '../components/TodoBox';

import { addTodo, toggleTodoComplete, removeTodo, Task } from '../redux/reducers/todoReducer';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';

export default function MyTodoList() {
  const todoList = useSelector<RootState, Array<Task>>((state: any) => state.todo.list);
  const [formIsVisible, setFormVisibility] = useState<boolean>(false);
  const dispatch = useCallback(useDispatch(), []);

  const add = useCallback((task: Task) => {
    dispatch(addTodo(task));
  }, []);
  const deleteTodo = useCallback((task: Task) => {
    dispatch(removeTodo({id: task.id}));
  }, []);
  const toggleComplete = useCallback((task: Task) => {
    dispatch(toggleTodoComplete({id: task.id}));
  }, []);
  const sortList: () => Array<Task> = useCallback(() => {
    const listMap = new Map<boolean, Array<Task>>();
    todoList.forEach(todo => {
      const arr = listMap.get(todo.complete) || [];
      arr.push(todo);
      listMap.set(todo.complete, arr);
    })
    function sortByTime(a: Task, b: Task) {
      const aTime = (new Date(a.createdAt)).getTime(),
      bTime = (new Date(b.createdAt)).getTime()
      return aTime - bTime;
    }
    const completedTasks = listMap.get(true)?.sort(sortByTime) || [],
    incompleteTasks = listMap.get(false)?.sort(sortByTime) || [];
    return incompleteTasks.concat(completedTasks);
  }, [todoList]);
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Text style={styles.headerText}>My Todos</Text>
      <FlatList
        data={sortList()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoBox 
            item={item}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        )}
        /* this is a blank space for scrolling */
        ListFooterComponent={() => (
          <View style={{
            width: '100%',
            height: 100,
            backgroundColor: 'none'
          }}></View>
        )}
      />
      <Form isVisible={formIsVisible} add={add} setFormVisibility={setFormVisibility}/>
      { !formIsVisible && (
        <TouchableOpacity
        style={styles.addIcon}
        onPress={() => setFormVisibility(true)}
        >
          <Icon iconName="plus" color="#45C13A" size={addIconSize}/>
        </TouchableOpacity>
      ) }
    </SafeAreaView>
  )
}

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
    <TouchableWithoutFeedback onPress={() => {
      // memo: dismiss keyboard when touch nothing 
      Keyboard.dismiss();
    }}>
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
      <View style={styles.formBackgroundView}>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={setTaskName}
          value={taskName}
          placeholder='task name'
          placeholderTextColor="#949494"
          style={styles.textInputStyle}
          multiline={true}
          autoFocus
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.relative,
              { left: 10 }
            ]}
            onPress={() => setFormVisibility(false)}
            >
            <Text style={[
              styles.textButton,
              { color: 'red' }
            ]}>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.relative,
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
                styles.textButton,
                { color: 'green' }
              ]}>add</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
    </TouchableWithoutFeedback>
  )
}

const addIconSize = 50;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15
  },
  addIcon: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#BBF2B6',
    borderRadius: 20,
    padding: 20,
    zIndex: 100
  },
  formBackgroundView: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
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
    paddingHorizontal: 8
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