import AsyncStorage from '@react-native-async-storage/async-storage';

export let ranking = [];


export const cargarRanking = async () => {
  try {
    const rankingGuardado = await AsyncStorage.getItem('ranking');
    if (rankingGuardado) {
      ranking = JSON.parse(rankingGuardado);
    }
  } catch (error) {
    console.error('Error al cargar el ranking:', error);
  }
};

const guardarRanking = async () => {
  try {
    await AsyncStorage.setItem('ranking', JSON.stringify(ranking));
  } catch (error) {
    console.error('Error al guardar el ranking:', error);
  }
};

export async function agregarResultado(ganado, nombre) {
  if (nombre && nombre.trim()) {
    const jugadorExistente = ranking.find(j => j.nombre === nombre.trim());
    
    if (jugadorExistente) {
      jugadorExistente.partidasJugadas++;
      if (ganado) {
        jugadorExistente.victorias++;
      } else {
        jugadorExistente.derrotas++;
      }
      jugadorExistente.porcentajeVictorias = (jugadorExistente.victorias / jugadorExistente.partidasJugadas * 100).toFixed(1);
    } else {
      ranking.push({
        nombre: nombre.trim(),
        partidasJugadas: 1,
        victorias: ganado ? 1 : 0,
        derrotas: ganado ? 0 : 1,
        porcentajeVictorias: ganado ? '100.0' : '0.0'
      });
    }

    await guardarRanking();
  }
}
