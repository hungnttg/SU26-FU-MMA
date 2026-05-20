import React,{useState} from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
export default function Slot4_1(){
    //code------------------------------------
    //khai bao cac bien
    const [calculation,setCalculation]=useState('');
    const [result,setResult]=useState('');
    //khai bao va dinh nghia cac ham
    const pressButton = (text) =>{
        if(text ==='='){//khi nhan vao dau =
            try {
                setResult(eval(calculation).toString());//tinh gia tri bieu thuc
                setCalculation('');//reset lai bien calculation
            } catch (error) {
                setResult(error.toString());
            }
        }
        else { //neu nhan vao button khac dau = , thi thuc hien noi chuoi
            setCalculation(prev => prev + text);
        }
    };
    //dinh nghia ham nhan vao cot phep tinh
    const operate = (op) => {
        if(op === 'DEL'){//khi nguoi dung nhan vao phim del
            setCalculation(prev => prev.slice(0,-1));//xoa ky tu cuoi cung
        }
        else {//neu nhan vao cac phim +,-,*,/
            setCalculation(prev => prev + op);//noi chuoi
        }
    };
    //ham tao giao dien ma tran so
    const renderNumberButtons = () =>{
        //khai bao mang 2 chieu
        const nums = [[1,2,3],[4,5,6],[7,8,9],['.','0','=']];
        return nums.map((row,i)=>(
            <View key={i} style={styles.row}>
                {row.map((num)=>(
                    <TouchableOpacity key={num} style={styles.btn} onPress={()=>pressButton(num.toString())}>
                        <Text style={styles.txt}>{num}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ));
    };
    //ham tao giao dien cua ma tran phep tinh
    const renderOperatorButtons = () =>{
        const ops = ['+','-','*','/','DEL'];
        return ops.map((op)=>(
            <TouchableOpacity key={op} style={styles.btn} onPress={()=>operate(op)}>
                <Text style={styles.txt}>{op}</Text>
            </TouchableOpacity>
        ));
    };
    //layout----------------------------------
    return(
        <View style={styles.container}>
        {/* result */}
        <View style={styles.resultText}>
            <Text style={styles.txt}>{result}</Text>
        </View>
        {/* calculation */}
        <View style={styles.calculationText}>
            <Text style={styles.txt}>{calculation}</Text>
        </View>
        {/* phep tinh */}
        <View style={styles.buttons}>
            {/* con so */}
            <View style={styles.numberButtons}>
                {renderNumberButtons()}
            </View>
            {/* phep tinh */}
            <View style={styles.operationButtons}>
                {renderOperatorButtons()}
            </View>
        </View>
    </View> 
);
    
}
const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'yellow'},
    resultText:{flex:1,backgroundColor:'green',justifyContent:'center',alignItems:'center'},
    calculationText:{flex:2,backgroundColor:'#AAA123',justifyContent:'center',alignItems:'center'},
    buttons:{flex:7,flexDirection:'row',backgroundColor:'pink'},
    numberButtons:{flex:3,backgroundColor:'#BBA',justifyContent:'space-around'},
    operationButtons:{flex:1,backgroundColor:'#CCA',justifyContent:'space-around'},
    row:{flexDirection:'row',justifyContent:'space-around'},
    btn: {flex:1,backgroundColor:'#DDD',justifyContent:'center',alignItems:'center'},
    txt:{fontSize:30,fontWeight:'bold'},

});