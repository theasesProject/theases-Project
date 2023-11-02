
import {SwipeUpDown,ItemFull} from 'react-native-swipe-up-down';

import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native"
import { getOnecarById } from "../store/carFetch";
import { useDispatch ,useSelector} from "react-redux";


function CarDetails({oneCar}){
    const dispatch = useDispatch();
    // const oneCar = useSelector((state) => state.car.oneCar);
    // useEffect(() => {
    //   dispatch(getOnecarById());
    // }, [dispatch]);
    


return (
	<View>
		<Text>hihello</Text>
{/* <SwipeUpDown

	itemMini={(show) => <ItemFull show={show} />}
	itemFull={(hide) => <ItemFull hide={hide} />}
	onShowMini={() => console.log('mini')}
	onShowFull={() => console.log('full')}
	// animation="spring"
	// disableSwipeIcon
	// extraMarginTop={100}
	// iconColor='yellow'
	// iconSize={30}
	style={{ backgroundColor: '#000' }} // style for swipe
/> */}
</View>
)

}




export default CarDetails;