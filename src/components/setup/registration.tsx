import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Chrome, Mail } from 'lucide-react';

export function Registration({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'initial' | 'verification'>('initial');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'initial') {
      setStep('verification');
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {step === 'initial' ? 'Create your account' : 'Verify your email'}
        </h2>
        <p className="mt-2 text-gray-600">
          {step === 'initial'
            ? 'Get started with BeyondChats'
            : 'Enter the verification code sent to your email'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 'initial' ? (
          <>
            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                required
                autoComplete="name"
              />
              <Input
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-3">
              <Button className="w-full" type="submit">
                Create Account
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Mail className="h-12 w-12 text-blue-600" />
            </div>
            <Input
              placeholder="Enter verification code"
              required
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
            <Button className="w-full" type="submit">
              Verify Email
            </Button>
          </div>
        )}
      </form>
    </motion.div>
  );
}