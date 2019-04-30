import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    buttonPressed: false,
    cameraText: [],
    number: 0
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  swapButton = () => {
    this.setState({ buttonPressed: !this.state.buttonPressed });
  };
  handleBarCodeScanned = ({ type, data }) => {
    this.state.cameraText.push({key:this.state.number.toString(),item:data});
    this.state.number++;
    console.log(typeof data);
    this.setState({ buttonPressed: false });
  };
  renderBarCode = () => {
    if (this.state.buttonPressed) {
      return (
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      );
    }
  };
  renderList=()=>{
    if(this.state.cameraText.length>0){
      return (<FlatList
          data={this.state.cameraText}
          extraData={this.state}
          renderItem={({ item }) => <View><Text style={{textAlign: 'center'}}>{item.item}</Text></View>}
        />); 
    }else{
      return (<Text>No Items</Text>)
    }
  }
  render() {
    return (
      <View style={{flex:1,alignItems:'center',
        justifyContent:'center'}}>
        <Button title="Press" onPress={this.swapButton} />
        {this.renderBarCode()}
        {this.renderList()}
      </View>
    );
  }
}
