import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Modal, Pressable, View, Text, StyleSheet, ScrollView, FlatList, StatusBar } from 'react-native'

const URL = 'https://backend-dwi-production.up.railway.app/api/category';

const Categorias = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [body, setBody] = useState({ categoryName: '' });
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(URL)
      .then(res => {
        setData(res.data.data)
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
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const renderItem = (itemData) => {
    return (
      <View style={styles.containerFlate}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Categoria</Text>
          <Text style={styles.title}>Nombre: {itemData.item.name}</Text>
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
              <Text style={styles.modalText}>NUEVA CATEGORIA</Text>
              <input
                style={styles.input}
                name="categoryName"
                value={body.categoryName}
                onChange={inputChange}
                placeholder="Nombre Categoria"
              />
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
                    onClick={onSubmit}
                  >Aceptar</Text>
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

export default Categorias;