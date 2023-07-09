import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImageCarousel from './carousel/ImageCarousel';
import {getUserPostsRequest} from '../redux/actions/userPostsActions';
import {getUsersRequest} from '../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userReducer = useSelector(state => state?.users?.users);

  const getData = async () => {
    try {
      let data = await AsyncStorage.getItem('refresh');
      if (data !== undefined || data !== null || data !== '') {
        navigation.navigate('MyData');
      } else {
        navigation.navigate('PostsData');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, []);

  const getPost = item => {
    AsyncStorage.clear();
    navigation.navigate('MyData', {
      id: item.id,
    });
  };

  const renderPosts = ({item, index}) => {
    return (
      <View style={styles.postView}>
        <TouchableOpacity
          onPress={() => getPost(item)}
          style={styles.postItemView}>
          <Text style={styles.postText}>{item.username}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.carousel}>
        <ImageCarousel />
      </View>
      <View style={{flex: 2}}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Users List</Text>
        </View>
        <FlatList
          data={userReducer}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => renderPosts({item, index})}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  carousel: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 30,
  },
  postView: {
    marginHorizontal: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingVertical: 2,
  },
  postItemView: {
    paddingVertical: 2,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  postText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    padding: 5,
  },
  header: {
    fontSize: 16,
    color: '#000000',
    padding: 4,
    fontWeight:'800'
  },
  headerView:{
    marginLeft:'auto',
    marginRight:'auto',
  }
});
