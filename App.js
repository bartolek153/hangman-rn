import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Svg, { Circle, G, Line, Rect } from 'react-native-svg';

const palavras = [
  { resposta: "CORINTHIANS", dica: "Nome oficial do time" },
  { resposta: "TIMÃO", dica: "Apelido carinhoso da torcida" },
  { resposta: "FIEL", dica: "Como é conhecida a torcida do Corinthians" },
  { resposta: "GAVIÕES", dica: "Principal torcida organizada do clube" },
  { resposta: "ALVINEGRO", dica: "Cores tradicionais do uniforme" },
  { resposta: "MOSQUETEIRO", dica: "Mascote oficial do clube" },
  { resposta: "PARQUE SÃO JORGE", dica: "Sede social do clube" },
  { resposta: "ARENA CORINTHIANS", dica: "Estádio onde o time manda seus jogos" },
  { resposta: "PAULISTÃO", dica: "Campeonato estadual que o clube disputa" },
  { resposta: "LIBERTADORES", dica: "Competição continental conquistada em 2012" }
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
    if (erradas.length + 1 >= 6) {
      Alert.alert("Game Over", `A resposta era: ${resposta}`, [{ text: "OK", onPress: iniciarJogo }]);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.pontuacao}>Pontuação: {pontuacao}</Text>
      <Text style={estilos.dica}>Dica: {dica}</Text>

      <Svg height="200" width="200">
  {/* Estrutura da Forca */}
  <Line x1="50" y1="180" x2="150" y2="180" stroke="black" strokeWidth="5" />
  <Line x1="100" y1="180" x2="100" y2="50" stroke="black" strokeWidth="5" />
  <Line x1="100" y1="50" x2="150" y2="50" stroke="black" strokeWidth="5" />
  <Line x1="150" y1="50" x2="150" y2="80" stroke="black" strokeWidth="5" />

  {/* Boneco da Forca - Aparece conforme os erros */}
  {erradas.length > 0 && <Circle cx="150" cy="100" r="15" stroke="black" strokeWidth="5" fill="none" />}
  {erradas.length > 1 && <Line x1="150" y1="115" x2="150" y2="150" stroke="black" strokeWidth="5" />}
  {erradas.length > 2 && <Line x1="150" y1="125" x2="130" y2="140" stroke="black" strokeWidth="5" />}
  {erradas.length > 3 && <Line x1="150" y1="125" x2="170" y2="140" stroke="black" strokeWidth="5" />}
  {erradas.length > 4 && <Line x1="150" y1="150" x2="130" y2="170" stroke="black" strokeWidth="5" />}
  {erradas.length > 5 && <Line x1="150" y1="150" x2="170" y2="170" stroke="black" strokeWidth="5" />}
  
</Svg>

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