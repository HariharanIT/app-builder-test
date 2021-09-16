import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image} from "react-native";

import icons from '../assets/icons';
const {close} =icons;

const AnswerPoll = (props: any) => {

  const [modalVisible, setModalVisible] = useState(props.showModal);
  const [selectedOption, setSelecteOption] = useState(null)
  
  useEffect(() => {
    setModalVisible(props.showModal)
  }, [props.showModal])

  const renderItem = (item:any, index: number) => { 
    return(
      <View key={index.toString()} style={styles.itemContainer}>
         <TouchableOpacity style={styles.itemInnerContainer}  onPress={() => {
           if(selectedOption == item.text){
              setSelecteOption(null)
           }else{
              setSelecteOption(item.text)
           }
           }}>
            <View style={styles.circleView}>
              {
                item.text == selectedOption ? <View style={styles.dotFiller} />: null
              }
            </View>
            <Text style={styles.itemTextStyle}>
              {item.text}
            </Text>
          </TouchableOpacity>
      </View>
    )
  }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          props.onClose()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeIconContainer} onPress={() => {props.onClose()}}>
            <Image source={{uri: close}} style={styles.closeIcon}/>
            </TouchableOpacity>
            <View style={{width: '100%'}}>
            <Text style={styles.modalText}>Poll Title: {props.title}</Text>

            <Text style={{textAlign:'left'}}>Options</Text>
            </View>
            {props.options.map(renderItem)}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); props.onClose()} }
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  closeIconContainer:{
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30
  },
  closeIcon: {
    width: '100%', height: '100%', resizeMode:'contain'
  },
  itemContainer:{
    width: '100%', marginVertical: 10
  },
  itemInnerContainer:{
    flex:1, flexDirection: 'row'
  },
  itemTextStyle:{
    paddingHorizontal: 10
  },
  circleView:{
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
  },
  dotFiller: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    minWidth: '30%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 50
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  }
});

export default AnswerPoll;