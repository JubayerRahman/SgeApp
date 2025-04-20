import {Text, StyleSheet, Button, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import logo from "../../assets//AGELogo.svg"
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
// import { Axios } from 'axios';

const Register = () => {

  const navigation = useNavigation();
      const [Firstname, setFirstname] = useState('');
      const [Lastname, setLastname] = useState('');
      const [MobileNumber, setMobileNumber] = useState('');
      const [WhatsAppNumber, setWhatsAppNumber] = useState('');
      const [email, setEmail] = useState('');
      const [companyName, setCompanyName] = useState('');
      const [Website, setWebsite] = useState('');
      const [Address, setAddress] = useState('');
      const [PostCode, setPostCode] = useState('');
      const [City, setCity] = useState('');
      const [password, setPassword] = useState('');
      const [Confirmpassword, setConfirmpassword] = useState('');
      const [SlectdCountry, setSelectedCountry] = useState("")
      const [RecruitCountry, setRecruitCountry] = useState([])
      const [passView, setPassView] = useState(true)
      const [passView2, setPassView2] = useState(true)
      const [eyeColor, setEyeColor] = useState("#4F8EF7")
      const [eyeColor2, setEyeColor2] = useState("#4F8EF7")

      
      const countriesList = [
        { key: 1, value: "Afghanistan" },
        { key: 2, value: "Albania" },
        { key: 3, value: "Algeria" },
        { key: 4, value: "Andorra" },
        { key: 5, value: "Angola" },
        { key: 6, value: "Antigua and Barbuda" },
        { key: 7, value: "Argentina" },
        { key: 8, value: "Armenia" },
        { key: 9, value: "Australia" },
        { key: 10, value: "Austria" },
        { key: 11, value: "Azerbaijan" },
        { key: 12, value: "Bahamas" },
        { key: 13, value: "Bahrain" },
        { key: 14, value: "Bangladesh" },
        { key: 15, value: "Barbados" },
        { key: 16, value: "Belarus" },
        { key: 17, value: "Belgium" },
        { key: 18, value: "Belize" },
        { key: 19, value: "Benin" },
        { key: 20, value: "Bhutan" },
        { key: 21, value: "Bolivia" },
        { key: 22, value: "Bosnia and Herzegovina" },
        { key: 23, value: "Botswana" },
        { key: 24, value: "Brazil" },
        { key: 25, value: "Brunei" },
        { key: 26, value: "Bulgaria" },
        { key: 27, value: "Burkina Faso" },
        { key: 28, value: "Burundi" },
        { key: 29, value: "Cabo Verde" },
        { key: 30, value: "Cambodia" },
        { key: 31, value: "Cameroon" },
        { key: 32, value: "Canada" },
        { key: 33, value: "Central African Republic" },
        { key: 34, value: "Chad" },
        { key: 35, value: "Chile" },
        { key: 36, value: "China" },
        { key: 37, value: "Colombia" },
        { key: 38, value: "Comoros" },
        { key: 39, value: "Congo (Congo-Brazzaville)" },
        { key: 40, value: "Costa Rica" },
        { key: 41, value: "Croatia" },
        { key: 42, value: "Cuba" },
        { key: 43, value: "Cyprus" },
        { key: 44, value: "Czech Republic" },
        { key: 45, value: "Democratic Republic of the Congo" },
        { key: 46, value: "Denmark" },
        { key: 47, value: "Djibouti" },
        { key: 48, value: "Dominica" },
        { key: 49, value: "Dominican Republic" },
        { key: 50, value: "Ecuador" },
        { key: 51, value: "Egypt" },
        { key: 52, value: "El Salvador" },
        { key: 53, value: "Equatorial Guinea" },
        { key: 54, value: "Eritrea" },
        { key: 55, value: "Estonia" },
        { key: 56, value: "Eswatini" },
        { key: 57, value: "Ethiopia" },
        { key: 58, value: "Fiji" },
        { key: 59, value: "Finland" },
        { key: 60, value: "France" },
        { key: 61, value: "Gabon" },
        { key: 62, value: "Gambia" },
        { key: 63, value: "Georgia" },
        { key: 64, value: "Germany" },
        { key: 65, value: "Ghana" },
        { key: 66, value: "Greece" },
        { key: 67, value: "Grenada" },
        { key: 68, value: "Guatemala" },
        { key: 69, value: "Guinea" },
        { key: 70, value: "Guinea-Bissau" },
        { key: 71, value: "Guyana" },
        { key: 72, value: "Haiti" },
        { key: 73, value: "Honduras" },
        { key: 74, value: "Hungary" },
        { key: 75, value: "Iceland" },
        { key: 76, value: "India" },
        { key: 77, value: "Indonesia" },
        { key: 78, value: "Iran" },
        { key: 79, value: "Iraq" },
        { key: 80, value: "Ireland" },
        { key: 81, value: "Israel" },
        { key: 82, value: "Italy" },
        { key: 83, value: "Jamaica" },
        { key: 84, value: "Japan" },
        { key: 85, value: "Jordan" },
        { key: 86, value: "Kazakhstan" },
        { key: 87, value: "Kenya" },
        { key: 88, value: "Kiribati" },
        { key: 89, value: "Kuwait" },
        { key: 90, value: "Kyrgyzstan" },
        { key: 91, value: "Laos" },
        { key: 92, value: "Latvia" },
        { key: 93, value: "Lebanon" },
        { key: 94, value: "Lesotho" },
        { key: 95, value: "Liberia" },
        { key: 96, value: "Libya" },
        { key: 97, value: "Liechtenstein" },
        { key: 98, value: "Lithuania" },
        { key: 99, value: "Luxembourg" },
        { key: 100, value: "Madagascar" },
        { key: 101, value: "Malawi" },
        { key: 102, value: "Malaysia" },
        { key: 103, value: "Maldives" },
        { key: 104, value: "Mali" },
        { key: 105, value: "Malta" },
        { key: 106, value: "Marshall Islands" },
        { key: 107, value: "Mauritania" },
        { key: 108, value: "Mauritius" },
        { key: 109, value: "Mexico" },
        { key: 110, value: "Micronesia" },
        { key: 111, value: "Moldova" },
        { key: 112, value: "Monaco" },
        { key: 113, value: "Mongolia" },
        { key: 114, value: "Montenegro" },
        { key: 115, value: "Morocco" },
        { key: 116, value: "Mozambique" },
        { key: 117, value: "Myanmar" },
        { key: 118, value: "Namibia" },
        { key: 119, value: "Nauru" },
        { key: 120, value: "Nepal" },
        { key: 121, value: "Netherlands" },
        { key: 122, value: "New Zealand" },
        { key: 123, value: "Nicaragua" },
        { key: 124, value: "Niger" },
        { key: 125, value: "Nigeria" },
        { key: 126, value: "North Korea" },
        { key: 127, value: "North Macedonia" },
        { key: 128, value: "Norway" },
        { key: 129, value: "Oman" },
        { key: 130, value: "Pakistan" },
        { key: 131, value: "Palau" },
        { key: 132, value: "Palestine State" },
        { key: 133, value: "Panama" },
        { key: 134, value: "Papua New Guinea" },
        { key: 135, value: "Paraguay" },
        { key: 136, value: "Peru" },
        { key: 137, value: "Philippines" },
        { key: 138, value: "Poland" },
        { key: 139, value: "Portugal" },
        { key: 140, value: "Qatar" },
        { key: 141, value: "Romania" },
        { key: 142, value: "Russia" },
        { key: 143, value: "Rwanda" },
        { key: 144, value: "Saint Kitts and Nevis" },
        { key: 145, value: "Saint Lucia" },
        { key: 146, value: "Saint Vincent and the Grenadines" },
        { key: 147, value: "Samoa" },
        { key: 148, value: "San Marino" },
        { key: 149, value: "Sao Tome and Principe" },
        { key: 150, value: "Saudi Arabia" },
        { key: 151, value: "Senegal" },
        { key: 152, value: "Serbia" },
        { key: 153, value: "Seychelles" },
        { key: 154, value: "Sierra Leone" },
        { key: 155, value: "Singapore" },
        { key: 156, value: "Slovakia" },
        { key: 157, value: "Slovenia" },
        { key: 158, value: "Solomon Islands" },
        { key: 159, value: "Somalia" },
        { key: 160, value: "South Africa" },
        { key: 161, value: "South Korea" },
        { key: 162, value: "South Sudan" },
        { key: 163, value: "Spain" },
        { key: 164, value: "Sri Lanka" },
        { key: 165, value: "Sudan" },
        { key: 166, value: "Suriname" },
        { key: 167, value: "Sweden" },
        { key: 168, value: "Switzerland" },
        { key: 169, value: "Syria" },
        { key: 170, value: "Tajikistan" },
        { key: 171, value: "Tanzania" },
        { key: 172, value: "Thailand" },
        { key: 173, value: "Timor-Leste" },
        { key: 174, value: "Togo" },
        { key: 175, value: "Tonga" },
        { key: 176, value: "Trinidad and Tobago" },
        { key: 177, value: "Tunisia" },
        { key: 178, value: "Turkey" },
        { key: 179, value: "Turkmenistan" },
        { key: 180, value: "Tuvalu" },
        { key: 181, value: "Uganda" },
        { key: 182, value: "Ukraine" },
        { key: 183, value: "United Arab Emirates" },
        { key: 184, value: "United Kingdom" },
        { key: 185, value: "United States of America" },
        { key: 186, value: "Uruguay" },
        { key: 187, value: "Uzbekistan" },
        { key: 188, value: "Vanuatu" },
        { key: 189, value: "Vatican City" },
        { key: 190, value: "Venezuela" },
        { key: 191, value: "Vietnam" },
        { key: 192, value: "Yemen" },
        { key: 193, value: "Zambia" },
        { key: 194, value: "Zimbabwe" }
      ];

      const signUpFunc =()=>{
        if(Firstname ==="", Lastname==="", MobileNumber ==="", WhatsAppNumber ==="", email ==="", companyName ==="",Website ==="", Address ==="",PostCode ==="",City ==="", password ==="", Confirmpassword ==="", SlectdCountry ==="", RecruitCountry ==="", Confirmpassword===""){
          Alert.alert("Fill All the fileds first")
        }
        else{
          const Allinfo = {"firstName":Firstname, "lastName": Lastname, "mobileNumber":MobileNumber, "whatsappNumber":WhatsAppNumber, email, companyName,"website":Website, "address":Address, "postCode":PostCode, "city":City, password, "country":SlectdCountry,"recruitCountries": RecruitCountry, "confirmPassword": Confirmpassword}
  
          axios.post("https://dev.shabujglobal.org/api/register", Allinfo, {timeout: 5000})
          .then(res=>{
            console.log(res.data)
            if (res.data.message === "User Registration Successful") {
              Alert.alert("User Registration Successful")
            }
          })
          .catch(error=> {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong, babe 💔";
            Alert.alert( msg);
          })
          console.log(Allinfo);
          
          
        }
        
      }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
              <KeyboardAvoidingView behavior={Platform.OS==="android" ? "height" : "padding"}></KeyboardAvoidingView>
              <View>
                  <View style={styles.logoDiv}>
                      <Image style={styles.logo} source={require("../../assets//AGELogo.png")}/>
                      <Text style={styles.logoText}>Shabuj Global</Text>
                  </View>
                  <Text style={styles.welcomeText}>Welcome to Shabuj Global! 👋🏻</Text>
                  <Text style={{fontFamily: 'Montserrat_700Bold', marginTop:20, fontSize:20, fontWeight:"600", letterSpacing:1}}>Personal Information</Text>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="First name"
                      value={Firstname}
                      onChangeText={setFirstname}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Last name"
                      value={Lastname}
                      onChangeText={setLastname}/>
                  <TextInput
                      keyboardType='email-address'
                      style={styles.input}
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}/>
                  <TextInput
                      keyboardType='number-pad'
                      style={styles.input}
                      placeholder="Number"
                      value={MobileNumber}
                      onChangeText={setMobileNumber}/>
                  <TextInput
                      keyboardType='number-pad'
                      style={styles.input}
                      placeholder="WhatsApp Number"
                      value={WhatsAppNumber}
                      onChangeText={setWhatsAppNumber}/>
                  <View>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Password"
                      value={password}
                      secureTextEntry= {passView}
                      onChangeText={setPassword}/>
                      <TouchableOpacity style={{position:"absolute", top:"25%", left:"85%"}}>
                        <Icon onPress={()=>{setPassView(!passView); passView? setEyeColor("black"): setEyeColor("#4F8EF7")}} name="eye" size={30} color={eyeColor}/>
                      </TouchableOpacity>
                  </View>
                  <View>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Confirm Password"
                      value={Confirmpassword}
                      secureTextEntry= {passView2}
                      onChangeText={setConfirmpassword}/>
                      <TouchableOpacity style={{position:"absolute", top:"25%", left:"85%"}}>
                        <Icon onPress={()=>{setPassView2(!passView2); passView2? setEyeColor2("black"): setEyeColor2("#4F8EF7")}} name="eye" size={30} color={eyeColor2}/>
                      </TouchableOpacity>
                  </View>
                  <Text style={{fontFamily: 'Montserrat_700Bold', marginTop:20, fontSize:20, fontWeight:"600", letterSpacing:1}}>Company Details</Text>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter Company Name"
                      value={companyName}
                      onChangeText={setCompanyName}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter Website Name"
                      value={Website}
                      onChangeText={setWebsite}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter Address"
                      value={Address}
                      onChangeText={setAddress}/>
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter Post Code"
                      value={PostCode}
                      onChangeText={setPostCode}/>
                  <SelectList
                    style={styles.input}
                    setSelected={(val)=>setSelectedCountry(val)}
                    data={countriesList}
                    save='value'
                    placeholder='Select your country'
                  />
                  <TextInput
                      keyboardType='default'
                      style={styles.input}
                      placeholder="Enter City"
                      value={City}
                      onChangeText={setCity}/>
                  <Text style={{fontFamily: 'Montserrat_700Bold', marginTop:20, fontSize:20, fontWeight:"600", letterSpacing:1}}>Country you recruit for *</Text>
                  <MultipleSelectList
                    style={styles.input}
                    setSelected={(val)=>setRecruitCountry(val)}
                    data={countriesList}
                    save='value'
                    placeholder='Select recruit country'
                  />
              </View>
      
              <TouchableOpacity onPress={signUpFunc} style={{flexDirection:"row", backgroundColor:"#7367f0",  borderRadius:10, marginTop:10, marginBottom:10, padding:10,  justifyContent:"center", width:"90%"}}>
                <Text style={{fontFamily: 'Montserrat_400Regular', color:"white", fontSize:25, width:"auto", textAlign:"center" }}>Sign In</Text></TouchableOpacity>
      
              <TouchableOpacity style={{flexDirection:"row", marginBottom:20}}><Text style={{fontFamily: 'Montserrat_400Regular',}}>Already have an account? </Text><Text style={styles.links} onPress={()=> navigation.navigate("Home")}>Sign in instead</Text></TouchableOpacity>
          </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 50,
    height: 50
  },
  logoDiv:{
    marginLeft: "auto",
    marginRight:"auto",
    width: "90%",
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: "5%",
    height: "auto",
    marginBottom: 5
  },
  logoText:{
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2
  },
  welcomeText:{
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20
  },
  input: {
    height: 40,
    // width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  links:{
    fontFamily: 'Montserrat_400Regular',
    color: "#7367f0",
    alignItems:"flex-end",
    justifyContent:'flex-end',
  }
});

export default Register