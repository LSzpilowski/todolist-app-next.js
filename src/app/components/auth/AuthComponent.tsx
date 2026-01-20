'use client';

import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { PrivacyPolicyModal } from '../legal/PrivacyPolicyModal';
import { GDPRModal } from '../legal/GDPRModal';

export function AuthComponent() {
  const { user, loading, signInWithProvider, signOut } = useAuthStore();

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithProvider('google');
    if (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleGithubSignIn = async () => {
    const { error } = await signInWithProvider('github');
    if (error) {
      console.error('Error signing in with GitHub:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Logged In</CardTitle>
          <CardDescription>
            {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {user.user_metadata?.avatar_url && (
              <Image 
                src={user.user_metadata.avatar_url} 
                alt="Avatar" 
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <p className="font-medium">{user.user_metadata?.full_name || user.email}</p>
              <p className="text-sm text-muted-foreground">
                Provider: {user.app_metadata?.provider}
              </p>
            </div>
          </div>
          <Button onClick={signOut} variant="outline" className="w-full">
            Log out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Choose your sign in method
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={handleGoogleSignIn}
          variant="outline" 
          className="w-full gap-2 hover:bg-white/10"
        >
          <FaGoogle className="w-5 h-5" />
          Continue with Google
        </Button>
        <Button 
          onClick={handleGithubSignIn}
          variant="outline" 
          className="w-full gap-2 hover:bg-white/10"
        >
          <FaGithub className="w-5 h-5" />
          Continue with GitHub
        </Button>
        <p className="text-xs text-center text-muted-foreground pt-2">
          By signing in, you accept our{' '}
          <PrivacyPolicyModal>
            <button className="text-primary hover:underline">
              privacy policy
            </button>
          </PrivacyPolicyModal>
          {' '}and data processing under{' '}
          <GDPRModal>
            <button className="text-primary hover:underline transition-all">
              GDPR
            </button>
          </GDPRModal>.
        </p>
      </CardContent>
    </Card>
  );
}
