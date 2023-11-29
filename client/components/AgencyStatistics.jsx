import React from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import Chart from "../components/Stats";
const {height , width} = Dimensions.get("screen")

function AgencyStatistics() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginTop:height *0.05}}>
        <Chart/>
    </ScrollView>
  )
}

export default AgencyStatistics