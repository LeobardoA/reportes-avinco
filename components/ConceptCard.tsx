import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export interface Concept {
    id: string;
    description: string;
    quantity: string;
    unitPrice: string;
}

interface ConceptCardProps {
    concept: Concept;
    onChange: (key: keyof Concept, value: string) => void;
    onDelete: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, onChange, onDelete }) => {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const colorScheme = useColorScheme();
    return (
        <ThemedView style={styles.card}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ThemedText>Partida: {concept.id}</ThemedText>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ width: 25, alignItems: 'center' }}
                            onPress={onDelete}
                        >
                            <FontAwesome name='trash' size={20} color={Colors[colorScheme ?? 'light'].text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: 25, alignItems: 'center' }}
                            onPress={() => setIsFormVisible(!isFormVisible)}
                        >
                            <FontAwesome name={isFormVisible ? 'caret-up' : 'caret-down'} size={25} color={Colors[colorScheme ?? 'light'].text} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ThemedText style={{ marginBottom: 15 }}>Sub-Total: ${parseFloat(concept.quantity) * parseFloat(concept.unitPrice)}</ThemedText>
            </View>
            {isFormVisible && (
                <View >
                    <ThemedText>Descripcion</ThemedText>
                    <TextInput
                        style={styles.input}
                        value={concept.description}
                        onChangeText={(text) => onChange('description', text)}
                    />
                    <ThemedText>Cantidad</ThemedText>
                    <TextInput
                        style={styles.input}
                        value={concept.quantity}
                        onChangeText={(text) => onChange('quantity', text)}
                        keyboardType="numeric"
                    />
                    <ThemedText>Precio Unitario</ThemedText>
                    <TextInput
                        style={styles.input}
                        value={concept.unitPrice}
                        onChangeText={(text) => onChange('unitPrice', text)}
                        keyboardType="numeric"
                    />
                </View>
            )}
        </ThemedView>
    )
}
export default ConceptCard;

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
        width: '90%',
        padding: 15,
        borderRadius: 15,
    },
    input: {
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#DDD',
        borderRadius: 5
    },
});