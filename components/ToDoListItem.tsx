import { View, Text, Button } from "react-native";

interface ToDoItem {
    id: number;
    task: string;
    done: boolean;
}

export default function ToDoListItem({ toDoItem, toggleComplete, removeItem, styles }: 
    {   
        toDoItem: ToDoItem, 
        toggleComplete: Function, 
        removeItem: Function,
        styles: any }) {
    return (
        <View style={styles.listItem} key={`${toDoItem.id}_${toDoItem.task}`}>
            <Text
            style={[
                styles.task,
                { textDecorationLine: toDoItem.done ? "line-through" : "none" }
            ]}
            >
            {toDoItem.task} -- My number is: {toDoItem.id}
            </Text>
            <Button
            title={toDoItem.done ? "Completed" : "Complete"}
            onPress={() => toggleComplete(toDoItem.id)}
            />
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