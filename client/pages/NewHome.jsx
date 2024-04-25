import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Platform, TouchableOpacity, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import ToggleSwitch from '../components/ToggleSwitch';
import NavBar from '../components/NavBar';
import { Calendar } from 'react-native-calendars';
import ModalFooter from '../components/ModalFooter';

const { width, height } = Dimensions.get("window");

const NewHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFinishDate, setSelectedFinishDate] = useState(() => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  });
  const [disabledDates, setDisabledDates] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  console.log('these are the ranged dates',markedDates)

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Function to disable dates before the current date
  const disablePastDates = () => {
    const today = new Date();
    const disabledDates = {};
    const dateString = today.toISOString().split('T')[0];
    // Mark all dates before today as disabled, excluding today
    for (let i = 1; i < today.getDate(); i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const disabledDateString = date.toISOString().split('T')[0];
      disabledDates[disabledDateString] = { disabled: true, disableTouchEvent: true };
    }
    return disabledDates;
  };

  useState(() => {
    setDisabledDates(disablePastDates());
  });

  useEffect(() => {
    const initialMarkedDates = {
      [selectedStartDate]: { startingDay: true, selected: true, color: '#8c52ff', textColor: 'white' },
      [selectedFinishDate]: { endingDay: true, selected: true, color: '#8c52ff', textColor: 'white' },
    };
    setMarkedDates(initialMarkedDates);
  }, []);

  const onDayPress = (day) => {
    const selectedDate = new Date(day.dateString);
    const today = new Date();
    
    if (selectedDate < today) {
      return;
    }
    
    if (!selectedStartDate || selectedDate < new Date(selectedStartDate)) {
      setSelectedStartDate(day.dateString);
      setSelectedFinishDate(null);
      setMarkedDates({
        [day.dateString]: { startingDay: true, selected: true, color: '#8c52ff', textColor: 'white' },
      });
    } else if (!selectedFinishDate || selectedDate > new Date(selectedFinishDate)) {
      setSelectedFinishDate(day.dateString);
      setMarkedDates({
        ...markedDates,
        [day.dateString]: { endingDay: true, selected: true, color: '#8c52ff', textColor: 'white' },
      });
  
      const startDate = new Date(selectedStartDate);
      const finishDate = new Date(day.dateString);
      const datesToMark = {};
      const currentDate = new Date(startDate);
      while (currentDate <= finishDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString !== selectedStartDate && dateString !== day.dateString) {
          datesToMark[dateString] = { color: '#8c52ff', textColor: 'white' }; // Mark days between start and finish dates
        } else if (dateString === selectedStartDate) {
          datesToMark[dateString] = { startingDay: true, selected: true, color: '#8c52ff', textColor: 'white' }; // Style start date
        } else if (dateString === day.dateString) {
          datesToMark[dateString] = { endingDay: true, selected: true, color: '#8c52ff', textColor: 'white' }; // Style finish date
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setMarkedDates({ ...markedDates, ...datesToMark });
    } else {
      setSelectedStartDate(null);
      setSelectedFinishDate(null);
      setMarkedDates({});
    }
  };
  


  const calendarTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#8c52ff', 
    todayTextColor: '#8c52ff',
    arrowColor: '#8c52ff',

  };
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ImageBackground style={styles.background} source={require('../assets/Karhba.png')} resizeMode='cover'>
          <Image style={styles.logo} source={require('../assets/aqwaWhite.png')} />
        </ImageBackground>
        <View styles={styles.filterCardWrapper}>
          <View style={styles.filterCard}>
            <View style={styles.firstRow}>
              <Text style={styles.firstText}>Different return station</Text>
              <ToggleSwitch />
            </View>
            <View style={styles.secondRow}>
              <Ionicons name="ios-car" size={25} color="grey" />
              <Text style={styles.firstText}>Your Location</Text>
            </View>
            <TouchableOpacity style={styles.thirdRow} onPress={() => setModalVisible(true)}>
              <View style={styles.date}>
                <Ionicons name="ios-calendar" size={25} color="grey" />
                <Text style={styles.firstText}>{`From ${selectedStartDate}`}</Text>
              </View>
              <View style={styles.time}>
                <Ionicons name="time-outline" size={25} color="grey" />
                <Text style={styles.firstText}>{`${currentTime}`}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.find}>
              <Text style={styles.textButton}>Book a car</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <NavBar />
      <Modal
        isVisible={modalVisible}
        swipeDirection={['down']}
        style={styles.modal}
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={{
            fontSize: 21,
            fontWeight: '500',
            paddingTop: 10,
          }}>Select a Date</Text>
          <Calendar
            style={styles.calendar}
            enableSwipeMonths={true}
            onDayPress={onDayPress}
            markedDates={{
              ...disabledDates,
              ...markedDates,
            }}
            theme={calendarTheme}
          />
          <ModalFooter selectedStartDate={selectedStartDate} selectedFinishDate={selectedFinishDate} currentTime={currentTime} />
        </View>
      </Modal>
    </View>
  );
}

export default NewHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    width: width * 1,
    height: height * 0.62,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.7,
    height: height * 0.2
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width * 1,
    gap: -19
  },
  filterCardWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  filterCard: {
    borderRadius: 20,
    borderWidth: 0.6,
    width: width * 1,
    backgroundColor: 'white',
  },
  firstRow: {
    height: height * 0.078,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 0.2,
    borderBottomColor: "grey"
  },
  secondRow: {
    height: height * 0.078,
    paddingLeft: 20,
    flexDirection: 'row',
    gap: 5,
    // borderBottomWidth: 0.2,
    borderBottomColor: "grey",
    alignItems: "center"
  },
  thirdRow: {
    flexDirection: 'row',
    // borderBottomWidth: 0.2,
    borderBottomColor: "grey",
  },
  date: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.65,
    height: height * 0.078,
    paddingLeft: 20,
    // borderRightWidth: 0.2
  },
  time: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  find: {
    width: width * 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.08,
    backgroundColor: 'black',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20
  },
  textButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height * 0.7,
  },
  calendar: {
    width: width * 1
  },
  markedDay: {
    backgroundColor: 'rgba(140, 82, 255, 0.5)',
    borderRadius: 10
  },
  markedDayText: {
    color: 'white'
  },
  firstText:{
    fontSize:15,
    fontWeight:'600',
    // fontFamily:'leagueSpartan'
  }
});
