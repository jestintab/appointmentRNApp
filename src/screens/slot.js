import React, {Component, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList, } from 'react-native-gesture-handler';

import moment from 'moment';

export default class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.route.params.slots,
      provider_id: props.route.params.provider_id,
    };
  }
  _renderSlots = ({item}) => {
    if (item.requester == '') {
      return (
        <View style={styles.rectButton}>
          <Text style={styles.date}>{moment(item.date).format('dddd, MMMM Do YYYY, h:mm a')} </Text>
          <TouchableOpacity onPress={() => this._bookRequest(item._id)}>
            <Text style={styles.book}>Book Slot</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.rectButton}>
          <Text style={styles.date}>{moment(item.date).format('dddd, MMMM Do YYYY, h:mm a')} </Text>

          <Text style={styles.booked}>Slot is booked</Text>
        </View>
      );
    }
  };

  _bookRequest = (slot_id) => {
    fetch('http://192.168.100.107:5000/providers/slotrequest/' + this.state.provider_id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slot_id: slot_id,
        status: 1,
        requester: 'jestin',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          dataSource: json.newslots,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          //   renderItem={({item}) => (
          //     <SlotRender slot={item} provider_id={this.state.provider_id} />
          //   )}
          renderItem={this._renderSlots}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          extraData={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  date: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize:20,
  },
  book: {
    color: 'green',
    justifyContent: "center",
    width: 100,
    padding:5,
    fontSize:20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666'
  },
  booked: {
    color: 'red',
    justifyContent: "center",
    width: 200,
    padding:5,
    fontSize:20,
    backgroundColor: 'transparent',
    textAlign: 'left'
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});
