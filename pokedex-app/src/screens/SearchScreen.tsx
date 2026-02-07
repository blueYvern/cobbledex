import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { usePokemonSearch } from '../hooks/usePokemon';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { colors } from '../theme/colors';

export function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error, refetch } = usePokemonSearch(searchTerm);

  const handleSubmit = () => {
    if (query.trim()) {
      setSearchTerm(query.trim());
    }
  };

  React.useEffect(() => {
    if (data && searchTerm) {
      navigation.navigate('Detail', { pokemonId: data.id });
      setQuery('');
      setSearchTerm('');
    }
  }, [data, searchTerm]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Search Pokémon</Text>
        <Text style={styles.subtitle}>Enter a Pokémon name or ID number</Text>
        
        <TextInput
          style={styles.input}
          placeholder="e.g., pikachu or 25"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />

        {isLoading && <LoadingState message="Searching..." />}
        {error && (
          <ErrorState
            message="Pokémon not found. Try another name or ID."
            onRetry={refetch}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
