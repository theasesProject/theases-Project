import { Text, View, StyleSheet,  TextInput, TouchableOpacity,  Image,  ScrollView, Pressable,  Modal, Button,} from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

function AgencyProfileUser(){
    return (
<View>
      <View style={styles.trial}>
        <View style={styles.trle}>
          <Pressable onPress={()=>navigation.navigate('Home')}>
          <Left />
          </Pressable>
        </View>

        <View style={styles.trri}>
          <Pressable
            style={styles.trri}
            onPress={() => {
              handleSliderToggle();
            }}
          >
            <Dots />
          </Pressable>
        </View>
      </View>
      <View style={styles.agency}>
        
        {isVisible && activeUser?.Agency ? (
          <ScrollView>
            <View style={styles.vbgImg}>
              <ImageBackground
                source={{
                    uri:activeUser?.Agency.AgencyImage
                }}
                style={styles.bgim}
              />
            </View>
            <View style={styles.vav}>
              <View style={styles.bvav}>
                <Image
                  source={{
                    uri: activeUser?.avatar,
                  }}
                  style={styles.avatar}
                />
              </View>
            </View>

            <View style={styles.acna}>
              <View style={styles.leftSection}>
                <Text style={styles.leac}>{activeUser.Agency.name}</Text>
                <Text style={styles.number}>
                  {activeUser?.Agency.companyNumber}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <Text>
                  {activeUser.Agency.transportation
                    ? "With Delivery"
                    : "Without Delivery"}
                </Text>
                <Text>{activeUser.Agency.createdAt.slice(0, 10)}</Text>
                {/* <Image source={dots} /> */}
              </View>
            </View>

            <View style={styles.stats}>
              <Stats />
            </View>
          </ScrollView>
        ) : null}
        <View style={styles.foot}>
          <NavBar />
        </View>
      </View>
    </View>




    )
}
export default AgencyProfileUser