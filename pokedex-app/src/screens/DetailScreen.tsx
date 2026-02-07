import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { usePokemon } from '../hooks/usePokemon';
import { useEvolutionChain } from '../hooks/useEvolution';
import { useFavoritesStore } from '../store/favoritesStore';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { TypeBadge } from '../components/TypeBadge';
import { StatBar } from '../components/StatBar';
import { EvolutionChain } from '../components/EvolutionChain';
import { colors } from '../theme/colors';
import { capitalize, formatPokemonId, formatHeight, formatWeight } from '../utils/helpers';

export function DetailScreen({ route, navigation }: any) {
  const { pokemonId } = route.params;
  const { data: pokemon, isLoading, error, refetch } = usePokemon(pokemonId);
  const { data: evolutionChain } = useEvolutionChain(pokemonId);
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load Pokémon" onRetry={refetch} />;
  if (!pokemon) return null;

  const favorite = isFavorite(pokemon.id);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.pokemonId}>{formatPokemonId(pokemon.id)}</Text>
            <Text style={styles.pokemonName}>{capitalize(pokemon.name)}</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(pokemon.id)}
          >
            <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type.type.name} type={type.type.name} />
          ))}
        </View>
      </View>

      {/* Sprite */}
      <View style={styles.spriteContainer}>
        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
          style={styles.sprite}
          contentFit="contain"
          transition={300}
        />
      </View>

      {/* Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{pokemon.species.flavorText}</Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{formatHeight(pokemon.height)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{formatWeight(pokemon.weight)}</Text>
          </View>
        </View>

        <View style={styles.abilitiesContainer}>
          <Text style={styles.infoLabel}>Abilities</Text>
          {pokemon.abilities.map((ability) => (
            <Text key={ability.ability.name} style={styles.abilityText}>
              • {capitalize(ability.ability.name.replace('-', ' '))}
              {ability.is_hidden && ' (Hidden)'}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Base Stats</Text>
        {pokemon.stats.map((stat) => (
          <StatBar
            key={stat.stat.name}
            statName={stat.stat.name}
            value={stat.base_stat}
          />
        ))}
      </View>

      {/* Evolution Chain */}
      {evolutionChain && evolutionChain.length > 0 && (
        <EvolutionChain
          nodes={evolutionChain}
          onPokemonPress={(id) => navigation.push('Detail', { pokemonId: id })}
        />
      )}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pokemonId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 4,
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 32,
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  spriteContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  sprite: {
    width: 200,
    height: 200,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  abilitiesContainer: {
    marginTop: 8,
  },
  abilityText: {
    fontSize: 14,
    color: colors.text.primary,
    marginTop: 4,
  },
  bottomSpacer: {
    height: 32,
  },
});
