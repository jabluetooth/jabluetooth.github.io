import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FloatingInput, FloatingTextarea, FloatingSelect } from "@/components/ui/floating-input";

const N8N_WEBHOOK_URL = "https://n8n.filheinzrelatorre.com/webhook-test/ad07da4a-667d-4226-8301-25b49b327980";

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  companySize: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

export function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    companySize: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Please enter your company name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: "landing_page",
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          companySize: "",
          message: "",
        });
        setErrors({});
      } else {
        throw new Error("Server responded with error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error("Network error - check if n8n webhook is active and CORS is enabled");
      }
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
      <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500" />
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl">Get Started Today</CardTitle>
        <CardDescription>
          See the automation in action. Fill out the form and watch the magic happen!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            id="name"
            label="Full Name"
            required
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={errors.name}
          />

          <FloatingInput
            id="email"
            type="email"
            label="Work Email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
          />

          <FloatingInput
            id="company"
            label="Company Name"
            required
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            error={errors.company}
          />

          <FloatingInput
            id="phone"
            type="tel"
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />

          <FloatingSelect
            label="Company Size"
            value={formData.companySize}
            onValueChange={(value) => handleInputChange("companySize", value)}
            options={companySizes}
          />

          <FloatingTextarea
            id="message"
            label="What challenges are you facing?"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 hover:from-red-700 hover:via-orange-600 hover:to-yellow-600 text-white font-semibold shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit Request"
            )}
          </Button>

          {submitStatus === "success" && (
            <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200 text-green-800 animate-in fade-in slide-in-from-top-2">
              <strong>Success!</strong> We've received your request. Our AI is already
              enriching your data and our team will reach out shortly!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 rounded-lg bg-red-50 border-2 border-red-200 text-red-800 animate-in fade-in slide-in-from-top-2">
              <strong>Oops!</strong> Something went wrong. Please try again or contact
              us directly.
            </div>
          )}
        </form>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Your information is secure and will never be shared
          </p>
          <div className="flex justify-center gap-4 flex-wrap text-sm text-muted-foreground">
            <span>Instant Processing</span>
            <span>AI-Powered</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
