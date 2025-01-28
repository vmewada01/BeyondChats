import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Globe, Loader2 } from 'lucide-react';

export function Organization({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate meta description fetching
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Set up your organization
        </h2>
        <p className="mt-2 text-gray-600">
          Tell us about your business
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            placeholder="Company Name"
            required
          />
          
          <div className="relative">
            <Input
              placeholder="Website URL"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            )}
          </div>

          <textarea
            className="min-h-[100px] w-full rounded-lg border border-gray-200 p-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            placeholder="Company Description"
            required
          />
        </div>

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Fetching website data...
            </>
          ) : (
            <>
              <Globe className="mr-2 h-5 w-5" />
              Continue
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}