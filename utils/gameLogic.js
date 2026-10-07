export function generarNumeroAleatorio(sinRepetir = true) {
  let numeros = [];
  while (numeros.length < 4) {
    const digito = Math.floor(Math.random() * 10);
    if (!sinRepetir || !numeros.includes(digito)) {
      numeros.push(digito);
    }
  }
  return numeros;
}

export function verificarIntento(intento, secreto) {
  let bien = 0;
  let regular = 0;

  const intentoArr = intento.split('').map(Number);
  const usadoSecreto = [false, false, false, false];
  const usadoIntento = [false, false, false, false];

  for (let i = 0; i < 4; i++) {
    if (intentoArr[i] === secreto[i]) {
      bien++;
      usadoSecreto[i] = true;
      usadoIntento[i] = true;
    }
  }

  for (let i = 0; i < 4; i++) {
    if (!usadoIntento[i]) {
      for (let j = 0; j < 4; j++) {
        if (!usadoSecreto[j] && intentoArr[i] === secreto[j]) {
          regular++;
          usadoSecreto[j] = true;
          usadoIntento[i] = true;
          break;
        }
      }
    }
  }

  const mal = 4 - bien - regular;

  return { bien, regular, mal };
}
