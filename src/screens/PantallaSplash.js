import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PantallaSplash({ alFinalizar }) {
  useEffect(() => {
    const temporizador = setTimeout(() => {
      alFinalizar();
    }, 2000);

    return () => clearTimeout(temporizador);
  }, []);

  return (
    <View style={estilos.fondo}>
      <Image source={require('../../assets/icon.png')} style={estilos.logo} />
      <Text style={estilos.titulo}>Mastermind: Adivina el Número</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2f',
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 25,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
