import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function ToDoListItem({ toDoItem, toggleComplete, removeItem, styles }: 
    {   
        toDoItem: ToDoItem, 
        toggleComplete: Function, 
        removeItem: Function,
        styles: any }) {
    return (
        

        <View style={styles.listItem} key={`${toDoItem.id}_${toDoItem.task}`}>
            <BouncyCheckbox onPress={() => {toggleComplete(toDoItem.id)}}
                            isChecked={toDoItem.done}
                            fillColor="#2196F3" />
            <Text
            style={[
                styles.task,
                { textDecorationLine: toDoItem.done ? "line-through" : "none" }
            ]}
            >
            {toDoItem.task}
            </Text>
            <Button
            title="X"
            onPress={() => {
                removeItem(toDoItem.id);
            }}
            color="crimson"
            />
        </View>
    );
  }