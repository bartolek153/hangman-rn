import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Svg } from 'expo';

const { Circle, G, Line, Rect } = Svg;

const palavras = [
  { resposta: "REACT", dica: "Biblioteca JavaScript para interfaces" },
  { resposta: "EXPO", dica: "Framework para apps React Native" },
  { resposta: "MOBILE", dica: "Tipo de desenvolvimento de apps" }
];

const getPalavraAleatoria = () => palavras[Math.floor(Math.random() * palavras.length)];

export default function App() {
  const [resposta, setResposta] = useState("");
  const [dica, setDica] = useState("");
  const [corretas, setCorretas] = useState([]);
  const [erradas, setErradas] = useState([]);
  const [pontuacao, setPontuacao] = useState(0);

  useEffect(() => {
    iniciarJogo();
  }, []);

  const iniciarJogo = () => {
    const palavra = getPalavraAleatoria();
    setResposta(palavra.resposta);
    setDica(palavra.dica);
    setCorretas([]);
    setErradas([]);
    setPontuacao(0);
  };

  const verificarLetra = (letra) => {
    if (corretas.includes(letra) || erradas.includes(letra)) return;
    if (resposta.includes(letra)) {
      setCorretas([...corretas, letra]);
      setPontuacao(pontuacao + 1);
    } else {
      setErradas([...erradas, letra]);
    }

    if (resposta.split('').every((l) => corretas.includes(l) || l === letra)) {
      Alert.alert("Parabéns!", "Você acertou a palavra!", [{ text: "OK", onPress: iniciarJogo }]);
    }
    if (erradas.length + 1 >= 5) {
      Alert.alert("Game Over", `A resposta era: ${resposta}`, [{ text: "OK", onPress: iniciarJogo }]);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.pontuacao}>Pontuação: {pontuacao}</Text>
      <Text style={estilos.dica}>Dica: {dica}</Text>
      <View style={estilos.palavra}>
        {resposta.split('').map((letra, index) => (
          <Text key={index} style={estilos.letra}>{corretas.includes(letra) ? letra : "_"}</Text>
        ))}
      </View>
      <View style={estilos.teclado}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map((letra) => (
          <TouchableOpacity key={letra} onPress={() => verificarLetra(letra)} style={estilos.tecla}>
            <Text style={estilos.textoTecla}>{letra}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  pontuacao: { fontSize: 20, fontWeight: 'bold' },
  dica: { fontSize: 18, color: 'gray', marginBottom: 20 },
  palavra: { flexDirection: 'row', marginBottom: 20 },
  letra: { fontSize: 24, marginHorizontal: 5 },
  teclado: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  tecla: { margin: 5, padding: 10, backgroundColor: '#ccc', borderRadius: 5 },
  textoTecla: { fontSize: 18 }
});