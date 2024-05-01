import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import React from 'react';
import ArrowBack from '../assets/Svg/blackArrow.svg';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("screen");

const FAQS = () => {

    const handleCallCustomerSupport = () => {
        // Implement call customer support functionality
    };

    const handleCustomerSupportMail = () => {
        // Implement customer support mail functionality
    };

    const handleReportDamage = () => {
        // Implement report damage functionality
    };

    const handleRentalSupportMail = () => {
        // Implement rental support mail functionality
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: height * 0.05 }}>
            <View style={styles.header}>
                <Pressable style={styles.arrowContainer}>
                    <ArrowBack />
                </Pressable>
            </View>
            <View style={styles.list}>
                <Pressable style={[styles.pressable, styles.separator]} onPress={handleCallCustomerSupport}>
                    <Ionicons name="call-outline" size={24} color="black" />
                    <Text style={styles.text}>Call Customer Support</Text>
                </Pressable>
                <Pressable style={[styles.pressable, styles.separator]} onPress={handleCustomerSupportMail}>
                    <Ionicons name="mail-outline" size={24} color="black" />
                    <Text style={styles.text}>Customer Support (Mail)</Text>
                </Pressable>
                <Pressable style={[styles.pressable, styles.separator]} onPress={handleReportDamage}>
                    <Ionicons name="warning-outline" size={24} color="black" />
                    <Text style={styles.text}>Report Damage</Text>
                </Pressable>
                <Pressable style={[styles.pressable]} onPress={handleRentalSupportMail}>
                    <Ionicons name="mail-outline" size={24} color="black" />
                    <Text style={styles.text}>Rental Support (Mail)</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default FAQS

const styles = StyleSheet.create({
    arrowContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    header: {
        borderBottomWidth: 0.2,
        borderBottomColor: '#ccc',
        justifyContent: 'center',
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10, // Add vertical spacing between buttons
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1', // Update border color
        paddingBottom: 10, // Adjust spacing as needed
    },
    text: {
        marginLeft: 15, // Increase left margin for text
        fontSize: 16,
        fontWeight: '700', // Adjust font weight
    },
    list: {
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.03
    }
})
