import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  Text,
  Animated,
  RefreshControl,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { List, getAgencyData, loading } from "../store/agencySlice";
import { MakeReport, handleToken, selectUser } from "../store/userSlice";
import AgencyReported from '../components/AgencyReported.jsx'

const { height, width } = Dimensions.get("screen");

const ReportAgency = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [timeline, setTimeline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sender, setsender] = useState("false");
  const AgencyList = useSelector(List)?.data;
  const Loading = useSelector(loading);
  const [form, setForm] = useState({});
  const [selected,setSelected]=useState(null)
  const activeUser = useSelector(selectUser)
  const handleSearchChange = (text) => {
    setSearch(text);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setForm({
      Reported:selected,
      content:issueDescription,
      Date:timeline,
      sender:activeUser.type,
      UserId:activeUser.id,
    });
    dispatch(MakeReport(form))
  };
  const checkUser = async () => {
    try {
    //   const tokenResponse = await AsyncStorage.getItem("UserToken");
      dispatch(handleToken()).then((response)=>console.log(response))
    } catch(err) {
        console.error(err);
    }
  };

  const handleChangeForm = (newForm) => {
    setForm(newForm)
  }

  useEffect(() => {
    // checkUser()
    console.log("i a m lo gg ed in ",activeUser);
    setsender();
    dispatch(getAgencyData())
      .then(console.log(AgencyList))
      .catch((er) => {
        console.log(JSON.stringify(er));
      });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            // Call your data fetching function here, then set refreshing to false
            dispatch(getAgencyData())
              .then(() => setRefreshing(false))
              .catch((er) => {
                console.log(JSON.stringify(er));
                setRefreshing(false);
              });
          }}
        />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Report an Agency</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleSearchChange}
          value={search}
          placeholder="Search For Agency.."
        />
        <View style={search ? styles.resContainer : styles.hidden}>

        {!Loading &&
          AgencyList?.filter((agency) =>
          agency.name.toLowerCase().includes(search.toLowerCase())
          ).map((e, i) => (
            <AgencyReported setSelected={setSelected} selected={selected} e={e} key={i} form={form} setForm={handleChangeForm}/>
            ))}
            </View>
        <TextInput
          style={styles.inputDesc}
          onChangeText={setIssueDescription}
          value={issueDescription}
          placeholder="Issue Description.."
          multiline={true}
        />
        {showDatePicker && (
          <DateTimePicker
            value={timeline}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              setTimeline(selectedDate);
            }}
          />
        )}
        <Pressable
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>Select Report Date</Text>
        </Pressable>
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resContainer: {
    marginBottom: height * 0.01,
    maxHeight: height * 0.3,
    height: "auto",
    borderWidth: 0.5,
    borderRadius: 5,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    padding: 8,
  },
  agencyName: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0.5,
    padding: 5,
  },
  hidden: {
    display: "none",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: "auto",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  inputDesc: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // height: height * 0.2,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
  },
  dateButton: {
    backgroundColor: "white",
    // borderRadius: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "white",
    // borderRadius: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
});

export default ReportAgency;
