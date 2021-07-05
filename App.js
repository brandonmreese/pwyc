import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, Image } from 'react-native';

const ChoiceButton = (props) => {
  return (
    <Button
      onPress={() => {
        props.setSelection(props.index);
      }}
      disabled={props.getSelection != 0}
      title={props.label}
      style={{width: 500}}
    />
  );
}

 const App = () => {
  const [getSelection, setSelection] = useState(0);
  return (
    <View style={styles.container}>
      <Text>Welcome to</Text>
      <Image
        source={{uri: "https://images.squarespace-cdn.com/content/v1/58f91cec1b10e37fd77c01bf/1592669618935-NCWF2MHVIBXGS1J6JCSG/APaTT_primary__blk_rgb.png?format=1500w"}}
        // TODO: Get permission to use logo
        // TOOD: make this png a local resouce
        style={{width: 200, height: 200}}
      />
      <ChoiceButton index={1} label="I want to pay suggested" getSelection={getSelection} setSelection={setSelection} />
      <ChoiceButton index={2} label="I want to pay more" getSelection={getSelection} setSelection={setSelection} />
      <ChoiceButton index={3} label="I want to pay less" getSelection={getSelection} setSelection={setSelection} />
      <ChoiceButton index={4} label="I want to pay with a token" getSelection={getSelection} setSelection={setSelection} />
      <ChoiceButton index={5} label="I want to volunteer for my meal" getSelection={getSelection} setSelection={setSelection} />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
