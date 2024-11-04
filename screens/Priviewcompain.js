import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Newscontext } from '../API/Context';
import { useNavigation } from '@react-navigation/native';

const Priviewcompain = ({ route, navigation }) => {

    const { darkTheme } = useContext(Newscontext); 
    const { content } = route.params; // Assuming you're passing the whole content object as a param

    return (
        <ScrollView style={[styles.container,{backgroundColor:darkTheme?'black':'white'}]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24}  color={darkTheme ? 'white' : 'black'}/>
                </TouchableOpacity>
                <Text style={[styles.headerTitle,{color:darkTheme ? 'white' : 'black'}]}>Campaign Details</Text>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Image
                source={{ uri: content?.image_url }}
                style={styles.image}
            />

            <Text style={[styles.title,{color:darkTheme ? 'white' : 'black'}]}>{content?.title || 'Loading title...'}</Text>

            <View style={styles.tagContainer}>
                <View style={styles.tag}>
                    <Ionicons name="person-outline" size={16} color="gray" />
                    <Text style={styles.tagText}>{content?.author || 'Author not available'}</Text>
                </View>
                <View style={styles.tag}>
                    <Ionicons name="calendar-outline" size={16} color="gray" />
                    <Text style={styles.tagText}>{content?.fundRaisingEndDate ? new Date(content.fundRaisingEndDate).toLocaleDateString() : 'End date not available'}</Text>
                </View>
            </View>

            <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${(content.donationReceived / content.donationGoal) * 100}%` }]} />
            </View>

            <View>
                <Text style={[styles.description,{color:darkTheme ? 'white' : 'black'}]}>
                    {content?.content}
                </Text>
                <Text style={[styles.donationDetails,{color:darkTheme ? 'white' : 'black'}]}>
                    Donation Goal: {content?.donationGoal || 'N/A'}
                </Text>
                <Text style={[styles.donationDetails,{color:darkTheme ? 'white' : 'black'}]}>
                    Donation Received: {content?.donationReceived || '0'}
                </Text>
            </View>

            <TouchableOpacity style={styles.donateButton} onPress={()=>navigation.navigate('DonationForm',{ content: content})}>
                <Text style={styles.donateButtonText}>Donate Now</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Priviewcompain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
       
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        padding: 5,
        borderRadius: 15,
        marginRight: 10,
    },
    tagText: {
        marginLeft: 5,
        color: 'gray',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginBottom: 5,
    },
    progress: {
        height: '100%',
        backgroundColor: '#FFD700',
        borderRadius: 5,
    },
    description: {
        marginBottom: 20,
        color: 'gray',
    },
    donationDetails: {
        color: 'gray',
        fontSize: 16,
        marginBottom: 5,
    },
    donateButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    donateButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});
