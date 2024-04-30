import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,ScrollView,Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
const { width, height } = Dimensions.get("window");

const ModalFooter = ({selectedStartDate,selectedFinishDate,currentTime}) => {
    const [modalVisible, setModalVisible] = useState(false);



      const times = [];
      for (let hour = 0; hour <= 11; hour++) {
        for (let minute of ['00', '30']) {
          const hour12 = hour === 0 ? 12 : hour;
          const timeAM = `${hour12}:${minute} AM`;
          const timePM = `${hour12}:${minute} PM`;
          times.push(timeAM);
          times.push(timePM);
        }
      }
      
    
      const handleTimeSelection = (time) => {
        console.log('Selected time:', time);
      };

    
  return (
    <View style={styles.filterCardWrapper}>
      <View style={styles.filterCard}>
        <TouchableOpacity style={styles.row}>
          <View style={styles.date}>
            <Text style={styles.dateText}>{`From ${selectedStartDate}`}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.dateText}>{`To ${selectedFinishDate}`}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.row}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.timeTouchable}>
  <View style={styles.time}>
    <Ionicons name="time-outline" size={25} color="grey" />
    <Text style={styles.timeText}>{`${currentTime}`}</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.timeTouchable}>
  <View style={styles.time}>
    <Ionicons name="time-outline" size={25} color="grey" />
    <Text style={styles.timeText}>{`${currentTime}`}</Text>
  </View>
</TouchableOpacity>

        </View>
      </View>
      <TouchableOpacity style={styles.find}>
        <Text style={styles.textButton}>Show stations</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        swipeDirection={['down']}
        style={styles.modal}
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        >
        <View 
        style={styles.modalContent}>
           <Text style={{
            alignSelf:'flex-start',
            paddingLeft:width*0.08,
            fontWeight:'600',
            fontSize:15
           }}>For:12/9/2024</Text>
            <ScrollView 

            contentContainerStyle={styles.container}>
        {times.map((time) => (

        <Pressable
            
          key={time}
          style={styles.button}
          onPress={() => handleTimeSelection(time)}
        >
          <Text style={styles.buttonText}>{time}</Text>
        </Pressable>
      ))}
      </ScrollView>
        <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.buttonText}>Confrim</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalFooter;

const styles = StyleSheet.create({
  filterCardWrapper: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAECF0',
    borderTopRightRadius:25,
    borderTopLeftRadius:25
  },
  filterCard: {
    borderRadius: 20,
    width: width * 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    flexDirection: 'row',
    marginRight:width*0.1
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  timeText: {
    marginLeft: 10,
    fontSize: 16,
  },
  find: {
    width: width * 0.84,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.08,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  timeTouchable: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    width:width*0.4,
    height:height*0.06,
    borderRadius: 10,
    overflow: 'hidden', 
  },
 modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    flex:0.8,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height * 0.85,
  },
  button: {
    backgroundColor: '#8c52ff',
    borderRadius: 10,
    padding: width*0.04,
    marginVertical: height*0.009,
    width: width*0.42,
    alignItems: 'center',
    height:height*0.07
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    // flexGrow:1,
    // paddingHorizontal:width*0.1,
    width:width*1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
    paddingBottom:20,
    gap:7,
  },
  confirmButton:{
    width: width * 0.84,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.08,
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom:height*0.009
  }
  
});
