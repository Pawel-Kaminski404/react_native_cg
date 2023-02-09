import * as React from "react"
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native"
import ToDoListItem from "../components/ToDoListItem";


const WelcomeScreen = () => {
    const [inputTextValue, setInputTextValue] = useState<string>("");
    const [toDoList, setToDoList] = useState<ToDoItem[]>([]);
    const [isErrorVisible, setIsErrorVisible] = useState<Boolean>(false);
    const [toDoListIndex, setToDoListIndex] = useState<number>(0);

    const getNewIndex = (): number => {
        setToDoListIndex(toDoListIndex + 1)
        return toDoListIndex
    }

    const addTask = (): void => {
        if (inputTextValue.trim())
            setToDoList([...toDoList, { task: inputTextValue, done: false, id: getNewIndex() }]);
        else setIsErrorVisible(true);
            setInputTextValue("");
      };
    
    const removeItem = (index: number): void => {
        const newToDoList = toDoList.filter(item => item.id != index)
        setToDoList(newToDoList);
    };

    const toggleDone = (index: number): void => {
        const newToDoList = [...toDoList];
        newToDoList.forEach(item => {
            if (item.id == index){
                item.done = !item.done
            }
        })
        setToDoList(newToDoList);
    };

    const renderItem = (toDoItem: ToDoItem) => <ToDoListItem 
                                styles={styles} 
                                toDoItem = {toDoItem} 
                                toggleComplete={toggleDone} 
                                removeItem = {removeItem}
                            ></ToDoListItem>

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To do List</Text>
            <View style={styles.inputWrapper}>
            <TextInput
                placeholder="Enter your task here."
                value={inputTextValue}
                onChangeText={e => {
                    setInputTextValue(e);
                    setIsErrorVisible(false);
                }}
                style={styles.inputBox}
            />
            <Button title="Add Task" onPress={addTask} />
            </View>
            {isErrorVisible && (
                <Text style={styles.error}>Error: Input field is empty...</Text>
            )}
            <Text style={styles.subtitle}>Tasks:</Text>
            {toDoList.length === 0 && <Text>No tasks.</Text>}
            <View style={styles.toDoList}>
                <FlatList 
                    ListHeaderComponent={<></>}
                    data={toDoList} renderItem= {({item}) => renderItem(item)}
                    ListFooterComponent={<></>}>
                </FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    padding: 35,
    alignItems: "center"
    },
    inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
    },
    inputBox: {
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8
    },
    title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
    },
    subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "purple"
    },
    listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
    },
    addButton: {
    alignItems: "flex-end"
    },
    task: {
    width: 200
    },
    error: {
    color: "red"
    },
    toDoList: {
        maxHeight: 300
    }
});


export default WelcomeScreen