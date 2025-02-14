import { useState } from "react";
import { motion } from "framer-motion";
import { Form, Input, Button, notification } from "antd";
import {  Eye, EyeOff, Mail, ShieldEllipsis } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

type Step = "initial" | "verification";

export function Registration({ onComplete }: { onComplete: () => void }) {
  const [form] = Form.useForm();
  const [step, setStep] = useState<Step>("initial");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    if (step === "initial") {
      setTimeout(() => {
        setStep("verification");
        notification.success({
          message: "Verification code sent to your email",
          description: `We have sent a verification code to ${values.email}`,
          placement: "topRight",
          duration: 2,
        });
        setIsLoading(false);
      }, 5000);
    }
  };

  const handleSubmitVerification = () => {
    if(!verificationCode) return notification.error({ message: "Please enter verification code", duration: 2 });
    onComplete();
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep("verification");
      setIsLoading(false);
    }, 5000);
  };

  const renderInitialStep = () => (
    <Form disabled={isLoading} form={form} onFinish={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please enter your full name" },
            { min: 3, max: 20, message: "Full Name should have 3-20 letters only" },
          ]}
        >
          <Input placeholder="Full Name" autoComplete="name" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { min: 7, max: 50, message: "Email should have 3 - 50 letters only" },
          ]}
        >
          <Input type="email" placeholder="Email" autoComplete="email" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            {
              pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,15}$/,
              message:
                "Password should be at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be 8-15 characters long!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            autoComplete="new-password"
            iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
            size="large"
          />
        </Form.Item>
      </div>
      <Form.Item>
        <div className="space-y-3">
          <Button
            icon={<ShieldEllipsis />}
            loading={isLoading}
            type="primary"
            size="large"
            className="w-full"
            htmlType="submit"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </Button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleGoogleLogin();
              } else {
                notification.error({
                  message: "Error",
                  description: "Google login failed",
                });
              }
            }}
            size="large"
            shape="rectangular"
          />
        </div>
      </Form.Item>
    </Form>
  );

  const renderVerificationStep = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <Mail className="h-12 w-12 text-blue-600" />
      </div>
      <Input
        placeholder="Enter verification code"
        required
        className="text-center text-lg tracking-widest"
        maxLength={6}
        size="large"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}
      />
      <Button
        icon={<ShieldEllipsis />}
        type="primary"
        onClick={handleSubmitVerification}
        size="large"
        className="w-full"
        htmlType="submit"
      >
        Verify Email
      </Button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {step === "initial" ? "Create your account" : "Verify your email"}
        </h2>
        <p className="mt-2 text-gray-600">
          {step === "initial" ? "Get started with BeyondChats" : "Enter the verification code sent to your email"}
        </p>
      </div>
      {step === "initial" ? renderInitialStep() : renderVerificationStep()}
    </motion.div>
  );
}