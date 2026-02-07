import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { getStatName } from '../utils/helpers';

interface StatBarProps {
  statName: string;
  value: number;
  maxValue?: number;
}

export function StatBar({ statName, value, maxValue = 255 }: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  const statColor = getStatColor(statName);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{getStatName(statName)}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: statColor }]} />
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function getStatColor(statName: string): string {
  const colorMap: Record<string, string> = {
    hp: colors.stat.hp,
    attack: colors.stat.attack,
    defense: colors.stat.defense,
    'special-attack': colors.stat.specialAttack,
    'special-defense': colors.stat.specialDefense,
    speed: colors.stat.speed,
  };
  return colorMap[statName] || colors.primary;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  name: {
    width: 80,
    fontSize: 14,
    color: colors.text.secondary,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  value: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
