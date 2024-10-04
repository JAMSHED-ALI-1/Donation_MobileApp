import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon}>
        <Icon name="settings-outline" size={25} color="#333" />
      </TouchableOpacity>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/profile.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Licht Agile</Text>
        <Text style={styles.profileUsername}>@lichtagilee</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Submitted</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>22</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Account Options */}
      <TouchableOpacity style={styles.optionItem}>
        <Icon name="person-outline" size={25} color="#333" />
        <Text style={styles.optionText}>My Account</Text>
        <Icon name="chevron-forward-outline" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem}>
        <Icon name="wallet-outline" size={25} color="#333" />
        <Text style={styles.optionText}>My Wallet</Text>
        <Icon name="chevron-forward-outline" size={20} color="#333" />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutItem}>
        <Icon name="log-out-outline" size={25} color="#333" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingsIcon: {
    alignSelf: 'flex-end',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileUsername: {
    color: 'gray',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'gray',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 40,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'red',
  },
});

export default ProfileScreen;


