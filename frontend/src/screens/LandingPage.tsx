// src/screens/LandingPage.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteName } from '../components/Navbar';

interface LandingPageProps {
  onNavigate: (route: RouteName) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Master New Concepts Easily</Text>
      <Text style={styles.subtitle}>
        Explore topics, read in-depth lessons, and test your knowledge with interactive quizzes.
      </Text>
      <TouchableOpacity style={styles.ctaButton} onPress={() => onNavigate('lessons')}>
        <Text style={styles.ctaText}>Browse Lessons</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, paddingTop: 60, backgroundColor: 'transparent' },
  title: { fontSize: 42, fontWeight: '800', color: '#1e1b4b', textAlign: 'center', marginBottom: 16, letterSpacing: -1 },
  subtitle: { fontSize: 18, color: '#475569', textAlign: 'center', maxWidth: 650, marginBottom: 32, lineHeight: 28 },
  ctaButton: { backgroundColor: '#5b21b6', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 10, shadowColor: '#5b21b6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  ctaText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});