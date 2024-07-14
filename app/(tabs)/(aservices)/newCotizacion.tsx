import { GlobalColors } from '@/assets/GlobalTheme';
import Header from '@/components/AvincoHeader';
import ConceptCard, { Concept } from '@/components/ConceptCard';
import Cliente from '@/components/misc/Cliente';
import { generateHTML } from '@/components/misc/CotizationPrinter';
import { getAllClients } from '@/components/misc/DatabaseManager';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { printToFileAsync } from 'expo-print';
import { useFocusEffect } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

export const newCotization: React.FC = () => {
    const [clientData, setClientData] = useState({
        nombre: '',
        contacto: '',
        telefono: '',
        correo: ''
    });

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const [notas, setNotas] = useState<string>('');

    const exportPDF = async () => {
        if (!clientData.nombre && !clientData.contacto) {
            Alert.alert('Error', 'Todos los campos del cliente deben estar completos.');
            return;
        }

        const clienteDatos = new Cliente({
            id: selectedClient ? selectedClient.id : null,
            alias: selectedClient ? selectedClient.alias : 'Nuevo Cliente',
            name: clientData.nombre,
            contacto: clientData.contacto,
            telefono: clientData.telefono,
            domicilio: selectedClient ? selectedClient.domicilio : '',
            correo: clientData.correo
        });

        const html = await generateHTML(clienteDatos, concepts, notas);

        try {
            const { uri } = await printToFileAsync({ html });
            const opcionesCompartir = { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Compartir Archivo' };
            await shareAsync(uri, opcionesCompartir);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                let clientesData = await getAllClients();
                clientesData.unshift(new Cliente({ id: '0', alias: 'Nuevo Cliente:', name: '', contacto: '', domicilio: '', telefono: '', correo: '' }));
                setClientes(clientesData);
            };
            fetchData();
        }, [])
    );

    useEffect(() => {
        if (selectedClient) {
            setClientData({
                nombre: selectedClient.name,
                contacto: selectedClient.contacto,
                telefono: selectedClient.telefono,
                correo: selectedClient.correo
            });
        } else {
            setClientData({
                nombre: '',
                contacto: '',
                telefono: '',
                correo: ''
            });
        }
    }, [selectedClient]);

    const [concepts, setConcepts] = useState<Concept[]>([
        { id: '1', description: '', quantity: '1', unitPrice: '0' },
    ]);

    const handleChange = (id: string, key: keyof Concept, value: string) => {
        setConcepts((prevConcepts) =>
            prevConcepts.map((concept) =>
                concept.id === id ? { ...concept, [key]: value } : concept
            )
        );
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Confirmar Eliminacion',
            '¿Estás seguro de que quieres eliminar este concepto?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        setConcepts((prevConcepts) => {
                            const updatedConcepts = prevConcepts.filter(concept => concept.id !== id);
                            return updatedConcepts.map((concept, index) => ({ ...concept, id: (index + 1).toString() }));
                        });
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const addConcept = () => {
        setConcepts((prevConcepts) => [
            ...prevConcepts,
            { id: (prevConcepts.length + 1).toString(), description: '', quantity: '1', unitPrice: '0' },
        ]);
    };

    const total = useMemo(() => {
        return concepts.reduce((sum, concept) => {
            return sum + (parseFloat(concept.quantity) * parseFloat(concept.unitPrice) || 0);
        }, 0);
    }, [concepts]);

    const colorScheme = useColorScheme();

    return (
        <ThemedView style={{ flex: 1 }} lightColor={GlobalColors.whiteBackground} darkColor={GlobalColors.blackBackground}>
            <Header />
            <ScrollView>
                <View style={styles.content}>
                    <ThemedView style={styles.clientContainer}>
                        <ThemedText style={styles.clientContainerTitle}>Datos Cliente:</ThemedText>
                        <Picker
                            mode='dropdown'
                            style={{ fontWeight: "bold", fontSize: 10, width: 320, color: Colors[colorScheme ?? 'light'].text }}
                            onValueChange={(itemValue) => setSelectedClient(itemValue)}
                            selectedValue={selectedClient}
                            dropdownIconColor={Colors[colorScheme ?? 'light'].icon}
                        >
                            {clientes.map((cliente) => (
                                <Picker.Item key={cliente.id} label={cliente.alias} value={cliente} />
                            ))}
                        </Picker>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Empresa"
                            onChangeText={(text) => setClientData({ ...clientData, nombre: text })}
                            keyboardType="default"
                            value={clientData.nombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contacto"
                            onChangeText={(text) => setClientData({ ...clientData, contacto: text })}
                            keyboardType="default"
                            value={clientData.contacto}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefono"
                            onChangeText={(text) => setClientData({ ...clientData, telefono: text })}
                            keyboardType="phone-pad"
                            value={clientData.telefono}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            onChangeText={(text) => setClientData({ ...clientData, correo: text })}
                            keyboardType="email-address"
                            value={clientData.correo}
                        />
                    </ThemedView>
                    {concepts.map((concept) => (
                        <ConceptCard
                            key={concept.id}
                            concept={concept}
                            onChange={(key, value) => handleChange(concept.id, key, value)}
                            onDelete={() => handleDelete(concept.id)}
                        />
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={addConcept}>
                        <Text>Agregar Concepto</Text>
                    </TouchableOpacity>
                    <ThemedView style={styles.footerContainer}>
                        <TextInput multiline={true} style={styles.multilineInput} placeholder='Notas (Opcional)' onChangeText={(text) => setNotas(text)} />
                        <ThemedText style={{ marginBottom: 15 }}>Total: ${total.toFixed(2)} + IVA</ThemedText>
                        <TouchableOpacity style={styles.addButton} onPress={exportPDF}>
                            <Text>Exportar</Text>
                        </TouchableOpacity>
                    </ThemedView>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

export default newCotization;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    input: {
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#DDD',
        borderRadius: 5
    },
    addButton: {
        width: '90%',
        backgroundColor: GlobalColors.accent,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        width: '90%',
        marginTop: 15,
        borderRadius: 15,
        elevation: 2,
        padding: 15,
        alignItems: 'center'
    },
    clientContainer: {
        width: '90%',
        marginBottom: 15,
        borderRadius: 15,
        elevation: 2,
        padding: 15,
    },
    clientContainerTitle: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 15,
    },
    multilineInput: {
        width: '90%',
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top',
        textAlign: 'left',
        height: 75,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#DDD'
    },
});
