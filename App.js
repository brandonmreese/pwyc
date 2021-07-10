import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Pressable, Text, View, Image, Alert, SafeAreaView } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

var suggestedTotal;
var selectedTotal;

const buttonTransition = (props) => {
  switch(props.selection){
    case 0:
      props.navigation.navigate('Start', {suggestedPrice: props.getSuggestedPrice})
      break;
    case 1:
      props.navigation.navigate('Verification', {suggestedPrice: props.getSuggestedPrice, selectedPrice: props.getSelectedPrice})
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;

  }
  return (1);
}

const ChoiceButton = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}
        onPress={() => {
          props.setSelection(props.index);
          Alert.alert('Button with index ' + props.index + ' pressed. Suggested = $' + props.getSuggestedPrice)
          buttonTransition({selection: props.index, getSuggestedPrice: props.getSuggestedPrice, getSelectedPrice: props.getSelectedPrice, navigation:props.navigation})
        }}
        // disabled={props.getSelection != 0}
      >
        <Text style={styles.text}>{props.label}</Text>
      </Pressable>
    </View>
  );
}

const Logo = (props) => {
  return(
    <Image
        source={require('./assets/logo.png')}
        // TODO: Get permission to use logo
        style={{width: props.width, height: props.height, marginVertical: 0}}
      />
  )
}

const HomePage = ({ navigation }) => {
  const [getSelection, setSelection] = useState(0);
  const [getSuggestedPrice, setSuggestedPrice] = useState(null); // TODO: Fetch order total from SQUARE api
  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Welcome to</Text>
      <Logo width={225} height={200}/>
      <Text style={styles.bigText}>Waiting for transaction...</Text>
      <SafeAreaView>
        <CurrencyInput
          value={getSuggestedPrice}
          style={styles.inputBasic}
          onChangeValue={setSuggestedPrice}
          prefix="$"
          delimiter=","
          separator="."
          keyboardType="numeric"
          precision={2}
          onChangeText={(formattedValue) => {
            console.log(formattedValue);
          }}
        />
      </SafeAreaView>
      <ChoiceButton
        label="Submit mock transaction" index={0} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} navigation={navigation}
      />
    </View>
  );
}

const StartPage = ({ navigation, route }) => {
  const [getSelection, setSelection] = useState(0);
  const [getSuggestedPrice, setSuggestedPrice] = useState(route.params.suggestedPrice);
  const [getSelectedPrice, setSelectedPrice] = useState(route.params.suggestedPrice);
  return (
    <View style={styles.container}>
      <View style={styles.containerH}>
        <View style={styles.container}>
          <Text style={styles.totalText}>Suggested Total</Text>
          <CurrencyInput
            value={getSuggestedPrice}
            style={styles.currencyBox}
            editable={false}
            onChangeValue={setSuggestedPrice}
            prefix="$"
            delimiter=","
            separator="."
            keyboardType="numeric"
            precision={2}
            onChangeText={(formattedValue) => {
              console.log(formattedValue);
            }}
          />
        </View>
      <Logo width={135} height={120}/>
        <View style={styles.container}>
          <Text style={styles.totalText}>Your Total</Text>
          <CurrencyInput
            value={getSelectedPrice}
            style={styles.currencyBox}
            editable={false}
            onChangeValue={setSelectedPrice}
            prefix="$"
            delimiter=","
            separator="."
            keyboardType="numeric"
            precision={2}
            onChangeText={(formattedValue) => {
              console.log(formattedValue);
            }}
          />
        </View>
      </View>
        <View style={styles.container}>
        <ChoiceButton index={1} label={"I want to pay the suggested $"+getSuggestedPrice} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} getSelectedPrice={getSelectedPrice} navigation={navigation} />
        <ChoiceButton index={2} label="I want to pay more" getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
        <ChoiceButton index={3} label="I want to pay less" getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
        <ChoiceButton index={4} label="I want to pay with a token" getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
        <ChoiceButton index={5} label="I want to volunteer for my meal" getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const VerificationPage = ({ navigation, route }) => {
  const [getSelection, setSelection] = useState(0);
  const [getSuggestedPrice, setSuggestedPrice] = useState(route.params.suggestedPrice);
  const [getSelectedPrice, setSelectedPrice] = useState(route.params.selectedPrice);
  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Welcome to</Text>
      <Logo width={135} height={120}/>
      <ChoiceButton index={6} label={"Verify total $"+getSelectedPrice} getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
      <ChoiceButton index={0} label={"Go back"} getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
    </View>
  );
}

 const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="Verification" component={VerificationPage} />
    </Stack.Navigator>
    </NavigationContainer>
  );
  // const [getPage, setPage] = useState("verification");
  // switch(getPage){
  //   case "start":
  //   return (StartPage());
  //   case "verification":
  //   return (VerificationPage({selectedTotal:10.55}));
  //   case "home":
  //   return (HomePage());
  // }
  // return (null);
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  containerH: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  buttonContainer: {
    flex: 1,
    width: 640,
    borderRadius: 8,
    marginVertical: 16,
    elevation: 3,
    backgroundColor: 'black',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32
  },
  text: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  bigText: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    paddingHorizontal: 48,
  },
  inputBasic: {
    marginVertical: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    paddingHorizontal: 12,
    height: 54,
    width: 320,
  },
  currencyBox: {
    marginVertical: 8,
    fontSize: 30,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    paddingHorizontal: 12,
    height: 54,
    width: 160,
  },
});
