import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

import { Task, TasksListProps } from "./TasksList";

interface TaskItemProps extends Omit<TasksListProps, 'tasks'> {
  item: Task;
  index: number;
}

export function TaskItem({ index, item, removeTask, toggleTaskDone, editTask }: TaskItemProps) {
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingTitle, setEditingTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditingItem(true);
  };

  function handleCancelEditing() {
    setEditingTitle(item.title);
    setIsEditingItem(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, editingTitle);
    setIsEditingItem(false);
  }

  useEffect(() => {
    if(textInputRef.current) {
      if(isEditingItem) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [isEditingItem])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
            <TextInput 
              ref={textInputRef}
              value={editingTitle}
              onChangeText={setEditingTitle}
              editable={isEditingItem}
              onSubmitEditing={handleSubmitEditing}
              style={item.done ? styles.taskTextDone : styles.taskText}
            />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        {
          isEditingItem ? (
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity> 
          ) : (
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          )
        }

        <View style={styles.iconsDivider} />
        
        <TouchableOpacity
          disabled={isEditingItem}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditingItem ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 4
  }
})