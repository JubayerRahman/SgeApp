import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoagingScreen from '../../../components/LoagingScreen'
import { List } from 'react-native-paper';

const StudentCourseDetails = ({data}) => {

  console.log(data.application_id);
  
  
    
  return (
    <View style={{width:"95%", marginLeft:"auto", marginRight:"auto"}}>
      {!data.application_id?
      <LoagingScreen/>
      :
      <List.Section
      theme={{
        colors:{background:"#EEEEFF"}
      }}
        style={{backgroundColor:"#EEEEFF", borderWidth:1, borderRadius:20, borderColor:"#EEEEFF", overflow:"hidden"}}
      >
        <List.Accordion
        style={{backgroundColor:"#EEEEFF", borderWidth:1, borderColor:"#EEEEFF", overflow:"hidden"}}
        title={
          <View style={{backgroundColor:"#EEEEFF"}}>
            <Text style={{color:"#0052FF", fontFamily:"Montserrat_700Bold",}}>Student/Course Details</Text>
          </View>
        }
        >
      <View style={styles.container}>
      <Text style={styles.text}><Text style={styles.lableText}>Application ID: </Text> {data?.application_id}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Student ID: </Text> {data?.student?.student_id}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Student Name: </Text> {data?.student?.first_name} {data?.student?.last_name} </Text>
      <Text style={styles.text}><Text style={styles.lableText}>Student E-Mail: </Text> {data?.student?.email} </Text>
      <Text style={styles.text}><Text style={styles.lableText}>Student Address: </Text> {data?.student?.address} </Text>
      <Text style={styles.text}><Text style={styles.lableText}>Communication E-Mail ID: </Text> </Text>
      <Text style={styles.text}><Text style={styles.lableText}>Communication Phone No:	 </Text> </Text>
      <Text style={styles.text}><Text style={styles.lableText}>University Name: </Text> {data?.university?.name}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Course Name: </Text> {data?.course?.name}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Intake Name: </Text> {data?.intake?.name}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Date Added: </Text> {data?.created_at}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Student Passport No: </Text> {data?.student?.passport_no}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Student Date of Birth: </Text> {data?.student?.date_of_birth} </Text>
      <Text style={styles.text}><Text style={styles.lableText}>Student Phone No: </Text> {data?.student?.whatsapp_number} </Text>
      <Text style={styles.text}><Text style={styles.lableText}>Student City & Country: </Text> {data?.student?.city}, {data?.student?.country} </Text>
      <Text style={styles.text}><Text style={styles.lableText}>Compliance Officer: </Text> {data?.compliance_officer=== null? "No compliance officer assigned	": data?.compliance_officer}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Application Officer: </Text> {data?.application_officer?.full_name=== null? "No application officer assigned	": data?.application_officer?.full_name}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Application Controll Officer: </Text> {data?.application_control_officer?.full_name== null? "No application control officer assigned	": data?.application_control_officer?.full_name}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Counsellor: </Text> {data?.user?.full_name}</Text>
      <Text style={styles.text}><Text style={styles.lableText}>Application Age:	</Text> {data?.ageing}</Text>
    </View>
        </List.Accordion>
      </List.Section>
      }
    </View>
  )
}

export default StudentCourseDetails

const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor:"#E8E8F1"
    },
    lableText:{
        fontFamily: "Montserrat_700Bold",
    },
    text:{
        fontFamily: "Montserrat_400Regular",
        borderBottomColor:"#FFFFFF",
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    }
})