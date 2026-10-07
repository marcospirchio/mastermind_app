import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputForm from './InputForm';
import ResultRow from './ResultRow';
import { generarNumeroAleatorio, verificarIntento } from '../utils/gameLogic';
import { agregarResultado } from '../data/rankingData';

export default function GameBoard({ onGameEnd, sinRepetir, nombreJugador, onReiniciar }) {
  const [numeroSecreto, setNumeroSecreto] = useState([]);
  const [intentos, setIntentos] = useState([]);
  const [intentoActual, setIntentoActual] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [intentosRestantes, setIntentosRestantes] = useState(10);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const flatListRef = useRef(null);

  const reiniciarEstadoJuego = () => {
    const secreto = generarNumeroAleatorio(sinRepetir);
    setNumeroSecreto(secreto);
    console.log('Número secreto real:', secreto.join(''));
    setIntentos([]);
    setIntentoActual('');
    setMensaje('');
    setIntentosRestantes(10);
    setJuegoTerminado(false);
  };

  useEffect(() => {
    reiniciarEstadoJuego();
  }, [sinRepetir]);

  const manejarIntento = async () => {
    if (intentoActual.length !== 4 || isNaN(intentoActual)) {
      Alert.alert('Error', 'Debes ingresar un número de 4 cifras.');
      return;
    }

    const resultado = verificarIntento(intentoActual, numeroSecreto);
    const nuevoIntento = {
      nro: intentoActual,
      resultado: `${resultado.bien}B ${resultado.regular}R ${resultado.mal}M`,
    };

    const nuevosIntentos = [...intentos, nuevoIntento];
    setIntentos(nuevosIntentos);
    setIntentosRestantes(prev => prev - 1);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    if (resultado.bien === 4) {
      setMensaje('🎉 ¡Ganaste!');
      await agregarResultado(true, nombreJugador);
      setJuegoTerminado(true);
    } else if (intentosRestantes - 1 === 0) {
      setMensaje(`💥 Perdiste. El número era ${numeroSecreto.join('')}`);
      await agregarResultado(false, nombreJugador);
      setJuegoTerminado(true);
    }

    setIntentoActual('');
  };

  const reiniciarJuego = () => {
    Alert.alert(
      'Reiniciar Juego',
      '¿Quieres jugar con o sin repetición de cifras?',
      [
        {
          text: 'Con repetición',
          onPress: () => {
            onReiniciar(false);
            reiniciarEstadoJuego();
          }
        },
        {
          text: 'Sin repetición',
          onPress: () => {
            onReiniciar(true);
            reiniciarEstadoJuego();
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Código: {juegoTerminado ? numeroSecreto.join('') : '****'}
            </Text>
            {!juegoTerminado && (
              <Button 
                title="🚪 Salir" 
                onPress={() => {
                  Alert.alert(
                    'Salir del juego',
                    '¿Estás seguro que quieres salir? Se perderá el progreso actual.',
                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel'
                      },
                      {
                        text: 'Salir',
                        onPress: onGameEnd,
                        style: 'destructive'
                      }
                    ]
                  );
                }}
                color="#F44336"
              />
            )}
          </View>

          {!juegoTerminado && (
            <View style={styles.inputContainer}>
              <InputForm
                intento={intentoActual}
                setIntento={setIntentoActual}
                onSubmit={manejarIntento}
              />
            </View>
          )}

          <View style={styles.gameArea}>
            <FlatList
              ref={flatListRef}
              data={intentos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <ResultRow intento={item.nro} resultado={item.resultado} index={index + 1} />
              )}
              style={styles.lista}
              contentContainerStyle={styles.listaContenido}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            <Text style={styles.mensaje}>{mensaje}</Text>

            {juegoTerminado && (
              <View style={styles.botones}>
                <Button 
                  title="🔄 Jugar Otra Vez" 
                  onPress={reiniciarJuego}
                  color="#4CAF50"
                />
                <View style={styles.buttonSpacer} />
                <Button 
                  title="🏁 Volver al Menú" 
                  onPress={onGameEnd}
                  color="#FFC107"
                />
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    flex: 1,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  gameArea: {
    flex: 1,
  },
  lista: {
    flex: 1,
  },
  listaContenido: {
    paddingBottom: 10,
  },
  mensaje: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: '#ffd700',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  botones: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonSpacer: {
    height: 15,
  },
});

