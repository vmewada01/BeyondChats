import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Form, Input } from "antd";
import { Globe, Loader2 } from "lucide-react";

export function Organization({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Set up your organization</h2>
        <p className="mt-2 text-gray-600">Tell us about your business</p>
      </div>

      <Form form={form} onFinish={handleSubmit} layout="vertical" className="space-y-6">
        <Form.Item name="companyName" rules={[{ required: true, message: "Please enter company name" }]} label="Company Name">
          <Input size="large" placeholder="Company Name" />
        </Form.Item>

        <Form.Item name="websiteUrl" rules={[{ type: "url", required: true, message: "Please enter website URL" }]} label="Website URL">
          <Input size="large" placeholder="Website URL" suffix={loading ? <Loader2 /> : null} />
        </Form.Item>

        <Form.Item name="companyDescription" rules={[{ required: true, message: "Please enter company description" }]} label="Company Description">
          <Input.TextArea rows={4} placeholder="Company Description" />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" block disabled={loading}>
            {loading ? <Loader2 className="mr-2" /> : <Globe className="mr-2" />}
            {loading ? "Fetching website data..." : "Continue"}
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
}
