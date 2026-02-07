import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useFavoritesStore } from '../store/favoritesStore';
import { usePokemon } from '../hooks/usePokemon';
import { colors } from '../theme/colors';
import { capitalize, formatPokemonId, getSpriteUrl } from '../utils/helpers';

function FavoriteCard({ pokemonId, onPress }: any) {
  const { data: pokemon } = usePokemon(pokemonId);

  if (!pokemon) return null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: getSpriteUrl(pokemon.id) }}
        style={styles.cardImage}
        contentFit="contain"
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardId}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.cardName}>{capitalize(pokemon.name)}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

export function FavoritesScreen({ navigation }: any) {
  const { getFavoritesList } = useFavoritesStore();
  const favorites = getFavoritesList();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>⭐</Text>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubtext}>
          Start adding your favorite Pokémon!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(id) => id.toString()}
        renderItem={({ item }) => (
          <FavoriteCard
            pokemonId={item}
            onPress={() => navigation.navigate('SearchTab', {
              screen: 'Detail',
              params: { pokemonId: item }
            })}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardId: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  arrow: {
    fontSize: 24,
    color: colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
