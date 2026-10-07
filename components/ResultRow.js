import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultRow({ intento, resultado, index }) {
  return (
    <View style={styles.row}>
      <Text style={styles.index}>{index}</Text>
      <Text style={styles.intento}>{intento}</Text>
      <View style={styles.resultadoContainer}>
        {resultado.split(' ').map((item, i) => {
          const [count, type] = item.split(/([BRM])/);
          return (
            <Text key={i} style={[styles.resultado, styles[type.toLowerCase()]]}>
              {count}{type}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 8,
  },
  index: {
    fontSize: 18,
    color: '#fff',
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  intento: {
    fontSize: 20,
    color: '#fff',
    width: 80,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultadoContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  resultado: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  b: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    color: '#4CAF50',
  },
  r: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    color: '#FFC107',
  },
  m: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    color: '#F44336',
  },
});
