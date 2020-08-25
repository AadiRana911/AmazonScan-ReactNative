/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, ScrollView} from 'react-native';
import {Rating} from 'react-native-elements';


const ResultsShowScreen = ({route}) => {
    const {title, label, rating, ratingsTotal, image, specs, price} = route.params;
    return (
        <ScrollView  contentContainerStyle = {[{flexGrow: 1,}]} style={[styles.container]}>
            <Image source = {{uri: image}} style = {styles.image} resizeMode = {'contain'}/>
            <Text style = {styles.title}>{title}</Text>
            <Text style = {[styles.label, {marginBottom: '1%'}]}>{label}</Text>
            <View style = {[styles.ratingAndReviewsAndPrice, {justifyContent: 'space-between', paddingRight: '3%'}]}>
                <View style = {[styles.ratingAndReviewsAndPrice, {justifyContent: 'flex-start'}]}>
                    <Rating imageSize={20} readonly startingValue={rating} tintColor = {'#2a3e5a'}/>
                    <Text style = {styles.totalRatings}>({ratingsTotal})</Text>
                </View>
                <Text style = {[styles.price,{alignSelf: 'flex-end'}]}>{price['raw']}</Text>
            </View>
            <Text style = {[styles.specs, {fontWeight: 'bold', fontSize: 16}]}>Specs:</Text>
            <FlatList
                data = {specs}
                keyExtractor = {spec => spec.name}
                renderItem = {({item}) => {
                    return (
                        <View style = {{flexDirection: 'row',justifyContent: 'space-between', marginBottom: '4%'}}>
                            <Text style = {[styles.specs]}>{item['name']}:</Text>
                            <Text style = {[styles.specs]}>{item['value']}</Text>
                        </View>
                    );
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2a3e5a',
        paddingTop: '3%',
        paddingHorizontal: '3%',
        flex:1,
    },
    price: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height:350,
        marginBottom: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(240,240,240)',
    },
    ratingAndReviewsAndPrice: {
        marginRight: '-4%',
        width: '90%',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    totalRatings: {
        color: 'rgb(190,190,190)',
    },
    specs: {
        color: 'white',
        width: '50%',
    },

});

export default ResultsShowScreen;