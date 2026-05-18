import { Text,View,StyleSheet,TouchableOpacity } from "react-native";
import React from "react";
export default class Slot3_1 extends React.Component {
    //code===================================================
    //1. ham khoi tao
    constructor(){
        super();
        //khai bao cac hang so
        this.operations = ['DEL','+','-','*','/'];
        this.state = {
            //khai bao cac bien o day
            resultText:"",//bien luu ket qua
            calculationText:"",//bien luu bieu thuc tinh toan
        };
       
    }
     //cac ham tu dinh nghia
        pressButton(text){
            if(text === "="){//khi nhan vao dau =
                return this.calculationResult(this.state.resultText);//hien thi ket qua
            }
            else if( text === 'DEL'){//nhan vao phim xoa
                this.operate('DEL');//xu ly khi xoa
            }
            else { //nhan vao cac phim khac
                this.setState({
                    resultText: this.state.resultText + text,//noi chuoi
                });
            }
        }
        //ham tinh gia tri bieu thuc
        calculationResult(text){
            this.setState({
                calculationText: eval(text),//ham tinh gia tri bieu thuc
            });
        }
        //ham xu ly phep tinh
        operate(oper){
            switch(oper){
                case 'DEL':
                    let text=this.state.resultText.split('');//pha vo chuoi
                    text.pop();//xoa bo phan tu cuoi cung
                    this.setState({
                        resultText: text.join(''),//join cac thanh phan con lai voi nhau
                    });
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    this.setState({
                        resultText: this.state.resultText+oper,//noi cac phep tinh
                    });
                    break
            }
        }

    //layout==================================================
    render(){
        return(
            <View style={styles.container}>
                {/* hien thi ket qua */}
                <View style={styles.result}>
                    <Text style={styles.title}>{this.state.resultText}</Text>
                </View>
                {/* hien thi bieu thuc */}
                <View style={styles.calculation}>
                    <Text style={styles.title}>{this.state.calculationText}</Text>
                </View>
                {/* hien thi cac button */}
                <View style={styles.buttons}>
                    {/* cot 1 */}
                    <View style={styles.number1}>
                        <TouchableOpacity style={styles.btn} key={1} onPress={()=>this.pressButton(1)}><Text>1</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={4} onPress={()=>this.pressButton(4)}><Text>4</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={7} onPress={()=>this.pressButton(7)}><Text>7</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'.'} onPress={()=>this.pressButton('.')}><Text>.</Text></TouchableOpacity>
                    </View>
                    {/* cot2 */}
                    <View style={styles.number2}>
                        <TouchableOpacity style={styles.btn} key={2} onPress={()=>this.pressButton(2)}><Text>2</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={5} onPress={()=>this.pressButton(5)}><Text>5</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={8} onPress={()=>this.pressButton(8)}><Text>8</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={0} onPress={()=>this.pressButton(0)}><Text>0</Text></TouchableOpacity>
                    </View>
                    {/* cot 3 */}
                    <View style={styles.number3}>
                        <TouchableOpacity style={styles.btn} key={3} onPress={()=>this.pressButton(3)}><Text>3</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={6} onPress={()=>this.pressButton(6)}><Text>6</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={9} onPress={()=>this.pressButton(9)}><Text>9</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'='} onPress={()=>this.pressButton('=')}><Text>=</Text></TouchableOpacity>
                    </View>
                    {/* cot phep tinh */}
                    <View style={styles.operations}>
                        <TouchableOpacity style={styles.btn} key={'+'} onPress={()=>this.pressButton('+')}><Text>+</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'-'} onPress={()=>this.pressButton('-')}><Text>-</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'*'} onPress={()=>this.pressButton('*')}><Text>*</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'/'} onPress={()=>this.pressButton('/')}><Text>/</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'DEL'} onPress={()=>this.pressButton('DEL')}><Text>DEL</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    },
    result:{
        flex:2,
        justifyContent:'space-around',
        alignItems:'flex-end',
        backgroundColor:'green'
    },
    calculation:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'flex-end',
        backgroundColor:'orange',
    },
    buttons:{
        flex:7,
        flexDirection:'row',
        backgroundColor:'#AA11',
    },
    numbers:{
        flex:3,
        flexDirection:'row',
        backgroundColor:'yellow',
        justifyContent:'space-around',
        alignItems:'stretch',
    },
    number1:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#AB12',
        justifyContent:'space-around',
        alignItems:'stretch',
    },
    number2:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#AAA',
        justifyContent:'space-around',
        alignItems:'stretch',
    },
    number3:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#AC12',
        justifyContent:'space-around',
        alignItems:'stretch',
    },
    operations:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'stretch',
        backgroundColor:'#AA12',
    },
    btn:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        color:'blue',
        textAlign:'center',
        fontSize:30,
    }
});