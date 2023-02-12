import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, Button, Modal, Pressable, StyleSheet } from "react-native";

const SwapiScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    const [swapiList, setSwapiList] = useState<SwapiPersonItem[]>([]);
    const [urlNext, setUrlNext] = useState("")
    const [urlPrevious, setUrlPrevious] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPerson, setCurrentPerson] = useState<SwapiPersonItem>();
    
    useEffect(() => {
        callApi("https://swapi.dev/api/people");
    }, []);

    const callApi = (url: string) => {
        setIsLoading(true)
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoading(false);
            setResponse(result);
          },
          (error) => {
            setIsLoading(false);
            setError(error);
          }
        )
    }
    
    const getNewIndex = (): number => {
        var num = Math.floor(Math.random() * 100000);
        return num;
    }

    useEffect(() => {
        if(response){
            let people = response["results"];
            let tempList = [...swapiList];
            for (let person of [...people]){
                tempList = [...tempList, { 
                    id: getNewIndex(), 
                    name: person["name"], 
                    gender: person["gender"], 
                    height: person["height"], 
                    mass: person["mass"], 
                    birth_year: person["birth_year"], 
                    eye_color: person["eye_color"], 
                    skin_color: person["skin_color"], 
                    hair_color: person["hair_color"], 
                    urlNext: person["next"], 
                    urlPrevious: person["previous"]
                }];
            }
            setSwapiList(tempList);
            setUrlNext(response["next"]);
            setUrlPrevious(response["previous"]);
        }
    }, [response]);

    const handleNext = () => {
        setSwapiList([]);
        callApi(urlNext);
    }
    const handlePrevious = () => {
        setSwapiList([]);
        callApi(urlPrevious);
    }

    const handleDetails = (swapiItem: SwapiPersonItem) => {
        setCurrentPerson(swapiItem);
        setModalVisible(true);
    }

    const renderItem = (swapiItem: SwapiPersonItem) => 
    <View style={styles.swapiItem}>
        <Button title="details" onPress={() => handleDetails(swapiItem)}></Button>
        <Text style={styles.swapiItemLabel}>{swapiItem.name}</Text>
    </View>

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SWAPI</Text>
            <View style={styles.buttons}>
            {urlPrevious != null && !isLoading
                ? <Button title="previous" onPress={() => handlePrevious()}></Button>
                : <Button disabled={true} title="previous" onPress={() => handlePrevious()}></Button>}
                {urlNext != null && !isLoading
                ? <Button  title="next" onPress={() => handleNext()}></Button>
                : <Button disabled={true} title="next" onPress={() => handleNext()}></Button>}
            </View>
            <View>
                {isLoading ? 
                    <ActivityIndicator size="large" />
                    :
                    <FlatList 
                        ListHeaderComponent={<></>}
                        data={swapiList} renderItem= {({item}) => renderItem(item)}
                        ListFooterComponent={<></>}>
                    </FlatList>
                }
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Name: {currentPerson?.name}</Text>
                            <Text style={styles.modalText}>Gender: {currentPerson?.gender}</Text>
                            <Text style={styles.modalText}>height: {currentPerson?.height}</Text>
                            <Text style={styles.modalText}>mass: {currentPerson?.mass}</Text>
                            <Text style={styles.modalText}>birth year: {currentPerson?.birth_year}</Text>
                            <Text style={styles.modalText}>eye color: {currentPerson?.eye_color}</Text>
                            <Text style={styles.modalText}>skin color: {currentPerson?.skin_color}</Text>
                            <Text style={styles.modalText}>hair color: {currentPerson?.hair_color}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    padding: 10,
    },
    title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
    paddingTop: 35

    },
    buttons: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    swapiItem: {
        display: "flex",
        flexDirection: "row-reverse",
        flex: 1,
        justifyContent: "space-between",
        margin: 3
    },
    swapiItemLabel: {
        textAlignVertical: "center",
        flexGrow: 1,
        textAlign: "center",
        backgroundColor: "gainsboro"
    }
  });

export default SwapiScreen