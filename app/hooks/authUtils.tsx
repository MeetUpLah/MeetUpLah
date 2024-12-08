import auth from '@react-native-firebase/auth';

// Authentication functions
export const signIn = async (email: string, password: string, setLoading: (loading: boolean) => void) => {
    setLoading(true);
    try {
        await auth().signInWithEmailAndPassword(email, password);
        alert('Logged in');
    } catch (e: any) {
        alert("Login failed: " + e.message);
    } finally {
        setLoading(false);
    }
}

export const signUp = async (email: string, password: string, setLoading: (loading: boolean) => void) => {
    setLoading(true);
    try {
        await auth().createUserWithEmailAndPassword(email, password);
        alert('Account created');
    } catch (e: any) {
        alert("Registration failed: " + e.message);
    } finally {
        setLoading(false);
    }
}

