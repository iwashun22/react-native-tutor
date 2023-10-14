import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import type { Task } from '../redux/reducers/todoReducer';
import { MaterialIcons } from '@expo/vector-icons';

type IconName = keyof typeof MaterialIcons.glyphMap;
const checkBox: {checked: IconName, empty: IconName} = {
  checked: "check-box",
  empty: "check-box-outline-blank"
}
const colorType = {
  success: '#3791E8',
  cancel: '#CB2D2D'
}

function TodoBox<Item extends Task>({item, deleteTodo, toggleComplete }: {
  item: Item,
  deleteTodo: (item: Item) => void,
  toggleComplete: (item: Item) => void,
}): ReactElement {
  return (
    <View style={styles.containerBox}>
      <View style={{
        margin: 5,
      }}>
        <TouchableOpacity onPress={() => {
          toggleComplete(item);
        }}>
          <MaterialIcons 
            name={item.complete ? checkBox.checked : checkBox.empty}
            size={20}
            color={item.complete ? colorType.success : "black"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerBox}>
        <View style={styles.flexBox}>
          <View style={styles.taskNameView}>
            <Text style={styles.taskNameText}>{item.taskName}</Text>
          </View>
          <View style={styles.buttonContainerView}>
            <TouchableOpacity onPress={() => {
              toggleComplete(item);
            }}>
              {
                item.complete ?
                <Text style={[
                  styles.buttonText,
                  { color: colorType.cancel }
                ]}>undo</Text> :
                <Text style={[
                  styles.buttonText,
                  { backgroundColor: colorType.success, color: 'white' }
                ]}>done</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Alert.alert(
                'The task will be removed', 
                `Do you really want to delete task "${item.taskName}"?`,
                [
                  {
                    text: 'cancel',
                    onPress: () => null,
                    style: 'cancel'
                  },
                  {
                    text: 'yes',
                    onPress: () => {
                      deleteTodo(item);
                    }
                  }
                ]
              )
            }}>
              <Text style={[
                styles.buttonText,
                { backgroundColor: colorType.cancel, color: 'white' }
              ]}>delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
      </View>
    </View>
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
  const twoDigitsMinutes = minutes < 10 ? '0'+minutes : minutes;
  return `${getDate} ${fixedHours}:${twoDigitsMinutes}${suffix}`;
}

const styles = StyleSheet.create({
  containerBox: {
    margin: 15,
    padding: 10,
    backgroundColor: '#EBED9D',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'dashed'
  },
  innerBox: {
    flex: 1,
    paddingLeft: 5,
  },
  buttonText: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 12
  },
  flexBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  taskNameView: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#EFF2B6',
    borderRadius: 10,
  },
  taskNameText: {
    fontSize: 15
  },
  buttonContainerView: {
    flex: 3,
    justifyContent: 'center',
  },
  dateText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#858585',
    marginTop: 10,
    fontStyle: 'italic'
  }
})

export default TodoBox