import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import {
  MailIcon,
  CheckIcon,
  ShieldIcon,
  ZapIcon,
  ArrowRightIcon,
  SparklesIcon,
  BrainIcon,
  HeartIcon,
  AlertTriangleIcon,
  TagIcon,
  ReplyIcon,
  FolderIcon,
  TrendingUpIcon,
  ClockIcon,
  StarIcon,
  ArchiveIcon,
  SendIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  LockIcon,
  GlobeIcon,
  SmartphoneIcon,
  MonitorIcon,
  TabletIcon,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GmailIcon, OutlookIcon, AppleIcon, AIIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 py-20 md:py-32 w-full max-w-6xl px-6">
        <div className="text-center max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl">
              <MailIcon
                className="text-blue-600 dark:text-blue-400"
                size={32}
              />
            </div>
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Atom Mail
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="text-blue-600 dark:text-blue-400">
              AI-Powered Email
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed">
            Experience the future of email with intelligent organization, smart
            replies, and seamless productivity features designed for the modern
            workplace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            as={Link}
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 transition-all duration-200 flex-1"
            radius="lg"
            size="lg"
            startContent={<ArrowRightIcon size={18} />}
          >
            Get Started Free
          </Button>

          <Button
            as={Link}
            href="#features"
            className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700 font-medium py-3 px-8 transition-all duration-200 flex-1"
            radius="lg"
            size="lg"
            variant="flat"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 text-gray-500 dark:text-neutral-500">
          <span className="text-sm font-medium">
            Integrates seamlessly with:
          </span>
          <div className="flex gap-6">
            <div className="bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
              <GmailIcon size={24} />
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
              <OutlookIcon size={24} />
            </div>
            <div className="bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
              <AppleIcon size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="w-full bg-gray-50/80 dark:bg-neutral-900/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AIIcon size={24} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                AI-Powered Features
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Intelligent Email Management
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Our advanced AI features help you stay organized, respond faster,
              and focus on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Email Summarization */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg w-fit mb-4">
                <ZapIcon
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart Summarization
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                Get instant summaries of long emails and threads. Save time and
                stay informed with AI-generated overviews.
              </p>
            </div>

            {/* Priority Detection */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-orange-50 dark:bg-orange-950/40 p-3 rounded-lg w-fit mb-4">
                <AlertTriangleIcon
                  className="text-orange-600 dark:text-orange-400"
                  size={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Priority Detection
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                Automatically identify urgent emails and important messages.
                Never miss what matters most.
              </p>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-pink-50 dark:bg-pink-950/40 p-3 rounded-lg w-fit mb-4">
                <HeartIcon
                  className="text-pink-600 dark:text-pink-400"
                  size={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sentiment Analysis
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                Understand the emotional tone of your emails. Respond
                appropriately with context-aware insights.
              </p>
            </div>

            {/* Smart Categorization */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-purple-50 dark:bg-purple-950/40 p-3 rounded-lg w-fit mb-4">
                <TagIcon
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Auto-Categorization
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                Emails are automatically sorted into categories like Work,
                Bills, and Promotions for better organization.
              </p>
            </div>

            {/* Smart Replies */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-green-50 dark:bg-green-950/40 p-3 rounded-lg w-fit mb-4">
                <ReplyIcon
                  className="text-green-600 dark:text-green-400"
                  size={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart Replies
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                Get contextual reply suggestions powered by AI. Respond faster
                with intelligent, relevant responses.
              </p>
            </div>

            {/* Inbox Organization */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-teal-50 dark:bg-teal-950/40 p-3 rounded-lg w-fit mb-4">
                <FolderIcon
                  className="text-teal-600 dark:text-teal-400"
                  size={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Inbox Organization
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed">
                AI-powered inbox organization keeps your emails structured and
                easy to find when you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="w-full py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Productive Email
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto">
              A comprehensive email experience designed for modern professionals
              and teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Unified Inbox */}
            <div className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-xl">
              <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-lg w-fit mb-6">
                <InboxIcon
                  className="text-blue-600 dark:text-blue-400"
                  size={28}
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Unified Inbox Experience
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Manage all your email accounts in one place. Gmail, Outlook,
                Apple Mail, and more - all seamlessly integrated with a
                consistent, beautiful interface.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Multiple account support
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Real-time synchronization
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Cross-platform compatibility
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Search */}
            <div className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-xl">
              <div className="bg-purple-50 dark:bg-purple-950/40 p-3 rounded-lg w-fit mb-6">
                <SearchIcon
                  className="text-purple-600 dark:text-purple-400"
                  size={28}
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Intelligent Search
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Find any email instantly with our powerful search engine. Search
                by content, sender, date, attachments, or even emotional tone
                with AI-powered search capabilities.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Natural language queries
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Advanced filters
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Instant results
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Security */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-red-50 dark:bg-red-950/40 p-3 rounded-lg w-fit mb-4">
                <ShieldIcon
                  className="text-red-600 dark:text-red-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">
                End-to-end encryption, two-factor authentication, and advanced
                threat protection.
              </p>
            </div>

            {/* Performance */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-yellow-50 dark:bg-yellow-950/40 p-3 rounded-lg w-fit mb-4">
                <ZapIcon
                  className="text-yellow-600 dark:text-yellow-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">
                Optimized performance with instant loading and smooth
                interactions across all devices.
              </p>
            </div>

            {/* Customization */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-lg w-fit mb-4">
                <SettingsIcon
                  className="text-indigo-600 dark:text-indigo-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Fully Customizable
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">
                Personalize your email experience with themes, layouts, and
                workflow preferences.
              </p>
            </div>

            {/* Collaboration */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-lg w-fit mb-4">
                <UserIcon
                  className="text-emerald-600 dark:text-emerald-400"
                  size={24}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Team Collaboration
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">
                Share emails, collaborate on responses, and manage team
                communications effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Stats */}
      <section className="w-full bg-gray-50/80 dark:bg-neutral-900/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Proven Results for{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Productivity
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Join thousands of professionals who have transformed their email
              workflow with HeroMail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl w-fit mx-auto mb-4">
                <ClockIcon
                  className="text-blue-600 dark:text-blue-400"
                  size={32}
                />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                2.5hrs
              </div>
              <div className="text-gray-600 dark:text-neutral-400">
                Average time saved per day with AI features
              </div>
            </div>

            <div className="text-center">
              <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl w-fit mx-auto mb-4">
                <TrendingUpIcon
                  className="text-green-600 dark:text-green-400"
                  size={32}
                />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                85%
              </div>
              <div className="text-gray-600 dark:text-neutral-400">
                Increase in email processing efficiency
              </div>
            </div>

            <div className="text-center">
              <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl w-fit mx-auto mb-4">
                <StarIcon
                  className="text-purple-600 dark:text-purple-400"
                  size={32}
                />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                4.9/5
              </div>
              <div className="text-gray-600 dark:text-neutral-400">
                Average user satisfaction rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Platform Support */}
      <section className="w-full py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Access Your Email{" "}
              <span className="text-blue-600 dark:text-blue-400">Anywhere</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Seamless experience across all your devices with real-time
              synchronization and consistent interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-xl text-center">
              <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl w-fit mx-auto mb-6">
                <MonitorIcon
                  className="text-blue-600 dark:text-blue-400"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Desktop & Web
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-6">
                Full-featured experience on Windows, macOS, and Linux. Access
                via web browser from anywhere.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Native desktop apps
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Progressive web app
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-xl text-center">
              <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl w-fit mx-auto mb-6">
                <SmartphoneIcon
                  className="text-green-600 dark:text-green-400"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Mobile Apps
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-6">
                Native iOS and Android apps with full feature parity and
                optimized mobile experience.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    iOS & Android apps
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Offline support
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-xl text-center">
              <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl w-fit mx-auto mb-6">
                <TabletIcon
                  className="text-purple-600 dark:text-purple-400"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Tablet Optimized
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-6">
                Specially designed interface for tablets with enhanced
                productivity features and touch optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Touch-optimized UI
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon
                    className="text-green-600 dark:text-green-400"
                    size={16}
                  />
                  <span className="text-sm text-gray-700 dark:text-neutral-300">
                    Split-screen support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-gray-50/80 dark:bg-neutral-900/30 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl w-fit mx-auto mb-6">
            <MailIcon className="text-blue-600 dark:text-blue-400" size={48} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Email Experience?
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already made the switch to
            smarter, more efficient email management with HeroMail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <Button
              as={Link}
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 transition-all duration-200 flex-1"
              radius="lg"
              size="lg"
              startContent={<ArrowRightIcon size={18} />}
            >
              Start Free Trial
            </Button>

            <Button
              as={Link}
              href="/auth/login"
              className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700 font-medium py-3 px-8 transition-all duration-200 flex-1"
              radius="lg"
              size="lg"
              variant="flat"
            >
              View Demo
            </Button>
          </div>

          <div className="text-sm text-gray-500 dark:text-neutral-500">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
        </div>
      </section>
    </div>
  );
}
