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

const PageHeader = (props) => {
  const [getSuggestedPrice, setSuggestedPrice] = useState(props.getSuggestedPrice);
  const [getSelectedPrice, setSelectedPrice] = useState(props.getSelectedPrice);
  return(
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
  );
}

const centsRound = (amount) => {
  return (Math.round(amount*100)/100)
}

const buttonTransition = (props) => {
  switch(props.selection){
    case 0:
      props.navigation.navigate('Start', {suggestedPrice: props.getSuggestedPrice})
      break;
    case 1:
      props.navigation.navigate('Verification', {suggestedPrice: props.getSuggestedPrice, selectedPrice: props.getSuggestedPrice})
      break;
    case 2:
      props.navigation.navigate('Selection', {isMore:props.isMore, suggestedPrice: props.getSuggestedPrice, selectedPrice: props.getSuggestedPrice})
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      props.navigation.navigate('Verification', {suggestedPrice: props.getSuggestedPrice, selectedPrice: props.getSelectedPrice})
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
          console.log('Before: Button with index ' + props.index + ' pressed. Suggested = $' + props.getSuggestedPrice+ ', Selected = $' + props.getSelectedPrice);
          buttonTransition({ isMore: props.isMore, selection: props.index, getSuggestedPrice: props.getSuggestedPrice, getSelectedPrice: props.getSelectedPrice, setSelectedPrice: props.setSelectedPrice, navigation:props.navigation})
          console.log(' After: Button with index ' + props.index + ' pressed. Suggested = $' + props.getSuggestedPrice+ ', Selected = $' + props.getSelectedPrice);
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
      <Image
        source={require('./assets/logo.png')}
        style={{width: 225, height: 200, marginVertical: 10}}
      />
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
  const [getSelectedPrice, setSelectedPrice] = useState(null);
  return (
    <View style={styles.container}>
      <PageHeader getSuggestedPrice={getSuggestedPrice} setSuggestedPrice={setSuggestedPrice} getSelectedPrice={getSelectedPrice} setSelectedPrice={setSelectedPrice} />
      <View style={styles.container}>
        <ChoiceButton index={1} label={"I want to pay the suggested $"+getSuggestedPrice} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} getSelectedPrice={getSelectedPrice} setSelectedPrice={setSelectedPrice} navigation={navigation} />
        <ChoiceButton index={2} label="I want to pay more" isMore={true} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} getSelectedPrice={getSelectedPrice} setSelectedPrice={setSelectedPrice} navigation={navigation} />
        <ChoiceButton index={2} label="I want to pay less" isMore={false} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} getSelectedPrice={getSelectedPrice} setSelectedPrice={setSelectedPrice} navigation={navigation} />
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
      <PageHeader getSuggestedPrice={getSuggestedPrice} setSuggestedPrice={setSuggestedPrice} getSelectedPrice={getSelectedPrice} setSelectedPrice={setSelectedPrice} />
      <View style={styles.container}>
        <ChoiceButton index={6} label={"Verify total $"+getSelectedPrice} getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
        <ChoiceButton index={0} label={"Go back"} getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
      </View>
    </View>
  );
}

const SelectPricePage = ({ navigation, route }) => {
  const [getSelection, setSelection] = useState(0);
  const [getSuggestedPrice, setSuggestedPrice] = useState(route.params.suggestedPrice);
  const [getSelectedPrice, setSelectedPrice] = useState(route.params.selectedPrice);
  if (!route.params.isMore){
    return (
      <View style={styles.container}>
        <PageHeader getSuggestedPrice={getSuggestedPrice} setSuggestedPrice={setSuggestedPrice} getSelectedPrice={getSelectedPrice} setSelectedPrice={setSelectedPrice} />
        <View style={styles.container}>
          <ChoiceButton index={7} label={"Pay 20% less $"+centsRound(getSuggestedPrice*0.8)} getSelectedPrice={centsRound(getSuggestedPrice*0.8)} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} setSelectedPrice={setSelectedPrice}navigation={navigation} />
          <ChoiceButton index={7} label={"Pay 50% less $"+(Math.round(getSuggestedPrice*0.5*100)/100)} getSelectedPrice={Math.round(getSuggestedPrice*0.5*100)/100} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} navigation={navigation} />
          <ChoiceButton index={0} label={"Go back"} getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
        </View>
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <PageHeader getSuggestedPrice={getSuggestedPrice} setSuggestedPrice={setSuggestedPrice} getSelectedPrice={getSelectedPrice} setSelectedPrice={setSelectedPrice} />
        <View style={styles.container}>
          <ChoiceButton index={7} label={"Donate a meal $"+centsRound(getSuggestedPrice + 10)} getSelectedPrice={centsRound(getSuggestedPrice + 10)} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} setSelectedPrice={setSelectedPrice}navigation={navigation} />
          <ChoiceButton index={7} label={"Donate 5 meals $"+centsRound(getSuggestedPrice + 50)} getSelectedPrice={centsRound(getSuggestedPrice + 50)} getSelection={getSelection} setSelection={setSelection} getSuggestedPrice={getSuggestedPrice} navigation={navigation} />
          <ChoiceButton index={0} label={"Go back"} getSelection={getSelection} setSelection={setSelection} navigation={navigation} />
        </View>
      </View>
    );

  }
}

 const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="Verification" component={VerificationPage} />
      <Stack.Screen name="Selection" component={SelectPricePage} />
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
    flex: 0.2,
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
