import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={cn(errors.name && "border-destructive")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Work Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={cn(errors.email && "border-destructive")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              placeholder="Acme Corp"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className={cn(errors.company && "border-destructive")}
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select
              value={formData.companySize || undefined}
              onValueChange={(value) => handleInputChange("companySize", value ?? "")}
            >
              <SelectTrigger id="companySize">
                <SelectValue placeholder="Select size..." />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">What challenges are you facing?</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your sales process and what you'd like to automate..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="min-h-[100px]"
            />
          </div>

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
