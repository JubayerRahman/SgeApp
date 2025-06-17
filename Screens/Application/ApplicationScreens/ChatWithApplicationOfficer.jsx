import { View, Text } from 'react-native'
import React from 'react'
import { List } from 'react-native-paper'

const ChatWithApplicationOfficer = () => {
  return (
    <View style={{width:"95%", marginLeft:"auto", marginRight:"auto"}}>
                <List.Section
                theme={{ colors:{background:"#EEEEFF"}}}
                style={{backgroundColor:"#EEEEFF", borderWidth:1, borderRadius:20, borderColor:"#EEEEFF", overflow:"hidden"}}>
        
              <List.Accordion
                  style={{backgroundColor:"#EEEEFF", borderWidth:1, borderColor:"#EEEEFF", overflow:"hidden"}}
                  title={
                    <View style={{backgroundColor:"#EEEEFF"}}>
                      <Text style={{color:"#0052FF", fontFamily:"Montserrat_700Bold",}}>Chat With Application Officer</Text>
                    </View>
                  }
                  >
                </List.Accordion>
                </List.Section>
                </View>
  )
}

export default ChatWithApplicationOfficer