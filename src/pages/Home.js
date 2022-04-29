import React, {useState} from 'react';
import { ImageBackground, 
          View,
          Text, 
          Image, 
          StyleSheet, 
          Button, 
          TouchableOpacity, 
          Platform, 
          PermissionsAndroid,
          SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import{ScrollView, TextInput,} from 'react-native-gesture-handler';
import {Feather, FontAwesome5, Ionicons} from '@expo/vector-icons';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {reactNativeHtmlToPdf} from 'react-native-html-to-pdf';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const schema = yup.object({
    consumo: yup.string("a").required("Preencha os Dados"),
    preco: yup.string("b"). required("Preencha os Dados"),
    padrao: yup.string("c").required("Preencha os Dados"),
})

export default function Home() {
    const navigation = useNavigation();

    const{control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema),
    });
    // function SignIn(data){

    // };

    const [filePath, setFilePath] = useState('');
   
    const isPermitted = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs access to Storage data',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          alert('Write permission err', err);
          return false;
        }
      } else {
        return true;
      }
    };
   
    const createPDF = async () => {
      if (await isPermitted()) {
        let options = {
          //Content to print
          html:
            '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
          //File Name
          fileName: 'test',
          //File directory
          directory: 'docs',
        };
        let file = await RNHTMLtoPDF.convert(options);
        console.log(file.filePath);
        setFilePath(file.filePath);
      }
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
                            borderColor: errors.consumo && '#ff0000'
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

                <Text style={styles.texto}>Preço do kW/h</Text>
                <Controller
                control={control}
                name="preco"
                render={({field:{onChange,onBlur,value}}) =>(
                    <TextInput 
                    style={[
                        styles.input,{
                            borderWidth: errors.preco && 1,
                            borderColor: errors.preco && '#ff0000'
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
                            borderColor: errors.padrao && '#ff0000'
                    }]}  
                    onChangeText={onChange}
                    onBlur={onBlur}
                    valule={value} //chamado quando o text é tocado
                    placeholder ='Monofásico, Bifásico, Trifásico'
                    />
                )}
                />     
                {errors.padrao && <Text style={styles.alert}>{errors.padrao?.message}</Text>}
                <TouchableOpacity style={styles.botao} onPress={handleSubmit(createPDF)}>
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
        color:'#ff0000',
        marginBottom:8,
      },
      botao:{
        width:'95%',
        height:'10%',
        borderRadius:9,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFF',
      },
      botsend:{
        justifyContent:'center',
        fontFamily:'Montserrat_400Regular',
        fontSize:16,
      }
});