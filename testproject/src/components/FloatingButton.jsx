import React from 'react'
import {Text, Image, TouchableOpacity} from 'react-native'
import icons from '../assets/icons';
const {question} =icons;
const FloatingButton = (props: any)=> {
    
    return(
        <TouchableOpacity
            style={{
                zIndex: 999,
                // borderWidth: 1,
                // borderColor: 'rgba(0,0,0,0.2)',
                width: 80,
                position: 'absolute',
                bottom: 10,
                right: 10,
                height: 80,
                // backgroundColor: '#fff',
                borderRadius: 100,
            }}
            onPress={()=>{props.onPress()}}
        >
            <Image
                source={{uri: question}}
                style={{width: '100%', height: '100%', resizeMode:'contain'}}
              />
            {/* <Text style={{marginTop: 15, paddingLeft: 10}}>{"Have a question?"}</Text> */}
        </TouchableOpacity>
    )
}
export default FloatingButton

