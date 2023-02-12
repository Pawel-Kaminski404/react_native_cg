import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";





const SwapiScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    const [swapiList, setSwapiList] = useState<SwapiPersonItem[]>([]);
    const [urlNext, setUrlNext] = useState("")
    const [urlPrevious, setUrlPrevious] = useState("")

    
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
                tempList = [...tempList, { id: getNewIndex(), name: person["name"], gender: person["gender"], url: person["url"] }];
            }
            setSwapiList(tempList);
            setUrlNext(response["next"]);
            setUrlPrevious(response["previous"]);
        }
    }, [response]);
    
    const getContent = () => {
      if (isLoading) {
        return <ActivityIndicator size="large" />;
      }
    
      if (error) {
        return <Text>{error}</Text>
      }
      
      return <Text>Something went wrong.</Text>;
    };

    const handleNext = () => {
        setSwapiList([]);
        callApi(urlNext);
        console.log(urlNext)
    }
    const handlePrevious = () => {
        setSwapiList([]);
        callApi(urlPrevious);
        console.log(urlPrevious)
    }

    const renderItem = (swapiItem: SwapiPersonItem) => 
    <View>
        <Text>{swapiItem.name}</Text>
        <Button title="details" onPress={() => console.log(swapiItem.url)}></Button>
    </View>

    return (
        <View>
            {/* {getContent()} */}
            {urlNext != null 
            ? <Button title="next" onPress={() => handleNext()}></Button>
            : <Button disabled={true} title="next" onPress={() => handleNext()}></Button>}
            {urlPrevious != null 
            ? <Button title="previous" onPress={() => handlePrevious()}></Button>
            : <Button disabled={true} title="previous" onPress={() => handlePrevious()}></Button>}

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
        </View>
    );
};

export default SwapiScreen