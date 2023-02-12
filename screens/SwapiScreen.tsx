import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, Button, Modal, Pressable, StyleSheet } from "react-native";
import uuid from 'react-native-uuid';


const SwapiScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isModalLoading, setIsModalLoading] = useState(true);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    const [itemResponse, setItemResponse] = useState();
    const [swapiList, setSwapiList] = useState<SwapiItem[]>([]);
    const [urlNext, setUrlNext] = useState("")
    const [urlPrevious, setUrlPrevious] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPerson, setCurrentPerson] = useState<SwapiPersonItem>();
    const [currentPlanet, setCurrentPlanet] = useState<SwapiPlanetItem>();
    const [currentMode, setCurrentMode] = useState("people");

    const peopleUrl = "https://swapi.dev/api/people";
    const planetsUrl = "https://swapi.dev/api/planets";
    
    useEffect(() => {
        setIsLoading(true)
        callApi(peopleUrl, setResponse);
    }, []);

    const callApi = (url: string, setter: React.Dispatch<React.SetStateAction<undefined>>) => {
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoading(false);
            setIsModalLoading(false);
            setter(result);
          },
          (error) => {
            setIsLoading(false);
            setIsModalLoading(false);
            setError(error);
          }
        )
    }
    
    useEffect(() => {
        if(response){
            let items = response["results"];
            let tempList = [...swapiList];
            for (let item of [...items]){
                tempList = [...tempList, { 
                    id: uuid.v4(), 
                    name: item["name"], 
                    url: item["url"], 
                }];
            }
            setSwapiList(tempList);
            setUrlNext(response["next"]);
            setUrlPrevious(response["previous"]);
        }
    }, [response]);

    useEffect(() => {
        if (itemResponse){
            if(currentMode == "people"){
                setCurrentPerson({
                    name: itemResponse["name"],
                    gender: itemResponse["gender"],
                    height: itemResponse["height"],
                    mass: itemResponse["mass"],
                    birth_year: itemResponse["birth_year"],
                    eye_color: itemResponse["eye_color"],
                    skin_color: itemResponse["skin_color"],
                    hair_color: itemResponse["hair_color"],
                });
            } else if (currentMode == "planets") {
                setCurrentPlanet({
                    name: itemResponse["name"],
                    rotation_period: itemResponse["rotation_period"],
                    orbital_period: itemResponse["orbital_period"],
                    diameter: itemResponse["diameter"],
                    climate: itemResponse["climate"],
                    gravity: itemResponse["gravity"],
                    terrain: itemResponse["terrain"],
                    surface_water: itemResponse["surface_water"],
                    population: itemResponse["population"]
                })
            }
        }
    }, [itemResponse]);

    useEffect(() => {
        setIsLoading(true);
        if(currentMode == "people"){
            setSwapiList([]);
            callApi(peopleUrl, setResponse);
        }
        if(currentMode == "planets"){
            setSwapiList([]);
            callApi(planetsUrl, setResponse);
        }
    }, [currentMode]);

    const handleNext = () => {
        setIsLoading(true)
        setSwapiList([]);
        callApi(urlNext, setResponse);
    }
    const handlePrevious = () => {
        setIsLoading(true)
        setSwapiList([]);
        callApi(urlPrevious, setResponse);
    }

    const handleDetails = async (swapiItem: SwapiItem) => {
        setIsModalLoading(true);
        await callApi(swapiItem.url, setItemResponse)
        setModalVisible(true);
    }

    const renderItem = (swapiItem: SwapiItem) => 
        <View style={styles.swapiItem}>
            <Button title="details" onPress={async () => await handleDetails(swapiItem)}></Button>
            <Text style={styles.swapiItemLabel}>{swapiItem.name}</Text>
        </View>

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SWAPI</Text>
            <View style={styles.buttons}>
                {currentMode == "people" ? 
                    <Button title="people" onPress={() => {setCurrentMode("people")}} disabled={true}></Button>
                :   <Button title="people" onPress={() => {setCurrentMode("people")}}></Button>}
                {currentMode == "planets" ? 
                    <Button title="planets" onPress={() => {setCurrentMode("planets")}} disabled={true}></Button>
                :   <Button title="planets" onPress={() => {setCurrentMode("planets")}}></Button>}
            </View>
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
                            {isModalLoading && <ActivityIndicator size={"large"}></ActivityIndicator>}
                            {currentMode == "people" && !isModalLoading && <>
                            <Text style={styles.modalText}>Name: {currentPerson?.name}</Text>
                            <Text style={styles.modalText}>Gender: {currentPerson?.gender}</Text>
                            <Text style={styles.modalText}>height: {currentPerson?.height}</Text>
                            <Text style={styles.modalText}>mass: {currentPerson?.mass}</Text>
                            <Text style={styles.modalText}>birth year: {currentPerson?.birth_year}</Text>
                            <Text style={styles.modalText}>eye color: {currentPerson?.eye_color}</Text>
                            <Text style={styles.modalText}>skin color: {currentPerson?.skin_color}</Text>
                            <Text style={styles.modalText}>hair color: {currentPerson?.hair_color}</Text>
                            </>}
                            {currentMode == "planets" && !isModalLoading && <>
                            <Text style={styles.modalText}>Name: {currentPlanet?.name}</Text>
                            <Text style={styles.modalText}>rotation_period: {currentPlanet?.rotation_period}</Text>
                            <Text style={styles.modalText}>orbital_period: {currentPlanet?.orbital_period}</Text>
                            <Text style={styles.modalText}>diameter: {currentPlanet?.diameter}</Text>
                            <Text style={styles.modalText}>climate: {currentPlanet?.climate}</Text>
                            <Text style={styles.modalText}>gravity: {currentPlanet?.gravity}</Text>
                            <Text style={styles.modalText}>terrain: {currentPlanet?.terrain}</Text>
                            <Text style={styles.modalText}>surface_water: {currentPlanet?.surface_water}</Text>
                            <Text style={styles.modalText}>population: {currentPlanet?.population}</Text>
                            </>}
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