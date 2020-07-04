import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Item = ({provider}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.touch}
      onPress={() =>
        navigation.navigate('Slot', {
          screen: 'Slot',
          provider_id: provider._id,
          slots: provider.slots,
        })
      }>
      <Text style={styles.item}>{provider.username}</Text>
    </TouchableOpacity>
  );
};
export default class Providers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    return fetch('http://192.168.100.107:5000/providers')
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          isLoading: false,
          dataSource: resJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <Item provider={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    paddingTop: 0,
    fontSize: 28,
    height: 44,
  },
  touch: {
    backgroundColor: '#5EB3DF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
