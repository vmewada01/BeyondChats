import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, SkipForward, StepForward, XCircle } from "lucide-react";
import { Button, Space } from "antd";

const DUMMY_PAGES = [
  { url: "/about", status: "completed" },
  { url: "/products", status: "completed" },
  { url: "/services", status: "in-progress" },
  { url: "/contact", status: "pending" },
  { url: "/blog/post-1", status: "completed" },
  { url: "/blog/post-2", status: "pending" },
] as const;

const DUMMY_CHUNKS = ["Our company was founded in 2010 with a mission to revolutionize customer service.", "We offer 24/7 support through our AI-powered chatbot system.", "Our team consists of experts in machine learning and customer experience."];

export function WebsiteScraping({ onComplete }: { onComplete: () => void }) {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Training your chatbot</h2>
        <p className="mt-2 text-gray-600">We're analyzing your website content to train your chatbot</p>
      </div>

      <div className="relative h-2 rounded-full bg-gray-200">
        <motion.div className="absolute left-0 top-0 h-full rounded-full bg-blue-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4 text-lg font-semibold">Detected Pages</h3>
          <div className="space-y-3">
            {DUMMY_PAGES?.map((page) => (
              <button key={page.url} onClick={() => setSelectedPage(page.url)} className="flex w-full items-center justify-between rounded-lg border border-gray-100 p-3 text-left hover:bg-gray-50">
                <span className="font-medium">{page.url}</span>
                {page.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {page.status === "in-progress" && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
                {page.status === "pending" && <XCircle className="h-5 w-5 text-red-600" />}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="mb-4 text-lg font-semibold">{selectedPage ? `Content from ${selectedPage}` : "Select a page to view content"}</h3>
          {selectedPage ? (
            <div className="space-y-3">
              {DUMMY_CHUNKS.map((chunk, i) => (
                <div key={i} className="rounded-lg border border-gray-100 p-3 text-sm text-gray-700">
                  {chunk}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center text-gray-500">Click on a page to view extracted content</div>
          )}
        </div>
      </div>

      <Space>
        <Button type="primary" size="large" icon={<SkipForward />} variant="outlined" onClick={onComplete}>
          Skip Training
        </Button>
        <Button type="primary" size="large" icon={<StepForward />} onClick={onComplete} disabled={progress < 100}>
          {progress < 100 ? "Training in Progress..." : "Continue"}
        </Button>
      </Space>
    </motion.div>
  );
}
