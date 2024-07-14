import { GlobalColors } from '@/assets/GlobalTheme';
import Header from '@/components/AvincoHeader';
import Cliente from '@/components/misc/Cliente';
import { getAllClients, setupDatabase } from '@/components/misc/DatabaseManager';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router, useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

const index = () => {
    const colorScheme = useColorScheme();

    const [clientes, setClientes] = useState<Cliente[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                await setupDatabase();
                const allClients = await getAllClients();
                setClientes(allClients);
            };
            fetchData();
        }, [])
    );

    return (
        <ThemedView lightColor={GlobalColors.whiteBackground} darkColor={GlobalColors.blackBackground} style={styles.container}>
            <Header />
            <ScrollView style={{
                flex: 1,
                marginTop: 25,
            }}>
                {clientes.map((cliente: Cliente, index) => (
                    <ThemedView style={styles.contactContainer} key={index}>
                        <TouchableOpacity
                            onPress={() => router.navigate({ pathname: 'updateClient', params: { id: cliente.id } })}>
                            <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>{cliente.alias}</ThemedText>
                            {cliente.alias !== cliente.name ? <ThemedText>{cliente.name}</ThemedText> : null}
                            <ThemedText>{cliente.domicilio}</ThemedText>
                            <ThemedText>{cliente.telefono}</ThemedText>
                            <ThemedText>{cliente.correo}</ThemedText>
                            <ThemedText>{cliente.contacto}</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                ))}
            </ScrollView >
            <ThemedView style={styles.addBtn} lightColor='#ffa224' darkColor='#ef6503'>
                <TouchableOpacity onPress={()=>router.navigate('addClient')}>
                    <ThemedText style={{fontWeight: '500'}}>Agregar Cliente</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    )
}

export default index;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contactContainer: {
        marginVertical: 8,
        marginHorizontal: 20,
        elevation: 2,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    addBtn: {
        position: 'absolute',
        right: 0,
        bottom: 20,
        margin: 10,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2
    }
});