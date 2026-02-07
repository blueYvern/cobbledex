import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { EvolutionNode } from '../types';
import { evolutionService } from '../services/evolution.service';
import { colors } from '../theme/colors';
import { capitalize } from '../utils/helpers';

interface EvolutionChainProps {
  nodes: EvolutionNode[];
  onPokemonPress: (id: number) => void;
}

export function EvolutionChain({ nodes, onPokemonPress }: EvolutionChainProps) {
  if (!nodes || nodes.length === 0) {
    return null;
  }

  const renderNode = (node: EvolutionNode, depth: number = 0): React.ReactNode => {
    return (
      <View key={node.id} style={styles.nodeContainer}>
        <TouchableOpacity 
          style={styles.pokemonButton}
          onPress={() => onPokemonPress(node.id)}
        >
          <Image
            source={{ uri: node.image }}
            style={styles.sprite}
            contentFit="contain"
            transition={200}
          />
          <Text style={styles.name}>{capitalize(node.name)}</Text>
        </TouchableOpacity>

        {node.evolvesTo.map((evolution, index) => (
          <View key={`${node.id}-${index}`} style={styles.evolutionBranch}>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>↓</Text>
              <Text style={styles.condition}>
                {evolutionService.formatEvolutionCondition(evolution)}
              </Text>
            </View>
            {renderNode(evolution.pokemon, depth + 1)}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evolution Chain</Text>
      <View style={styles.chainContainer}>
        {renderNode(nodes[0])}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  chainContainer: {
    alignItems: 'center',
  },
  nodeContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  pokemonButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    minWidth: 120,
  },
  sprite: {
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 4,
  },
  evolutionBranch: {
    alignItems: 'center',
    marginTop: 8,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  arrow: {
    fontSize: 24,
    color: colors.primary,
  },
  condition: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
});
