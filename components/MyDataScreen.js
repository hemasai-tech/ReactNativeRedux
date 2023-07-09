import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserPostsRequest,
  getUserPostsSuccess,
} from '../redux/actions/userPostsActions';
import Restart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyDataScreen = props => {
  const [refreshCount, setRefreshCount] = useState(0);

  const reloadApp = async () => {
    try {
      await AsyncStorage.setItem('refresh', 'refresh');
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      Restart.restart();
    }, 100);
  };

  const dispatch = useDispatch();
  const postsReducer = useSelector(state => state.userPosts);
  const {error, loading, posts} = postsReducer;
  console.log(posts, 'postsReducer');

  useEffect(() => {
    if (props?.route?.params?.id !== undefined) {
      dispatch(getUserPostsRequest(props?.route?.params?.id));
    } else {
      console.log('inside');
      dispatch(getUserPostsRequest());
    }
  }, [dispatch, props?.route?.params?.id, props?.route?.params, props]);

  return (
    <>
      <View style={{flex: 1}}>
        <TouchableOpacity style={styles.refreshBtn} onPress={() => reloadApp()}>
          <Text style={styles.refreshTxt}>
            Click to Get All the User's Posts
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 2}}>
        {props?.route?.params?.id !== undefined ? (
          <View style={styles.postItemView}>
            <Text style={[styles.postItem, {fontWeight: '800'}]}>
              {posts?.title} :-{' '}
            </Text>
            <Text style={styles.postItem}>{posts?.body}</Text>
          </View>
        ) : (
          <View style={styles.allPosts}>
            <FlatList
              data={posts}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.postItemView}>
                  <Text style={[styles.postItem, {fontWeight: '800'}]}>
                    {item?.title} :-{' '}
                  </Text>
                  <Text style={styles.postItem}>{item?.body}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default MyDataScreen;
const styles = StyleSheet.create({
  allPosts: {
    marginHorizontal: 10,
  },
  postItem: {
    paddingVertical: 3,
    marginHorizontal: 5,
    color: '#000000',
  },
  postItemView: {
    backgroundColor: '#F5F5F5',
    marginVertical: 4,
    borderRadius: 5,
  },
  refreshBtn: {
    backgroundColor: '#525FE1',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
    marginVertical: 5,
    marginBottom:'auto',
    marginTop:'auto'
  },
  refreshTxt: {
    padding: 10,
    color: '#F5F5F5',
    fontWeight: '600',
  },
});
