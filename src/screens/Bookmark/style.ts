import React from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    ViewHeader1: {
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
    imageHeader: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    viewSearchBar: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginHorizontal: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray
    },
    iconSearchBar: {
        width: 20,
        height: 20,
        tintColor: COLORS.gray
    },
    inputSearchBar: {
        marginLeft: SIZES.radius
    },
    footer: {
        marginBottom: 100
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        marginHorizontal: 24
    }
})