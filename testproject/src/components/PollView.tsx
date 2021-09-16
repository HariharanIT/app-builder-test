/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import React, { useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
import AnswerPoll from './AnswerPoll'
import icons from '../assets/icons';
const {add,deleteIcon} =icons;

const Poll = (props: any) => {
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  const isSmall = dim[0] < 700;

  const [showAnswerPoll, setshowAnswerPoll] = useState(false)
  const [pollTitle, setpollTitle] = useState("")
  const [pollOption, setpollOption] = useState("")
  const [pollOptions, setpollOptions] = useState([])
  
  return (
    <View
      style={
        Platform.OS === 'web'
          ? isSmall ? style.participantViewNative : style.participantView
          : style.participantViewNative
      }>
      <TouchableOpacity style={style.backButton}>
        {/* onPress={() => props.setSidePanel(SidePanelType.None)}> */}
        {/* <Image
          resizeMode={'contain'}
          style={style.backIcon}
          source={{uri: icons.backBtn}}
        /> */}
        <Text style={style.heading}>Poll</Text>
      </TouchableOpacity>
      <ScrollView style={{flex: 1}}>
        <View style={style.pollTitleContainer}>
            <TextInput style={style.pollInput} value={pollTitle} placeholder="Title" onChangeText={(e)=> {setpollTitle(e)}} />
        </View>
        <View style={style.optionInputContainer}>
            <View style={style.optionInputInnerContainer}>
                <TextInput  style={style.optionInput}  value={pollOption} placeholder="Poll Option" onChangeText={(e)=> {setpollOption(e)}} />
            </View>
            <View style={style.optionSubmitContainer}>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{ 
                    if(pollOption){
                        let temp = pollOptions
                        let obj = { 'text': pollOption}
                        temp.push(obj)
                        setpollOptions([...temp])
                        setpollOption("")
                    }
                }}>
                    <Image source={{uri: add}}  style={style.deleteIconStyle}/>
                </TouchableOpacity>
            </View>
        </View>
        {
            pollOptions.map((item, index)=>{
                return(
                    <View style={style.optionsContainer} key={index.toString()}>
                        <View style={{flex:2}}>
                            <Text style={{padding: 10}}>{index+1}{"."}{item.text}</Text>
                        </View>
                        <View style={{flex:1}}>
                        <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{ 
                            let temp = pollOptions
                            temp = pollOptions.filter((item,i) => i != index )
                            setpollOptions([...temp])
                        }}>
                              <Image source={{uri: deleteIcon}}  style={style.deleteIconStyle}/>
                        </TouchableOpacity>
                        </View>
                    </View>
                )
            })
        }

        <View>
          <TouchableOpacity style={style.submitBtnContainer} onPress={()=>{setshowAnswerPoll(true)}}>
            <Text style={style.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <AnswerPoll title={pollTitle} options={pollOptions} showModal={showAnswerPoll} onClose={()=>{setshowAnswerPoll(false)}}/>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  optionSubmitContainer:{
    flex:1, justifyContent: 'center', marginLeft: 5
  },
  optionInput:{
    padding:10, fontSize: 16, borderBottomColor: 'grey', borderBottomWidth: 0.5
  },
  optionInputInnerContainer:{
    flex:2, alignSelf: 'center', justifyContent: 'center'
  },
  optionInputContainer:{
    flex:1, width: '90%', marginVertical: 20, flexDirection: 'row', justifyContent: 'center', alignSelf:'center'
  },
  pollTitleContainer:{
    flex:1, width: '90%', marginVertical: 20, justifyContent:'center', alignSelf: 'center'
  },
  pollInput:{
    padding:10, fontSize: 16, borderBottomColor: 'grey', borderBottomWidth: 0.5
  },
  deleteIconStyle:{
    width: 30,height: 30
  },
  submitBtnContainer:{
    alignSelf:'center', backgroundColor:'blue', borderRadius: 10
  },
  submitBtnText:{
    color:'white', fontSize: 16, textAlign: 'center', padding: 10
  },
  optionsContainer:{
    padding: 10,flex:1, flexDirection: 'row', justifyContent:'center', marginVertical: 5
  },
  participantView: {
    width: '20%',
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    flex: 1,
    paddingTop: 20,
    shadowColor: $config.PRIMARY_FONT_COLOR + '80',
    shadowOpacity: 0.5,
    shadowOffset: {width: -2, height: 0},
    shadowRadius: 3,
    // borderLeftWidth: 1
  },
  participantViewNative: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: '100%',
    right: 0,
    top: 0,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: $config.PRIMARY_FONT_COLOR,
  },
  backButton: {
    // marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backIcon: {
    width: 20,
    height: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    tintColor: $config.PRIMARY_FONT_COLOR,
  },
});

export default Poll;
