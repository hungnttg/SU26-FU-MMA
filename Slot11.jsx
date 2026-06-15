//ung dung quan ly dat dai don gian
//npm i @react-native-async-storage/async-storage
//npm i @react-navigation/stack
//npm i @react-navigation/native
import React,{useState,useEffect,useCallback} from "react";
import { Text,View,TextInput,Button,FlatList,TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation}) =>{
    const [lands,setLands]=useState([]);
    const [search,setSearch]=useState('');
    //doc du lieu tu async storage
    useFocusEffect(
        useCallback(()=>{
            (async () => {
                //doc du lieu tu async storage
                const data = await AsyncStorage.getItem('lands');
                setLands(data ? JSON.parse(data):[]);//set trang thai
            })();
        },[])
    );
    //giao dien
    return(
        <View style={{flex:1,padding:10}}>
            {/* o tim kiem */}
            <TextInput placeholder="Tim kiem" onChangeText={setSearch}/>
            {/* danh sach manh dat */}
            <FlatList
                // tim kiem theo vi tri va theo tu khoa
                data={lands.filter(l=>l.name.includes(search)
                || l.location.includes(search))}
                keyExtractor={item=>item.id}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={()=>navigation.navigate('Detail',{land:item})}>
                        <Text>{item.name} - {item.location}</Text>
                    </TouchableOpacity>
                )}
            />
            {/* them manh dat */}
            <Button title="Them" onPress={()=>navigation.navigate('Edit')}/>
        </View>
    );
};
//landscreen
const LandScreen = ({navigation,route}) =>{
    //lay du lieu tu Home chuyen sang || tao moi
    const [land,setLand]=useState(route.prarams?.land 
        || {id: Date.now().toString(),name:'',location:'',price:''}
    );
    //ham luu du lieu
    const saveLand = async () =>{
        //doc du lieu tu local storage (async Storage)
        const storedLands = JSON.parse(await AsyncStorage.getItem('lands'))||[];
        //them du lieu moi
        await AsyncStorage.setItem('lands',
            JSON.stringify(route.prarams?.land ?
                storedLands.map(l=>l.id === land.id ?
                    land: l
                ): [...storedLands, land]
            )
        );
        navigation.goBack();
    };
    //giao dien
    return(
        <View style={{flex:1,padding:10}}>
            {/* /nhap lieu */}
            <TextInput placeholder="Ten" value={land.name}
            onChangeText={v=>setLand({...land,name:v})} />
            <TextInput placeholder="Vi tri" value={land.location}
            onChangeText={v=>setLand({...land,location:v})} />
            <TextInput placeholder="Gia" value={land.price}
            onChangeText={v=>setLand({...land,price:v})} 
            keyboardType="numeric" />
            {/* button */}
            <Button title="Luu" onPress={saveLand}/>
        </View>
    );
};
//man hinh Detail
const DetailScreen = ({route,navigation}) =>{
    //lay du lieu tu home chuyen sang
    const {land}=route.params;
    //ham xoa du lieu
    const deleteLand = async () =>{
        //doc du lieu tu local storage
        const storedLand = JSON.parse(await AsyncStorage.getItem('lands'))||[];
        //xoa
        await AsyncStorage.setItem('lands',
            JSON.stringify(storedLand.filter(l=>l.id !== land.id))
        );
        navigation.goBack();//dieu huong
    };
    //giao dien
    return(
        <View style={{flex:1,padding:10}}>
            <Text>{land.name}</Text>
            <Text>{land.location}</Text>
            <Text>{land.price}</Text>
            <Button title="Xoa" onPress={deleteLand}/>
            <Button title="Sua" onPress={()=>navigation.navigate('Edit',{land})}/>
        </View>
    );
};
//file cau hinh
const Stack = createStackNavigator();
export default function Slot11(){
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Edit" component={LandScreen}/>
            <Stack.Screen name="Detail" component={DetailScreen}/>
        </Stack.Navigator>
    );
}