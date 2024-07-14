import { GlobalColors } from '@/assets/GlobalTheme';
import Header from '@/components/AvincoHeader';
import Cliente from '@/components/misc/Cliente';
import { deleteClient, getClient, setupDatabase, updateClientData } from '@/components/misc/DatabaseManager';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const updateClient = () => {

    const [alias, setAlias] = useState('');
    const [nombre, setNombre] = useState('');
    const [contacto, setContacto] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [correo, setCorreo] = useState('');

    const { id } = useLocalSearchParams();

    const idClient: string = id as string;

    useEffect(() => {
        const fetchData = async () => {
            await setupDatabase();
            let cliente = await getClient(idClient);
            setAlias(cliente.alias);
            setContacto(cliente.contacto);
            setNombre(cliente.name);
            let tel: string = cliente.telefono;
            tel = tel.replaceAll(" ", "");
            setTelefono(tel);
            setDomicilio(cliente.domicilio);
            setCorreo(cliente.correo);
        };
        fetchData();
    }, []);

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

        let cliente2 = new Cliente({ id: idClient, alias: aalias, contacto: contacto, correo: ccorreo, domicilio: domicilio, name: nombre, telefono: telefonoFormateado });
        console.log(cliente2.id);


        Alert.alert(
            'Confirmar modificacion',
            '¿Estás seguro de que quieres editar la informacion de este cliente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Modificar',
                    onPress: () => {
                        setupDatabase();
                        updateClientData(cliente2);
                        router.back();
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const eliminarContacto = async () => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que quieres eliminar este cliente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        setupDatabase();
                        deleteClient(idClient);
                        router.back();
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <ThemedView style={{ flex: 1 }} lightColor={GlobalColors.whiteBackground} darkColor={GlobalColors.blackBackground}>
            <Header />
            {/* CONTENT */}
            <ScrollView style={{
                flex: 1,
                marginTop: 35,
                paddingHorizontal: 15,
            }}>
                {/* TITULO */}
                <ThemedText style={{ marginBottom: 10, fontSize: 16 }}>Datos De Cliente:</ThemedText>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <ThemedText style={styles.titleText}>Nombre:</ThemedText>
                    <TextInput style={styles.textInput} placeholder='Nombre' value={nombre} onChangeText={setNombre} />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText style={styles.titleText}>Contacto:</ThemedText>
                    </View>
                    <TextInput style={styles.textInput} placeholder='Contacto' value={contacto} onChangeText={setContacto} />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <ThemedText style={styles.titleText}>Telefono:</ThemedText>
                    <TextInput style={styles.textInput} placeholder='Telefono' value={telefono} onChangeText={setTelefono} keyboardType='phone-pad' />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <ThemedText style={styles.titleText}>Domicilio:</ThemedText>
                    <TextInput style={styles.textInput} placeholder='Domicilio' value={domicilio} onChangeText={setDomicilio} />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText style={styles.titleText}>Correo Electronico:</ThemedText>
                        <Text style={[styles.titleText, { color: '#999' }]}>(Opcional)</Text>
                    </View>
                    <TextInput style={styles.textInput} placeholder='Correo' value={correo} onChangeText={setCorreo} keyboardType='email-address' />
                </ThemedView>
                {/* SEPARACION */}
                <ThemedView style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText style={styles.titleText}>Alias:</ThemedText>
                        <ThemedText style={[styles.titleText, { color: '#999' }]}>(Opcional)</ThemedText>
                    </View>
                    <TextInput style={styles.textInput} placeholder='Alias' value={alias} onChangeText={setAlias} />
                </ThemedView>
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
                <View style={{
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity style={{
                        width: 360,
                        height: 40,
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        borderColor: GlobalColors.whiteElement,
                        borderWidth: 1,
                        elevation: 4,
                        flexDirection: 'row'
                    }}
                        onPress={eliminarContacto}
                    >
                        <FontAwesome name='trash' size={25} />
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginLeft: 10
                        }}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </ThemedView >
    )
}
export default updateClient;

const styles = StyleSheet.create({
    header: {
        paddingTop: 15,
        backgroundColor: GlobalColors.whitePrimaryColor,
        height: '20%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInput: {
        borderRadius: 15,
        borderColor: '#999',
        borderWidth: 1,
        padding: 5,
        backgroundColor: '#DDD'
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