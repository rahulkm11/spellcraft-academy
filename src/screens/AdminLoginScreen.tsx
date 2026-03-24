import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AdminDashboardScreen from './AdminDashboardScreen';

export default function AdminLoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'spelladmin123' && password === 'spellpassword123') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (authenticated) {
    return <AdminDashboardScreen onLogout={() => setAuthenticated(false)} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">SpellCraft Admin</h1>
          <p className="text-muted-foreground text-sm">Enter credentials to view analytics</p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          <Button onClick={handleLogin} className="w-full gap-2">
            <LogIn className="w-4 h-4" /> Sign In
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
