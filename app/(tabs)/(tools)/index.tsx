import { GlobalColors } from '@/assets/GlobalTheme';
import Header from '@/components/AvincoHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export const index = () => {

    const colorScheme = useColorScheme();

    const mantenimientoList = ["Caja de Herramientas", "Multimetro", "Asperzor", "Hidrolavadora", "Manguera verde", "Extension Electrica", "Franelas", "Manometros", "Escaleras", "Cinta gris", "Bolsa de Plastico", "Aspiradora", "Adaptador 410", "Control Remoto", "Contactor 220V", "Cinchos", "Kit de Arranque", "Casco y Chaleco"];
    const instalacionList = ["Nivel", "Taladro", "Brocas", "Escaleras", "Cinta Gris", "Abrazaderas de tuberia", "Lapiz y Marcador", "Bomba de Vario", "Extension Electrica", "Manometros", "Pericas", "Cinseles, Marro y Martillo", "Pistola de Temperatura", "Terminales Electricas", "Pedacera de Armaflex", "Plantillas para Instalacion", "Cemento"];

    const [selectedValue, setSelectedValue] = useState('Mantenimiento'); // Estado para el valor seleccionado del Picker
    const dataList = selectedValue === 'Mantenimiento' ? mantenimientoList : instalacionList; // Determinar qué lista mostrar

    const [checkboxStates, setCheckboxStates] = useState<boolean[]>(Array(dataList.length).fill(false));

    const handleCheckboxChange = (index: number) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
    };

    const checkTools = () => {
        let missingTools: string[] = [];
        checkboxStates.forEach((item, index) => {
            if (!item) {
                missingTools.push(dataList[index]);
                return;
            }
        });
        const missingToolsMessage = missingTools.join('\n');
        Alert.alert("Falta Herramienta", "Aun no has cargado:\n" + missingToolsMessage);
    }

    return (
        <ThemedView style={{ flex: 1 }} lightColor={GlobalColors.whiteBackground} darkColor={GlobalColors.blackBackground}>
            <Header />
            <View style={{
                borderRadius: 15,
                justifyContent: 'center',
                elevation: 2,
                width: '80%',
                marginLeft: '10%',
                marginTop: 10,
            }}>
                <Picker
                    mode='dropdown'
                    style={{ backgroundColor: Colors[colorScheme ?? 'light'].background, fontWeight: "bold", fontSize: 10, width: 320, color: Colors[colorScheme ?? 'light'].text }}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue: any) => {
                        setSelectedValue(itemValue);
                        setCheckboxStates(Array(dataList.length).fill(false));
                    }}
                    dropdownIconColor={Colors[colorScheme ?? 'light'].icon}
                >
                    <Picker.Item label={'Mantenimiento'} value={'Mantenimiento'} key={0} />
                    <Picker.Item label={'Instalacion'} value={'Instalacion'} key={1} />
                </Picker>
            </View>
            {/* CONTENT */}
            <ScrollView style={{
                flex: 1,
                marginTop: 10
            }}>
                {dataList.map((item, index) => (
                    <ThemedView key={index} style={styles.itemContainer}>
                        <TouchableOpacity style={styles.itemLayout} onPress={() => handleCheckboxChange(index)}>
                            <ThemedText>{item}</ThemedText>
                            <FontAwesome name={checkboxStates[index] ? 'check-square' : 'square-o'} size={30} color={Colors[colorScheme ?? 'light'].tint} />
                        </TouchableOpacity>
                    </ThemedView>
                ))}
            </ScrollView >
            <ThemedView style={{
                bottom: 0,
                width: '100%',
                height: '9%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                elevation: 10,
            }}>
                <TouchableOpacity style={{
                    width: 350,
                    height: 50,
                    backgroundColor: GlobalColors.accent,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                    onPress={() => checkTools()}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Revisar</Text>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView >
    )
}

export default index;
const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 15,
        borderRadius: 15,
        marginVertical: 8,
        elevation: 2,
    },
    itemLayout: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 20,
    },
    footerBtn: {
        width: 50,
        height: 50,
        backgroundColor: GlobalColors.accent,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    }
});