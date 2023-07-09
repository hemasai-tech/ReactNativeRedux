import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const MyAccountScreen = props => {
  const {navigation} = props;
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);

  useEffect(() => {
    const authenticateFingerprint = async () => {
      try {
        await FingerprintScanner.authenticate({
          description: 'Scan your fingerprint',
        });
        setIsFingerprintEnabled(true);
      } catch (error) {
        setIsFingerprintEnabled(false);
        console.log('Fingerprint authentication error:', error);
      }
    };

    const resetFingerprintStatus = () => {
      setIsFingerprintEnabled(false);
    };

    const onFocus = () => {
      resetFingerprintStatus();
      authenticateFingerprint();
    };

    // Add an event listener to handle component focus
    const focusSubscription = navigation.addListener('focus', onFocus);

    // Clean up the FingerprintScanner instance and event listener
    return () => {
      FingerprintScanner.release();
      // focusSubscription.remove();
    };
  }, [navigation]);

  if (isFingerprintEnabled) {
    return (
      <View style={styles.mainView}>
        <View style={{flex: 1}}>
          <Text>Access Granted</Text>
        </View>
        <View style={styles.img}>
          <Image
            source={require('../assets/default.jpeg')}
            style={{height: 100, width: 100, borderRadius: 50}}
          />
        </View>
        <View style={styles.infoView}>
          <Text style={styles.title}>FullName :</Text>
          <Text style={styles.name}> Hema Sai</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.title}>Role :</Text>
          <Text style={styles.name}> Developer</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.title}>Experience :</Text>
          <Text style={styles.name}> 2 Years</Text>
        </View>
      </View>
    );
  }
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  img: {
    borderRadius: 50,
  },
  mainView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
  },
  name: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    color: 'gray',
    textDecorationLine: 'underline',
    fontSize: 18,
    fontWeight: '400',
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:10
  },
});
