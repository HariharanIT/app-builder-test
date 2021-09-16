import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, Image, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import icons from '../assets/icons';
const {close, thumbsUp} =icons;

const Questions = (props: any) => {
  const [modalVisible, setModalVisible] = useState(props.showModal);
  const [inputValue, setinputValue] = useState("")
  const [questions, setQuestions] = useState([
      {
          questionId: '1',
          question: 'How the connection logic work behind the scences',
          votes: 0
      },
      {
        questionId: '2',
        question: 'Can you explain about the graphql',
        votes: 0
      }
  ])




  const renderItem = ({item, index}: any) => {
    return(
        <View style={{flex:1, width: '100%', flexDirection: 'row',  marginVertical: 5}}>
          <View style={{flex:2, }}>
            <Text style={{fontSize: 16}}>{index+1}{"."}{item.question}</Text>
          </View>
          <View style={{flex: 0.5, alignSelf:'center'}}>
            <Text style={{color: 'black', textAlign:'center', fontSize: 16}}>Votes: {item.votes}</Text>
          </View>
          <View style={{flex:0.5, flexDirection:'row', alignSelf: 'center'}}>
            <TouchableOpacity 
              style={{borderRadius: 5, alignSelf:'center'}}
              onPress={()=>{
                let tempData = questions
                let count = tempData[index].votes
                tempData[index].votes = count + 1
                setQuestions([...tempData])
              }}
            > 
            <Image source={{uri: thumbsUp}}
                style={{width: 25, height: 25, resizeMode: 'contain'}}/>
            </TouchableOpacity>
            
          </View>            
          
        </View>
    )
  }

  useEffect(()=>{
    setModalVisible(props.showModal)
  },[props.showModal])
  
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
            <View style={{}}>
              <Text style={styles.quesTextStyle}> Questions </Text>
            </View>  
            <FlatList data={questions.sort((a,b) => b.votes - a.votes)} renderItem={renderItem}  keyExtractor={item=>item.questionId}/>
            <View style={styles.questionContainer}>
                <View style={styles.quesInputContainer}>
                    <TextInput style={styles.quesInput} placeholder={"Have a Question?"} value={inputValue} onChangeText={(e)=>{setinputValue(e)}} />
                </View>                
                <View style={{flex:1 , marginHorizontal: 20}}>
                    <TouchableOpacity style={styles.askContainer} onPress={() =>{ 
                        if(inputValue){
                            setQuestions([...questions,{questionId: (Math.random() * 8).toString(),votes: 0,
                                question: inputValue}])
                            setinputValue("")
                        }
                    }} ><Text style={styles.askTextStyle}>Ask</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    closeIcon:{
      width: '100%', height: '100%', resizeMode:'contain'
    },
    quesTextStyle:{
      fontSize: 18, marginVertical: 10
    },
    questionContainer:{
      flex:1, width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-around'
    },
    quesInputContainer:{
      flex:2
    },
    quesInput:{
      fontSize: 16, padding: 5, borderBottomColor: 'grey', borderBottomWidth: 0.3
    },
    askContainer:{
      backgroundColor: 'blue', padding: 5 , borderRadius: 5
    },
    askTextStyle:{
      color: 'white', textAlign:'center', fontSize: 16
    },
  centeredView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginHorizontal: 10,
    marginVertical: 10
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    padding: 35,
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Questions;