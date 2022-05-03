import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 

const schema = yup.object({
  consumo: yup.number("a").required("Campo Obrigatório"),
  preco: yup.string("b").required("Campo Obrigatório"),
  padrao: yup.string("c").required("Campo Obrigatório"),
});

export default function Home() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const printToFile = async (data) => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    let html = `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body>
      <h1 style="text-align: center; font-size: 30px; font-family: Helvetica Neue;">
        ORÇAMENTO LIKE SOLAR
      </h1>
      <h1 style=font-size: 10px;">
      Consumo Mensal de Consumo (KW/h): ${data.consumo}
      </h1>

      <h1 style=font-size: 10px; ">
      Preço do KW/h: ${data.preco}
      </h1>

      <h1 style=font-size: 10px; ">
      Padrão de entrada: ${data.padrao}
      </h1>
      
    </body>
  </html>
  `;
    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const print = async (data) => {
    let html = `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body>
      <h1 style="text-align: center; font-size: 30px; font-family: Helvetica Neue;">
        ORÇAMENTO LIKE SOLAR
      </h1>
      <h1 style=font-size: 10px;">
      Consumo Mensal de Consumo (KW/h): ${data.consumo}
      </h1>

      <h1 style=font-size: 10px; ">
      Preço do KW/h: ${data.preco}
      </h1>

      <h1 style=font-size: 10px; ">
      Padrão de entrada: ${data.padrao}
      </h1>
      
    </body>
  </html>
  `;

    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
    console.log(data);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1, backgroundColor: "#333" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={styles.imagem}
            source={require("../assets/likesolar.png")}
          />
          <View style={styles.container}>
            <Text style={styles.texto}>Média mensal de consumo</Text>
            <Controller
              control={control}
              name="consumo"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderWidth: errors.consumo && 1,
                      borderColor: errors.consumo && "#ff0000",
                    },
                  ]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value} //chamado quando o text é tocado
                  placeholder="(kW/h)"
                  //keyboardType="numeric"
                />
              )}
            />
            {errors.consumo && (
              <Text style={styles.alert}>{errors.consumo?.message}</Text>
            )}

            <Text style={styles.texto}>Preço do kW/h</Text>
            <Controller
              control={control}
              name="preco"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderWidth: errors.preco && 1,
                      borderColor: errors.preco && "#ff0000",
                    },
                  ]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value} //chamado quando o text é tocado
                  placeholder="R$"
                  //keyboardType="numeric"
                />
              )}
            />
            {errors.preco && (
              <Text style={styles.alert}>{errors.preco?.message}</Text>
            )}

            <Text style={styles.texto}>Padrão de Entrada</Text>
            <Controller
              control={control}
              name="padrao"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderWidth: errors.padrao && 1,
                      borderColor: errors.padrao && "#ff0000",
                    },
                  ]}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Monofásico, Bifásico, Trifásico"
                />
              )}
            />
            {errors.padrao && (
              <Text style={styles.alert}>{errors.padrao?.message}</Text>
            )}
          </View>
          <View style={styles.bottons}>
            <TouchableOpacity
              style={styles.botao}
              onPress={handleSubmit(printToFile)}
            >
              {/* <Text style={styles.botsend}>ENVIAR</Text> */}
              <Feather name="share-2" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao}
              onPress={handleSubmit(print)}
            >
              {/* <Text style={styles.botsend}>VISUALIZAR</Text> */}
              <AntDesign name="pdffile1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  imagem: {
    margin: 10,
    alignSelf: "center",
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    width: "95%",
    height: 50,
    borderRadius: 6,
    elevation: 10,
    shadowColor: "#f5f5f5",
  },
  texto: {
    alignSelf: "flex-start",
    marginLeft: 10,
    fontFamily: "Montserrat_400Regular",
    paddingTop: 20,
    color: "#fff",
  },
  alert: {
    marginLeft: 10,
    alignSelf: "flex-start",
    color: "#ff0000",
    marginBottom: 8,
  },
  bottons: {
    //flex: 1,
    // justifyContent: "center",
    flexDirection: "row",
    marginLeft:10
  },
  botsend: {
    fontFamily: "Montserrat_400Regular",
  },
  botao: {
    height: 40,
    width: "20%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 5,
    shadowColor: "#f5f5f5",
  },
});