//expo install @react-native-async-storage/async-storage
import React,{useState,useEffect,useCallback} from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { Text,View,TextInput,Button,FlatList,TouchableOpacity,Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
const Home = () =>{
    const [items,setItems]=useState([]);
    const [inputValue,setInputValue]=useState('');
    const [editIndex,setEditIndex]=useState(null);
    useEffect(()=>{
       loadItems(); 
    },[]);
    const loadItems = async () =>{
        try {
            const storedItems = await AsyncStorage.getItem("items");
            if(storedItems){
                setItems(JSON.parse(storedItems));
            }
        } catch (error) {
            console.error(error);
        }
    };
    const saveItems = async (newItems) =>{
        try {
            await AsyncStorage.setItem('items',JSON.stringify(newItems));
            setItems(newItems);
        } catch (error) {
            console.error(error);
        }
    };
    const addItem = () =>{
        if(inputValue.trim()===''){
            Alert.alert('Vui long nhap noi dung');
            return;
        }
        const newItems = [...items,inputValue];
        saveItems(newItems);
        setInputValue('');
    };
    const editItem = (index) =>{
        setInputValue(items[index]);
        setEditIndex(index);
    };
    const updateItem = () =>{
        if(editIndex === null) return;
        const newItems = [...items];
        newItems[editIndex]=inputValue;
        saveItems(newItems);
        setInputValue('');
        setEditIndex(null);
    };
    const deleteItem = (index) =>{
        const newItems = items.filter((_,i)=> i!==index);
        saveItems(newItems);
    };
    const renderItem = ({item,index})=>(
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>{item}</Text>
            <View style={{flexDirection:'row'}}>
                <Button title="Sua" onPress={()=>editItem(index)}/>
                <Button title="Xoa" onPress={()=>deleteItem(index)} />
            </View>
        </View>
    );
}
// Hien tai: co ten manh dat (item)
//Yeu cau them: vi tri, gia, hien thi tren ban do cua manh dat