import React from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    },
    ViewHeader1:{
        flexDirection: 'row',
        marginHorizontal: SIZES.padding, 
        alignItems: 'center', 
        height: 80
    },
    ViewHeader2: {
        flex: 1
    },
    titleHeader: {
        color: COLORS.darkGreen, 
        fontSize: 30
    },
    subtitleHeader: {
        marginTop: 3, 
        color: COLORS.gray, 
        fontSize: 15
    },
    imageHeader:{
        width: 50, 
        height: 50, 
        borderRadius: 30  
    },
    picker:{
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.padding
    },
    picker2:{
        marginHorizontal: SIZES.padding,
        marginVertical: 5
    },
    item:{
        backgroundColor: '#229879'
    },
    footer:{
        marginBottom: 100
    }
})