import { GlobalColors } from '@/assets/GlobalTheme'
import Header from '@/components/AvincoHeader'
import { ThemedView } from '@/components/ThemedView'
import { Asset } from 'expo-asset'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import React, { useState } from 'react'
import { Button, ScrollView, TextInput, View } from 'react-native'

const NewServicio = () => {
    const [error, setError] = useState('');

    async function generateHTML() {
        try {
            const asset = Asset.fromModule(require('@/app/images/logo.png'));
            const image = await manipulateAsync(asset.localUri ?? asset.uri, [], { base64: true, format: SaveFormat.PNG });
            setError("Cargado con exito");
            return`<html>
                <img
                  src="data:image/png;base64,${image.base64}"
                  style="width: 90vw;" />
              </html>`;
        } catch (error: any) {
            setError("Error: " + error.message + "\n" + "Error Stack: \n" + error.stack); // Captura y establece el error en el estado
            return error;
        }
    }

    async function print() {
        // try {
        //     const html = await generateHTML();
        //     const { uri } = await printToFileAsync({ html });
        //     const opcionesCompartir = { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Compartir Archivo' };
        //     await shareAsync(uri, opcionesCompartir);
        // } catch (error: any) {
        //     setError(error.message); // Captura y establece el error en el estado
        // }
    }

    return (
        <ThemedView style={{ flex: 1 }} lightColor={GlobalColors.whiteBackground} darkColor={GlobalColors.blackBackground}>
            <Header />
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'space-evenly' }}>
                <Button title='Imprimir' onPress={generateHTML} />
                <Button title='Imprimir Firmado' />
                <TextInput scrollEnabled style={{ backgroundColor: 'white', width: '90%', height: 300, color: 'black', padding: 5 }} multiline value={error} />

            </View>
        </ThemedView>
    )
}

export default NewServicio;
