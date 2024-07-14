import { useRef } from 'react';
import { View, Button } from 'react-native';
import { SignatureViewRef } from 'react-native-signature-canvas';
import SignatureScreen from 'react-native-signature-canvas';

const App = () => {
    const ref = useRef<SignatureViewRef>(null);

    const handleSignature = (signature: string) => {
        console.log(signature); // Aquí obtienes la firma en base64
    };

    const handleClear = () => {
        ref.current?.clearSignature();
    };

    const handleConfirm = () => {
        ref.current?.readSignature();
    };

    return (
        <View style={{ flex: 1 }}>
            <SignatureScreen
                ref={ref}
                onOK={handleSignature}
                autoClear={true}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}>
                <Button title="Clear" onPress={handleClear} />
                <Button title="Confirm" onPress={handleConfirm} />
            </View>
        </View>
    );
};

export default App;
