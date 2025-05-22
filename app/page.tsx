import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import {
  MailIcon,
  CheckIcon,
  ShieldIcon,
  ZapIcon,
  ArrowRightIcon,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { GmailIcon, OutlookIcon, AppleIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-6 py-20 md:py-28 w-full max-w-7xl px-6">
        <div className="inline-block max-w-3xl text-center justify-center">
          <span className={title({ size: "lg" })}>Modern Email for&nbsp;</span>
          <span className={title({ color: "blue", size: "lg" })}>
            Modern Teams
          </span>
          <div
            className={subtitle({ class: "mt-6 mx-auto text-center text-xl" })}
          >
            Streamline your communication with our intuitive email client. Fast,
            secure, and designed for productivity.
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="bg-primary text-white flex items-center space-x-2"
            as={Button}
            variant="solid"
            size="lg"
          >
            <span>Get Started Free</span>
            <ArrowRightIcon size={18} className="ml-1" />
          </HoverBorderGradient>

          <Button
            as={Link}
            href="#features"
            variant="bordered"
            radius="full"
            size="lg"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-6 text-default-500">
          <span className="text-sm">Works with:</span>
          <div className="flex gap-6">
            <GmailIcon size={24} />
            <OutlookIcon size={24} />
            <AppleIcon size={24} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full bg-default-50/50 dark:bg-default-900/20 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={title({ size: "md" })}>
              Why Choose{" "}
              <span className={title({ color: "blue", size: "md" })}>
                Dove Mail
              </span>
            </h2>
            <p className="text-default-600 mt-4 max-w-2xl mx-auto">
              Our email client is designed to make your communication seamless
              and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-divider">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ZapIcon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-default-600">
                Experience email at the speed of thought with our optimized
                interface
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-divider">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldIcon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure by Design</h3>
              <p className="text-default-600">
                Your data is protected with end-to-end encryption and advanced
                security features
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background p-6 rounded-xl shadow-sm border border-divider">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckIcon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
              <p className="text-default-600">
                AI-powered filters and categories keep your inbox clean and
                organized
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
