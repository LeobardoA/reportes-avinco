import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import { GlobalColors } from '@/assets/GlobalTheme';
import Header from '@/components/AvincoHeader';
import { router } from 'expo-router';

const index = () => {
    return (
        <ThemedView lightColor={GlobalColors.whiteBackground} darkColor={GlobalColors.blackBackground} style={styles.container}>
            <Header />
            <View style={styles.content}>
                <ThemedView style={styles.card}>
                    <TouchableOpacity style={styles.cardLayout} onPress={() => { router.navigate('newServicio') }}>
                        <View style={styles.cardImage}>
                            <Image source={require('@/assets/images/logo.png')} style={{ width: 80, height: 80, marginRight: 5 }} />
                        </View>
                        <View style={styles.cardContainer}>
                            <ThemedText style={styles.cardTitle}>Nuevo Servicio</ThemedText>
                            <ThemedText style={styles.cardDescription}>Inicie un nuevo reporte para gestionar trabajos en campo</ThemedText>
                        </View>
                    </TouchableOpacity>
                </ThemedView>
                <ThemedView style={styles.card}>
                    <TouchableOpacity style={styles.cardLayout} onPress={() => { router.navigate('newCotizacion') }}>
                        <View style={styles.cardImage}>
                            <Image source={require('@/assets/images/logo.png')} style={{ width: 80, height: 80, marginRight: 5 }} />
                        </View>
                        <View style={styles.cardContainer}>
                            <ThemedText style={styles.cardTitle}>Nueva Cotización</ThemedText>
                            <ThemedText style={styles.cardDescription}>Genere una cotización detallada para los clientes</ThemedText>
                        </View>
                    </TouchableOpacity>
                </ThemedView>
            </View>
        </ThemedView >
    )
}

export default index;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    card: {
        width: '90%',
        height: 200,
        padding: 15,
        borderRadius: 15,
        elevation: 2,
        justifyContent: 'center'
    },
    cardLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImage: {
        flex: 2,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        flex: 4,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    cardDescription: {
        fontSize: 16,
    }
});