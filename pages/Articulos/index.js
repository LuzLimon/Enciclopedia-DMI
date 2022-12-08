import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Modal, Pressable, View, Text, StyleSheet, ScrollView, FlatList, StatusBar } from 'react-native'
// import { CheckBox } from "react-native-elements"

const URL = 'https://backend-dwi-production.up.railway.app/api/article';

const Articulos = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [body, setBody] = useState({ articleName: '' });
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(URL)
            .then(res => {
                setData(res.data.data)
                console.log(res.data.data)
            })
            .catch(err => console.log(err));
    }, [])

    const inputChange = ({ target }) => {
        const { name, value } = target;
        setBody({
            ...body,
            [name]: value,
        });
    };

    const onSubmit = () => {
        axios.post(URL, body)
            .then(({ data }) => {
                console.log(data);
                window.location.reload();
            })
            .catch(({ response }) => {
                console.log(response);
            });
    };

    const renderItem = (itemData) => {
        return (
            <View style={styles.containerFlate}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Articulo</Text>
                    <Text style={styles.title}>Nombre Articulo: {itemData.item.name}</Text>
                    <Text style={styles.title}>Fecha: {itemData.item.date}</Text>
                    <Text style={styles.title}>Contenido: {itemData.item.content}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.centeredView}>
                <ScrollView>
                    <View style={styles.container}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                        <StatusBar />
                    </View>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>NUEVO ARTICULOS</Text>
                            <input
                                style={styles.input}
                                name="articleName"
                                value={body.articleName}
                                onChange={inputChange}
                                placeholder="Nombre Articulo"
                            />
                            {/* <select
                                style={styles.inputSelect}
                                name="articleName"
                                value={body.articleName}
                                onChange={inputChange}
                                placeholder="Categorias"
                                >
                                <option>Option 1 </option>
                                <option>Option 2 </option>
                                <option>Option 3 </option>
                            </select> */}
                            {/* <CheckBox
                                title="Articulo Publico"
                                center
                                checkedIcon="dot-circule-o"
                                uncheckedIcon="circle-o"
                            /> */}
                            <View style={styles.fixToText}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text 
                                    style={styles.textStyle}
                                    onClick={onSubmit}>Aceptar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.buttonHover}>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>+</Text>
                    </Pressable>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 20,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    centeredView: {
        backgroundColor: '#FFF0F5',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
        textAlign: "center"
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonHover: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold"
    },
    containerFlate: {
        flex: 1,
        margin: 16,
        height: 150,
        width: 320,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: '#9370db',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: '100%',
        marginTop: 400,
    },
    innerContainer: {
        flex: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
});

export default Articulos;