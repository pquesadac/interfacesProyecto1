import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useMovies } from '../hooks/useMovies';
import Slider from '../components/Slider';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function HomeScreen() {
  const { nowPlaying, loading } = useMovies();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cartelera</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Slider movies={nowPlaying.movies} height={300} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});