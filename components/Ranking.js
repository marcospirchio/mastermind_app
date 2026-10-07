import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { ranking, cargarRanking } from '../data/rankingData';

export default function Ranking({ onBack }) {
  const [loading, setLoading] = useState(true);
  const [rankingOrdenado, setRankingOrdenado] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      await cargarRanking();
      const ordenado = [...ranking].sort((a, b) => 
        parseFloat(b.porcentajeVictorias) - parseFloat(a.porcentajeVictorias)
      );
      setRankingOrdenado(ordenado);
      setLoading(false);
    };

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFC107" />
        <Text style={styles.loadingText}>Cargando ranking...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Ranking</Text>
      <FlatList
        data={rankingOrdenado}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemIndex}>{index + 1}</Text>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.nombre}</Text>
              <View style={styles.statsContainer}>
                <Text style={styles.statsText}>
                  Partidas: {item.partidasJugadas}
                </Text>
                <Text style={styles.statsText}>
                  Victorias: {item.victorias}
                </Text>
                <Text style={styles.statsText}>
                  Derrotas: {item.derrotas}
                </Text>
                <Text style={[
                  styles.statsText,
                  styles.porcentaje,
                  parseFloat(item.porcentajeVictorias) >= 50 ? styles.porcentajeAlto : styles.porcentajeBajo
                ]}>
                  {item.porcentajeVictorias}% victorias
                </Text>
              </View>
            </View>
          </View>
        )}
        style={styles.lista}
        contentContainerStyle={styles.listaContenido}
      />
      <Button 
        title="🔙 Volver" 
        onPress={onBack}
        color="#FFC107"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#1a1a2e',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  lista: {
    flex: 1,
    marginBottom: 20,
  },
  listaContenido: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemIndex: {
    fontSize: 20,
    color: '#fff',
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemContent: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statsText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  porcentaje: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  porcentajeAlto: {
    color: '#4CAF50',
  },
  porcentajeBajo: {
    color: '#F44336',
  },
});
