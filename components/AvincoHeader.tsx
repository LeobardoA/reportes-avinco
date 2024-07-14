import React from 'react'
import { ThemedView } from './ThemedView';
import { Image, StyleSheet, Text } from 'react-native';
import { GlobalColors } from '@/assets/GlobalTheme';

const Header = () => {
    return (
        <ThemedView lightColor={GlobalColors.whitePrimaryColor} darkColor={GlobalColors.blackPrimaryColor} style={styles.header}>
            <Image source={require('@/assets/images/logo.png')} style={{ width: 80, height: 80, marginRight: 5 }} />
            <Text style={{ fontSize: 35, fontWeight: 'bold', color: GlobalColors.accent, marginLeft: 5 }}>AVINCO</Text>
        </ThemedView>
    )
}
export default Header;

const styles = StyleSheet.create({
    header: {
        paddingTop: 15,
        height: '20%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});