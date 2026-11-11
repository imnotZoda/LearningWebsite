// src/screens/AuthPage.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { API_URL } from '../constants/api';

export interface UserSession {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthPageProps {
  onLoginSuccess: (user: UserSession) => void;
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState<'admin' | 'user'>('user'); // Fixed to 'user' by default
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    const endpoint = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/signup`;
    const payload = isLogin 
      ? { email, password } 
      : { username, email, password, role };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        return;
      }

      onLoginSuccess(data.user);
    } catch (err) {
      setError('Cannot connect to server.');
    }
  };

  return (
    <LinearGradient
      colors={['#0f172a', '#0369a1', '#0284c7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{isLogin ? 'Login to Portal' : 'Create an Account'}</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#94a3b8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  card: { 
    width: '100%', 
    maxWidth: 400, 
    backgroundColor: '#ffffff', 
    padding: 24, 
    borderRadius: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25, 
    shadowRadius: 15, 
    elevation: 8 
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#0f172a' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', padding: 12, borderRadius: 6, marginBottom: 14, fontSize: 16, color: '#0f172a' },
  submitBtn: { backgroundColor: '#0284c7', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 8 },
  submitText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  toggleContainer: { marginTop: 16, alignItems: 'center' },
  toggleText: { color: '#0284c7', fontSize: 14, fontWeight: '500' },
  errorText: { color: '#ef4444', marginBottom: 12, textAlign: 'center' }
});