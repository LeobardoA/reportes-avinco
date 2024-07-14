import { GlobalColors } from '@/assets/GlobalTheme';
import Header from '@/components/AvincoHeader';
import { ThemedView } from '@/components/ThemedView';
import React from 'react'
import { StyleSheet } from 'react-native';

const index = () => {
    return (
        <ThemedView lightColor={GlobalColors.whiteBackground} darkColor={GlobalColors.blackBackground} style={styles.container}>
            <Header />
        </ThemedView>
    )
}

export default index;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});