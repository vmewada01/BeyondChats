import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Code2, Mail, MessageSquare, Share2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const INTEGRATION_CODE = `<script>
  window.BEYONDCHATS_CONFIG = {
    websiteId: 'YOUR_WEBSITE_ID'
  };
</script>
<script async src="https://cdn.beyondchats.ai/widget.js"></script>`;

export function Integration() {
  const [step, setStep] = useState<'options' | 'success' | 'testing'>('options');
  const [showChatbot, setShowChatbot] = useState(false);

  const handleSuccess = () => {
    setStep('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {step === 'options'
            ? 'Integration & Testing'
            : step === 'testing'
            ? 'Test Your Chatbot'
            : 'Integration Complete! 🎉'}
        </h2>
        <p className="mt-2 text-gray-600">
          {step === 'options'
            ? 'Choose how you want to integrate the chatbot'
            : step === 'testing'
            ? 'Preview how your chatbot will appear on your website'
            : 'Your chatbot is ready to help your customers'}
        </p>
      </div>

      {step === 'options' && (
        <div className="grid gap-6 md:grid-cols-2">
          <button
            onClick={() => setStep('testing')}
            className="flex flex-col items-center rounded-lg border border-gray-200 p-6 text-center transition-colors hover:bg-gray-50"
          >
            <MessageSquare className="mb-4 h-10 w-10 text-blue-600" />
            <h3 className="mb-2 text-lg font-semibold">Test Chatbot</h3>
            <p className="text-sm text-gray-600">
              Preview and interact with your chatbot before going live
            </p>
          </button>

          <button
            onClick={handleSuccess}
            className="flex flex-col items-center rounded-lg border border-gray-200 p-6 text-center transition-colors hover:bg-gray-50"
          >
            <Code2 className="mb-4 h-10 w-10 text-blue-600" />
            <h3 className="mb-2 text-lg font-semibold">Get Integration Code</h3>
            <p className="text-sm text-gray-600">
              Add the chatbot to your website with a simple code snippet
            </p>
          </button>
        </div>
      )}

      {step === 'testing' && (
        <div className="relative min-h-[500px] rounded-lg border border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
            <span className="font-medium">Preview Mode</span>
            <Button variant="outline" onClick={handleSuccess}>
              Complete Integration
            </Button>
          </div>
          
          <div className="p-8">
            <h1 className="mb-4 text-2xl font-bold">Your Website</h1>
            <p className="text-gray-600">This is a preview of how the chatbot will appear on your website.</p>
          </div>

          {!showChatbot && (
            <button
              onClick={() => setShowChatbot(true)}
              className="fixed bottom-6 right-6 rounded-full bg-blue-600 p-4 text-white shadow-lg transition-transform hover:scale-105"
            >
              <MessageSquare className="h-6 w-6" />
            </button>
          )}

          {showChatbot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 right-6 h-[400px] w-[350px] rounded-lg bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b p-4">
                <span className="font-medium">Chat with us</span>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="h-[calc(100%-60px)] overflow-y-auto p-4">
                <div className="mb-4 rounded-lg bg-blue-50 p-3">
                  Hello! How can I help you today?
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {step === 'success' && (
        <div className="space-y-8">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <pre className="overflow-x-auto whitespace-pre-wrap text-sm">
              <code>{INTEGRATION_CODE}</code>
            </pre>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(INTEGRATION_CODE);
                }}
              >
                Copy Code
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              <Trophy className="mr-2 h-5 w-5" />
              Explore Admin Panel
            </Button>
            <Button size="lg" variant="outline">
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Chatting
            </Button>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share on Twitter
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share on LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email Developer
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}