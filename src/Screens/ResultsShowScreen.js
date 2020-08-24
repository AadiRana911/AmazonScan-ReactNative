/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet,} from 'react-native';
import {Rating} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

const ResultsShowScreen = ({route}) => {
    const {title, label, rating, ratingsTotal, image, specs, price} = route.params;
    return(
        <View style = {styles.container}>
        <View style = {styles.imageView}>
            <Image source = {{uri: image}} style = {styles.image}/>
        </View>
        <View>
            <Text style = {styles.title}>{title}</Text>
            <Text style = {[styles.label, {marginBottom: '1%'}]}>{label}</Text>
            <View style = {[styles.ratingAndReviewsAndPrice, {justifyContent: 'space-between'}]}>
                <View style = {[styles.ratingAndReviewsAndPrice, {justifyContent: 'flex-start'}]}>
                    <Rating imageSize={20} readonly startingValue={rating} tintColor = {'#2a3e5a'}/>
                    <Text style = {styles.totalRatings}>({ratingsTotal})</Text>
                </View>
                <Text style = {[styles.price,{alignSelf: 'flex-end'}]}>{price['raw']}</Text>
            </View>
        </View>
        <Text style = {[styles.specs, {fontWeight: 'bold'}]}>Specs:</Text>
        <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',alignSelf: 'center', width: '100%'}}>
            <FlatList
                data = {specs}
                keyExtractor = {spec => spec.name}
                renderItem = {({item}) => {
                    return (
                        <Text style = {styles.specs}>{item['name']}:</Text>
                    );
                }}
            />
            <FlatList
                data = {specs}
                keyExtractor = {spec => spec.name}
                renderItem = {({item}) => {
                    return (
                        <Text style = {styles.specs}>{item['value']}</Text>
                    );
                }}
            />
        </View>
        
        {/* <Text style = {styles.specs}>{specs}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flex: 1,
        backgroundColor: '#2a3e5a',
        paddingTop: '3%',
        paddingHorizontal: '3%',
    },
    price: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',

    },
    imageView: {
        height: '40%',
        width: '100%',
        marginVertical: '5%',
    },
    image: {
        width: '100%',
        height: '100%',
        marginBottom: 5,
    },
    title: {
        fontSize: 28,
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
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    totalRatings: {
        color: 'rgb(190,190,190)',
    },
    specs: {
        color: 'white',
        // letterSpacing: 1,
    }

});

export default ResultsShowScreen;