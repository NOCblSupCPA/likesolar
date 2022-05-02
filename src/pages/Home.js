import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const schema = yup.object({
  consumo: yup.number("a").required("Campo Obrigatório"),
  preco: yup.number("b").required("Campo Obrigatório"),
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
    <!DOCTYPE html>
    <html>
    <head>
        <h1>ORÇAMENTO LIKE SOLAR<h1>
    </head>
    <body>

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
    <!DOCTYPE html>
    <html>
    <head style="">
        <h1>ORÇAMENTO LIKE SOLAR<h1>
    </head>
    <body>
    
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
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: "#333" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "#333" }}>
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
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
              <Text style={styles.botsend}>ENVIAR</Text>
              <Feather name="send" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao}
              onPress={handleSubmit(print)}
            >
              <Text style={styles.botsend}>VISUALIZAR</Text>
              <Feather name="eye" size={20} />
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 50,
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
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  botsend: {
    fontFamily: "Montserrat_400Regular",
  },
  botao: {
    height: "20%",
    width: "42.4%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 10,
    shadowColor: "#f5f5f5",
  },
});

const estilo = StyleSheet.create({});
