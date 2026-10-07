import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Button, Switch, Text, TextInput, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GameBoard from './components/GameBoard';
import Ranking from './components/Ranking';
import PantallaSplash from './src/screens/PantallaSplash';

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [sinRepetir, setSinRepetir] = useState(true);
  const [nombreJugador, setNombreJugador] = useState('');
  const [mostrarInputNombre, setMostrarInputNombre] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    if (!isPlaying && !showRanking && !mostrarSplash) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isPlaying, showRanking, mostrarSplash]);

  const iniciarJuego = () => {
    if (!nombreJugador.trim()) {
      Alert.alert(
        'Jugar sin nombre',
        'Si juegas sin nombre, tu resultado no se guardará en el ranking. ¿Deseas continuar?',
        [
          {
            text: 'Volver y continuar con nombre',
            style: 'cancel'
          },
          {
            text: 'Continuar sin nombre',
            onPress: () => setIsPlaying(true)
          }
        ]
      );
      return;
    }
    setIsPlaying(true);
  };

  const volverAlMenu = () => {
    setIsPlaying(false);
    setNombreJugador('');
    setMostrarInputNombre(true);
  };

  const reiniciarJuego = (nuevoSinRepetir) => {
    setSinRepetir(nuevoSinRepetir);
    setIsPlaying(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        {mostrarSplash ? (
          <PantallaSplash alFinalizar={() => setMostrarSplash(false)} />
        ) : isPlaying ? (
          <GameBoard
            onGameEnd={volverAlMenu}
            sinRepetir={sinRepetir}
            nombreJugador={nombreJugador}
            onReiniciar={reiniciarJuego}
          />
        ) : showRanking ? (
          <Ranking onBack={() => setShowRanking(false)} />
        ) : (
          <View style={styles.menu}>
            <Animated.View style={[
              styles.titleContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}>
              <Text style={styles.gameTitle}>Mastermind</Text>
              <Text style={styles.gameSubtitle}>Adivina el número secreto</Text>
            </Animated.View>

            {mostrarInputNombre && (
              <View style={styles.nameContainer}>
                <Text style={styles.nameLabel}>Nombre:</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder="Ingresa tu nombre"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={nombreJugador}
                  onChangeText={setNombreJugador}
                  maxLength={20}
                />
              </View>
            )}

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {sinRepetir ? 'Con repetición de cifras' : 'Sin repetición de cifras'}
              </Text>
              <Switch
                value={sinRepetir}
                onValueChange={setSinRepetir}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={sinRepetir ? '#4CAF50' : '#f4f3f4'}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="🎮 Jugar"
                onPress={iniciarJuego}
                color="#4CAF50"
              />
              <View style={styles.buttonSpacer} />
              <Button
                title="🏆 Ver Ranking"
                onPress={() => setShowRanking(true)}
                color="#FFC107"
              />
            </View>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gameTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  gameSubtitle: {
    fontSize: 24,
    color: '#ffd700',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  nameContainer: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
  },
  nameLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  nameInput: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    padding: 15,
    fontSize: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
    borderRadius: 8,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  switchText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonSpacer: {
    height: 15,
  },
});
