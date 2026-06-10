import React,{useState} from "react";
import {Text,View,TouchableOpacity,StyleSheet,
    StatusBar,SafeAreaView,Platform
} from "react-native";
//create example: header+footer+tab navigation
//define screens
const screens = {
    Home: () =>(
        <View style={styles.screenCenter}>
            <Text style={styles.screenTitle}>Home</Text>
        </View>
    ),
    Search: () =>(
        <View style={styles.screenCenter}>
            <Text style={styles.screenTitle}>Search</Text>
            <Text>Tim kiem....</Text>
        </View>
    ),
    Profile: ()=> (
        <View style={styles.screenCenter}>
            <Text style={styles.screenTitle}>Profile</Text>
            <Text>Thong tin nguoi dung...</Text>
        </View>
    ),
};
export default function Slot10(){
    //code
    const [active,setActive]=useState("Home");
    const ActiveScreen = screens[active];
    //layout
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Header title={active} />
            <View style={styles.content}>
                <ActiveScreen/>
            </View>
            <Footer active={active} setActive={setActive}/>
        </SafeAreaView>
    );
}
function Header({title}){
    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerLeft} onPress={()=>{}}>
                <Text style={styles.headerBtn}>...</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.headerRight} onPress={()=>{}}>
                <Text style={styles.headerBtn}>Alert</Text>
            </TouchableOpacity>
        </View>
    );
}
function Footer({active,setActive}){
    return(
        <View style={styles.footer}>
            <TabButton
                label="Home"
                icon="H"
                active={active === "Home"}
                onPress={()=>setActive("Home")}
            />
            <TabButton
                label="Search"
                icon="S"
                active={active === "Search"}
                onPress={()=>setActive("Search")}
            />
            <TabButton
                label="Profile"
                icon="P"
                active={active === "Profile"}
                onPress={()=>setActive("Profile")}
            />
        </View>
    );
}
//dinh nghia TabButton
function TabButton({icon,label,active,onPress}){
    return(
        <TouchableOpacity style={styles.tabBtn} onPress={onPress}>
            <Text style={[styles.tabIcon, active && styles.tabLabelActive]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}
//style
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f6f7fb",
    },
    header:{
        height:55,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:"#ddd",
        backgroundColor:"#fff",
        paddingHorizontal:12,
    },
    headerLeft:{
        width:40,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerCenter:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    headerRight:{
        width:40,
        alignItems:'flex-end',
        justifyContent:'center',
    },
    headerBtn: {
        fontSize:20,
    },
    headerTitle:{
        fontSize:18,
        fontWeight:"600",
    },
    //content
    content:{
        flex:1,
    },
    screenTitle:{
        fontSize:30,
        marginBottom:10,
        fontWeight:"700",
    },
    screenCenter:{
        flex:1,
        padding:20,
        alignItems:'center',
        justifyContent:'center',
    },
    //footer
    footer:{
        height:70,
        flexDirection:'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor:"#ddd",
        backgroundColor:"#fff",
        alignItems:'center',
        justifyContent:'space-around',
        paddingBottom: Platform.OS === "ios" ? 10:0,
    },
    //tab nav
    tabBtn: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:10,
    },
    tabIcon:{
        fontSize:20,
        opacity:0.7,
    },
    tabIconActive: {
        transform: [{translateY: -2}],
        opacity:1,
    },
    tabLabel:{
        fontSize:12,
        marginTop:2,
        color:"#666",
    },
    tabLabelActive:{
        color:"#0a8b9c",
        fontWeight:"600",
    }
});