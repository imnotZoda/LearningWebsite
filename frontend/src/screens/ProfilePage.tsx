// src/screens/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API_URL } from '../constants/api';

interface Attempt {
  id: number;
  score: number;
  total_points: number;
  passed: boolean | number;
  completed_at: string;
  quiz_title: string;
}

interface ProfilePageProps {
  userId?: number;
  username?: string;
  email?: string;
}

export default function ProfilePage({ userId = 1, username = 'User', email = '' }: ProfilePageProps) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  const avatarInitials = username
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  useEffect(() => {
    fetch(`${API_URL}/users/${userId}/attempts`)
      .then((res) => res.json())
      .then((data: Attempt[]) => setAttempts(data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarInitials || 'U'}</Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.username}>{username}</Text>
          {email ? <Text style={styles.email}>{email}</Text> : null}
        </View>
      </View>
      <Text style={styles.header}>Your Quiz Scores & Progress</Text>
      <FlatList
        data={attempts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.quizName}>{item.quiz_title}</Text>
            <Text>Score: {item.score} / {item.total_points}</Text>
            <Text style={{ color: item.passed ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
              {item.passed ? 'PASSED' : 'FAILED'}
            </Text>
            <Text style={styles.dateText}>{new Date(item.completed_at).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 70, flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 28, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#0284c7', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  avatarText: { color: '#ffffff', fontSize: 24, fontWeight: 'bold' },
  userDetails: { flex: 1 },
  username: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
  email: { fontSize: 14, color: '#64748b', marginTop: 4 },
  card: { padding: 16, backgroundColor: '#ffffff', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  quizName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  dateText: { color: '#64748b', fontSize: 12, marginTop: 4 }
});