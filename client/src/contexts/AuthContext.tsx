import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
	id: string;
	email: string;
	username?: string | null;
};

type AuthContextValue = {
	user: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string, username?: string) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = 'app_users_v1';
const AUTH_KEY = 'app_auth_user_v1';

function generateId() {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const raw = localStorage.getItem(AUTH_KEY);
		if (raw) {
			try {
				setUser(JSON.parse(raw));
			} catch {
				setUser(null);
			}
		}
	}, []);

	const persistAuth = (u: User | null) => {
		setUser(u);
		if (u) {
			localStorage.setItem(AUTH_KEY, JSON.stringify(u));
		} else {
			localStorage.removeItem(AUTH_KEY);
		}
	};

	const readUsers = (): Array<{ id: string; email: string; password: string; username?: string }> => {
		try {
			const raw = localStorage.getItem(USERS_KEY);
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	};

	const writeUsers = (u: Array<{ id: string; email: string; password: string; username?: string }>) => {
		localStorage.setItem(USERS_KEY, JSON.stringify(u));
	};

	const signIn = async (email: string, password: string) => {
		const users = readUsers();
		const found = users.find((x) => x.email === email && x.password === password);
		if (!found) {
			return Promise.reject(new Error('Invalid credentials'));
		}
		const u: User = { id: found.id, email: found.email, username: found.username };
		persistAuth(u);
	};

	const signUp = async (email: string, password: string, username?: string) => {
		const users = readUsers();
		if (users.find((x) => x.email === email)) {
			return Promise.reject(new Error('User already exists'));
		}
		const id = generateId();
		users.push({ id, email, password, username });
		writeUsers(users);
		const u: User = { id, email, username };
		persistAuth(u);
	};

	const signInWithGoogle = async () => {
		// Simulate Google sign-in by creating/finding a google user
		const email = `google_user_${Math.floor(Math.random() * 10000)}@example.com`;
		const users = readUsers();
		let found = users.find((x) => x.email === email);
		if (!found) {
			const id = generateId();
			found = { id, email, password: '', username: 'Google User' };
			users.push(found);
			writeUsers(users);
		}
		const u: User = { id: found.id, email: found.email, username: found.username };
		persistAuth(u);
	};

	const resetPassword = async (email: string) => {
		// In frontend-only mode we just pretend a reset link was sent
		const users = readUsers();
		const found = users.find((x) => x.email === email);
		if (!found) {
			return Promise.reject(new Error('Email not found'));
		}
		return Promise.resolve();
	};

	const signOut = async () => {
		persistAuth(null);
	};

	return (
		<AuthContext.Provider value={{ user, signIn, signUp, signInWithGoogle, resetPassword, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};

export default AuthContext;
