import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Form, Input } from "antd";
import { Chrome, Eye, EyeOff, Mail } from "lucide-react";

export function Registration({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<"initial" | "verification">("initial");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "initial") {
      setStep("verification");
    } else {
      onComplete();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{step === "initial" ? "Create your account" : "Verify your email"}</h2>
        <p className="mt-2 text-gray-600">{step === "initial" ? "Get started with BeyondChats" : "Enter the verification code sent to your email"}</p>
      </div>

      {step === "initial" ? (
        <>
          <Form onFinish={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Form.Item rules={[{ required: true, message: "Please enter your name" }]}>
                <Input placeholder="Full Name" autoComplete="name" size="large" />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: "Please enter your email" }]}>
                <Input type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} size="large" />
              </Form.Item>
              <Form.Item rules={[{ required: true, message: "Please enter your password" }]}>
                <Input.Password type="password" placeholder="Password" autoComplete="new-password" iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)} size="large" />
              </Form.Item>
            </div>
           <Form.Item>
            <div className="space-y-3">
              <Button className="w-full" type="submit">
                Create Account
              </Button>

              <Button type="button" variant="outline" className="w-full">
                <Chrome className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>
            </div>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <Mail className="h-12 w-12 text-blue-600" />
          </div>
          <Input placeholder="Enter verification code" required className="text-center text-lg tracking-widest" maxLength={6} size="large" />
          <Button className="w-full" type="submit">
            Verify Email
          </Button>
        </div>
      )}
    </motion.div>
  );
}
