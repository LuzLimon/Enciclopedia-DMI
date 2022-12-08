import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Button,
} from "react-native";
import axios from "axios";

const URL = "https://backend-dwi-production.up.railway.app/api/forum";

export default function Foro() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(URL)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const renderItem = (item) => {
        return (
            <View style={styles.containerFlate}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>
                        Nombre Del foro:{item.item.forumName}{" "}
                    </Text>
                    <Text style={styles.title}>Autor: {item.item.authorName}</Text>
                    <Text style={styles.title}>Tema: {item.item.topic}</Text>
                    <Text style={styles.title}>
                        Publicacion: {item.item.publicationDate}
                    </Text>
                    <Button
                        title="Hacer un comentario"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    ></Button>
                </View>
            </View>
        );
    };

    const [] = useState(false);
    return (
        <View style={styles.centeredView}>
            <ScrollView>
                <View style={styles.container}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    ></FlatList>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 20,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    centeredView: {
        backgroundColor: "#FFF0F5",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
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
        backgroundColor: "#6495ed",
    },
    buttonClose: {
        backgroundColor: "#6495ed",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    fixToText: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonHover: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
    },
    containerFlate: {
        flex: 1,
        margin: 16,
        height: 150,
        width: 320,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: "#9370db",
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
    },
    buttonStyle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: "100%",
        marginTop: 400,
    },
    innerContainer: {
        flex: 1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
    },
});