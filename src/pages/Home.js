import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import{ScrollView, TextInput,} from 'react-native-gesture-handler';
import {Feather, FontAwesome5, Ionicons} from '@expo/vector-icons';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    consumo: yup.string("a").required("Campo Obrigatório"),
    preco: yup.string("b"). required("Campo Obrigatório"),
    padrao: yup.string("c").required("Campo Obrigatório"),
})

export default function Home() {
    const navigation = useNavigation();

    const{control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema),
    });

    function SignIn(data){
        // console.log(data.consumo);
        // console.log(data.preco);
        // console.log(data.padrao);
    };
 return (
    <View style={{flex:1, backgroundColor:'#333'}}>
            <Image  style={styles.imagem} source={require('../assets/likesolar.png')}/> 
            <View style={styles.container}>

                <Text style={styles.texto}>Média mensal de consumo</Text>
                <Controller
                control={control}
                name="consumo"
                render={({field:{onChange,onBlur,value}}) =>(
                    <TextInput 
                    style={[
                        styles.input,{
                            borderWidth: errors.consumo && 1,
                            borderColor: errors.consumo && '#ff375b'
                    }]} 
                    onChangeText={onChange}
                    onBlur={onBlur}
                    valule={value} //chamado quando o text é tocado
                    placeholder='(kW/h)'
                    keyboardType='numeric'
                    />
                )}
                />
                {errors.consumo && <Text style={styles.alert}>{errors.consumo?.message}</Text>}

                <Text style={styles.texto}>Preço do kWh</Text>
                <Controller
                control={control}
                name="preco"
                render={({field:{onChange,onBlur,value}}) =>(
                    <TextInput 
                    style={[
                        styles.input,{
                            borderWidth: errors.preco && 1,
                            borderColor: errors.preco && '#ff375b'
                    }]} 
                    onChangeText={onChange}
                    onBlur={onBlur}
                    valule={value} //chamado quando o text é tocado
                    placeholder='R$'
                    keyboardType='numeric'
                    />
                )}
                />
                {errors.preco && <Text style={styles.alert}>{errors.preco?.message}</Text>}

                <Text style={styles.texto}>Padrão de Entrada</Text>
                <Controller
                control={control}
                name="padrao"
                render={({field:{onChange,onBlur,value}}) =>(
                    <TextInput 
                    style={[
                        styles.input,{
                            borderWidth: errors.padrao && 1,
                            borderColor: errors.padrao && '#ff375b'
                    }]}  
                    onChangeText={onChange}
                    onBlur={onBlur}
                    valule={value} //chamado quando o text é tocado
                    placeholder ='Monofásico, Bifásico, Trifásico'
                    />
                )}
                />     
                {errors.padrao && <Text style={styles.alert}>{errors.padrao?.message}</Text>}
                <TouchableOpacity style={styles.botao} onPress={handleSubmit(SignIn)}>
                    <Text style={styles.botsend}>ENVIAR FORMULÁRIO</Text>
                </TouchableOpacity>
            </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:30,
        alignItems: 'center',
      },
      imagem:{
        marginTop:50,
        alignSelf:'center',
      },
      input:{
        padding:10,
        backgroundColor:'#fff',
        width:'95%',
        height:50,
        borderRadius:6,
        elevation:10,
      },
      texto:{
        alignSelf:'flex-start',
        marginLeft:10,
        fontFamily:'Montserrat_400Regular', 
        paddingTop:20,
        color:'#fff'
      },
      alert:{
        marginLeft:10,
        alignSelf:'flex-start',
        color:'#ff375b',
        marginBottom:8,
      },
      botao:{
        width:'95%',
        height:'10%',
        borderRadius:9,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#62AE47',
      },
      botsend:{
        justifyContent:'center',
        fontFamily:'Montserrat_400Regular',
        fontSize:16,
      }
});