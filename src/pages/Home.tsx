import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(tasks.find(task => task.title === newTaskTitle)){
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldTasks => [...oldTasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldTasks => {
      const updatedTasks = [...oldTasks]
      const checkedTaskIndex = updatedTasks.findIndex(
        task => task.id === id,
      );

      updatedTasks[checkedTaskIndex].done = !updatedTasks[checkedTaskIndex].done;
    
      return [...updatedTasks];
    })
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item", 
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        { text: "Sim", 
          onPress: () => setTasks(tasks => tasks.filter(task => task.id !== id)),
        }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks(oldTasks => {
      const updatedTasks = [...oldTasks]
      const checkedTaskIndex = updatedTasks.findIndex(
        task => task.id === taskId,
      );

      updatedTasks[checkedTaskIndex].title = taskNewTitle;
    
      return [...updatedTasks];
    })
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})