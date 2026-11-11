// src/components/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type RouteName = 'landing' | 'lessons' | 'admin' | 'profile' | 'auth';

interface NavbarProps {
  currentRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  userRole?: 'admin' | 'user';
  onLogout: () => void;
}

export default function Navbar({ currentRoute, onNavigate, userRole = 'user', onLogout }: NavbarProps) {
  return (
    <View nativeID="app-navbar" style={styles.navbar}>
      <TouchableOpacity onPress={() => onNavigate('landing')}>
        <Text style={styles.logo}>LearnPortal</Text>
      </TouchableOpacity>

      <View style={styles.navLinks}>
        <TouchableOpacity 
          style={[styles.link, currentRoute === 'landing' && styles.activeLink]} 
          onPress={() => onNavigate('landing')}
        >
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.link, currentRoute === 'lessons' && styles.activeLink]} 
          onPress={() => onNavigate('lessons')}
        >
          <Text style={styles.linkText}>Lessons</Text>
        </TouchableOpacity>

        {userRole === 'admin' && (
          <TouchableOpacity 
            style={[styles.link, currentRoute === 'admin' && styles.activeLink]} 
            onPress={() => onNavigate('admin')}
          >
            <Text style={styles.linkText}>Admin Panel</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={[styles.link, currentRoute === 'profile' && styles.activeLink]} 
          onPress={() => onNavigate('profile')}
        >
          <Text style={styles.linkText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.link, styles.logoutBtn]} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: { fontSize: 20, fontWeight: 'bold', color: '#22d3ee' },
  navLinks: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  link: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 },
  activeLink: { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  linkText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  logoutBtn: { backgroundColor: '#ef4444' },
  logoutText: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' }
});