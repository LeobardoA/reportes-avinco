import { GlobalColors } from '@/assets/GlobalTheme';
import Header from '@/components/AvincoHeader';
import Cliente from '@/components/misc/Cliente';
import { addClient, setupDatabase } from '@/components/misc/DatabaseManager';
import { ThemedView } from '@/components/ThemedView';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';

export const addContact = () => {
    const colorScheme = useColorScheme();

    const [alias, setAlias] = useState('');
    const [nombre, setNombre] = useState('');
    const [contacto, setContacto] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [correo, setCorreo] = useState('');

    const guardarContacto = async () => {
        // Validar que ningún campo esté vacío
        if (!nombre || !telefono || !domicilio) {
            alert('Por favor, completa todos los campos');
            return;
        }

        let ccorreo
        if (correo) {
            // Validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                alert('El correo electrónico no tiene un formato válido');
                return;
            }
            else {
                ccorreo = correo;
            }
        } else {
            ccorreo = "Sin correo";
        }



        let telefonoFormateado
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(telefono)) {
            alert('El teléfono no tiene un formato válido.\nUn formato valido es un numero a 10 digitos.');
            return;
        }
        telefonoFormateado = telefono.replace(/(\d{2})(\d{4})(\d{2})/, '$1 $2 $3');

        let aalias
        if (!alias) {
            aalias = nombre;
        } else {
            aalias = alias;
        }

        let cliente = new Cliente({ id: null, alias: aalias, contacto: contacto, correo: ccorreo, domicilio: domicilio, name: nombre, telefono: telefonoFormateado });

        await setupDatabase();
        await addClient(cliente);
        console.log('Usuario agregado');

        router.navigate('index');
    };
    return (
        <ThemedView lightColor={GlobalColors.whiteBackground} darkColor={GlobalColors.blackBackground} style={{ flex: 1 }}>
            <Header />
            {/* CONTENT */}
            <ScrollView style={{
                flex: 1,
                paddingHorizontal: 15,
            }}>
                {/* TITULO */}
                <ThemedText style={{ fontSize: 16 }}>Datos de Cliente:</ThemedText>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <ThemedText style={styles.titleText}>Empresa:</ThemedText>
                    <TextInput style={styles.textInput} placeholder='Empresa' onChangeText={setNombre} />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText style={styles.titleText}>Contacto:</ThemedText>
                    </View>
                    <TextInput style={styles.textInput} placeholder='Contacto' onChangeText={setContacto} />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <ThemedText style={styles.titleText}>Telefono:</ThemedText>
                    <TextInput style={styles.textInput} placeholder='Telefono' onChangeText={setTelefono} keyboardType='phone-pad' />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <ThemedText style={styles.titleText}>Domicilio:</ThemedText>
                    <TextInput style={styles.textInput} placeholder='Domicilio' onChangeText={setDomicilio} />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText style={styles.titleText}>Correo Electronico:</ThemedText>
                        <Text style={[styles.titleText, { color: '#999' }]}>(Opcional)</Text>
                    </View>
                    <TextInput style={styles.textInput} placeholder='Correo' onChangeText={setCorreo} keyboardType='email-address' />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText style={styles.titleText}>Alias:</ThemedText>
                        <Text style={[styles.titleText, { color: '#999' }]}>(Opcional)</Text>
                    </View>
                    <TextInput style={styles.textInput} placeholder='Alias' onChangeText={setAlias} />
                </ThemedView>
            </ScrollView >
            <View style={{
                height: 60,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity style={{
                    width: 360,
                    height: 40,
                    backgroundColor: GlobalColors.accent,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    borderColor: GlobalColors.whiteElement,
                    borderWidth: 1,
                    elevation: 4,
                    flexDirection: 'row'
                }}
                    onPress={guardarContacto}
                >
                    <FontAwesome name='save' size={25} />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </ThemedView >
    )
}
export default addContact;

const styles = StyleSheet.create(
    {
        textInput: {
            backgroundColor: '#DDD',
            borderRadius: 15,
            borderColor: '#999',
            borderWidth: 1,
            padding: 5,
        },
        titleText: {
            marginBottom: 10,
            paddingLeft: 5
        },
        infoContainer: {
            elevation: 2,
            marginVertical: 7,
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 8,
        },
        btnSave: {
            position: 'absolute',
            backgroundColor: GlobalColors.accent,
            padding: 15,
            bottom: 0,
        }
    });