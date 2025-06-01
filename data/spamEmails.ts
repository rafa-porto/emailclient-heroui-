import { EmailData } from "@/types";

export const spamEmails: EmailData[] = [
  {
    id: "spam-1",
    sender: "Nigerian Prince",
    avatarUrl: "https://i.pravatar.cc/150?u=nigerian.prince",
    subject: "🚨 URGENT: You've Won $10,000,000 USD!!!",
    snippet: "Congratulations! You have been selected to receive a large sum of money...",
    content: `
      <p>CONGRATULATIONS!!!</p>
      <br/>
      <p>You have been selected to receive the sum of $10,000,000 USD from the Nigerian National Lottery.</p>
      <br/>
      <p>To claim your prize, please send us your:</p>
      <ul>
        <li>Full Name</li>
        <li>Bank Account Details</li>
        <li>Social Security Number</li>
        <li>Copy of your ID</li>
      </ul>
      <br/>
      <p>Send this information immediately to claim your prize!</p>
      <br/>
      <p>Prince Abubakar Mohammed</p>
      <p>Nigerian National Lottery Commission</p>
    `,
    timestamp: "2 days ago",
    read: false,
  },
  {
    id: "spam-2",
    sender: "PharmacyDeals@bestmeds.com",
    avatarUrl: "https://i.pravatar.cc/150?u=pharmacy.deals",
    subject: "💊 50% OFF All Medications - No Prescription Needed!",
    snippet: "Get all your medications at unbeatable prices without prescription...",
    content: `
      <p>SPECIAL OFFER - 50% OFF ALL MEDICATIONS!</p>
      <br/>
      <p>No prescription needed! Get all your medications delivered discreetly to your door.</p>
      <br/>
      <p>✅ Viagra - $2.99 per pill<br/>
      ✅ Cialis - $3.49 per pill<br/>
      ✅ Pain medications<br/>
      ✅ Weight loss pills<br/>
      ✅ And much more!</p>
      <br/>
      <p>Order now and save big! Limited time offer!</p>
      <br/>
      <p>Click here to order: [SUSPICIOUS LINK]</p>
    `,
    timestamp: "3 days ago",
    read: false,
  },
  {
    id: "spam-3",
    sender: "IRS Tax Department",
    avatarUrl: "https://i.pravatar.cc/150?u=irs.fake",
    subject: "⚠️ FINAL NOTICE: Tax Refund Pending - Action Required",
    snippet: "Your tax refund of $2,847 is pending. Immediate action required...",
    content: `
      <p>FINAL NOTICE FROM IRS</p>
      <br/>
      <p>Your tax refund of $2,847.00 is currently pending due to incomplete information.</p>
      <br/>
      <p>To process your refund immediately, please verify your information by clicking the link below:</p>
      <br/>
      <p><strong>VERIFY NOW: [PHISHING LINK]</strong></p>
      <br/>
      <p>Failure to respond within 24 hours will result in forfeiture of your refund.</p>
      <br/>
      <p>IRS Tax Department<br/>
      Reference: IRS-2024-REF-8847</p>
    `,
    timestamp: "1 week ago",
    read: true,
  },
  {
    id: "spam-4",
    sender: "Amazon Security",
    avatarUrl: "/amazon-fake.svg",
    isBrand: true,
    subject: "🔒 Suspicious Activity Detected on Your Account",
    snippet: "We've detected unusual activity on your Amazon account. Click here to secure...",
    content: `
      <p>Dear Amazon Customer,</p>
      <br/>
      <p>We've detected suspicious activity on your Amazon account. For your security, we have temporarily limited access to your account.</p>
      <br/>
      <p>To restore full access, please verify your account information:</p>
      <br/>
      <p><strong>VERIFY ACCOUNT: [PHISHING LINK]</strong></p>
      <br/>
      <p>If you don't verify within 24 hours, your account will be permanently suspended.</p>
      <br/>
      <p>Amazon Security Team</p>
    `,
    timestamp: "5 days ago",
    read: false,
  },
  {
    id: "spam-5",
    sender: "CryptoInvestments@crypto-profits.biz",
    avatarUrl: "https://i.pravatar.cc/150?u=crypto.scam",
    subject: "🚀 Make $5000/Day Trading Bitcoin - Guaranteed Returns!",
    snippet: "Join thousands who are making $5000+ daily with our proven Bitcoin strategy...",
    content: `
      <p>🚀 MAKE $5000 PER DAY TRADING BITCOIN! 🚀</p>
      <br/>
      <p>Join thousands of successful traders who are making $5000+ daily with our proven Bitcoin trading strategy!</p>
      <br/>
      <p>✅ 100% Guaranteed Returns<br/>
      ✅ No Experience Required<br/>
      ✅ Automated Trading System<br/>
      ✅ Start with just $250</p>
      <br/>
      <p>Limited spots available! Join now before it's too late!</p>
      <br/>
      <p>REGISTER NOW: [SCAM LINK]</p>
      <br/>
      <p>CryptoInvestments Team</p>
    `,
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "spam-6",
    sender: "Microsoft Support",
    avatarUrl: "/microsoft-fake.svg",
    isBrand: true,
    subject: "⚠️ Your Windows License Has Expired - Renew Now",
    snippet: "Your Windows license has expired. Renew immediately to avoid system shutdown...",
    content: `
      <p>Microsoft Windows License Expiration Notice</p>
      <br/>
      <p>Your Windows license has expired and your computer will be shut down in 24 hours.</p>
      <br/>
      <p>To renew your license and avoid system shutdown:</p>
      <br/>
      <p>1. Call our support line: 1-800-FAKE-NUM<br/>
      2. Or click here to renew online: [MALICIOUS LINK]</p>
      <br/>
      <p>License Key: WIN-FAKE-KEY-123</p>
      <br/>
      <p>Microsoft Support Team</p>
    `,
    timestamp: "4 days ago",
    read: true,
  },
  {
    id: "spam-7",
    sender: "WeightLossSecrets@slim-fast.net",
    avatarUrl: "https://i.pravatar.cc/150?u=weight.loss",
    subject: "🔥 Lose 30 Pounds in 30 Days - Doctor's Secret Revealed!",
    snippet: "Doctors hate this one simple trick that helps you lose 30 pounds in 30 days...",
    content: `
      <p>🔥 LOSE 30 POUNDS IN 30 DAYS! 🔥</p>
      <br/>
      <p>Doctors HATE this one simple trick that helps you lose 30 pounds in just 30 days!</p>
      <br/>
      <p>This secret method has helped thousands of people lose weight without:</p>
      <ul>
        <li>Dieting</li>
        <li>Exercise</li>
        <li>Surgery</li>
        <li>Expensive supplements</li>
      </ul>
      <br/>
      <p>Watch this FREE video to discover the secret: [SPAM LINK]</p>
      <br/>
      <p>Limited time offer - Watch now before it's removed!</p>
    `,
    timestamp: "6 days ago",
    read: false,
  },
  {
    id: "spam-8",
    sender: "PayPal Security",
    avatarUrl: "/paypal-fake.svg",
    isBrand: true,
    subject: "🔐 Account Limitation - Verify Your Information",
    snippet: "Your PayPal account has been limited due to security concerns...",
    content: `
      <p>PayPal Account Limitation Notice</p>
      <br/>
      <p>Your PayPal account has been limited due to security concerns.</p>
      <br/>
      <p>To remove this limitation, please verify your account information:</p>
      <br/>
      <p><strong>VERIFY NOW: [PHISHING LINK]</strong></p>
      <br/>
      <p>Required information:</p>
      <ul>
        <li>Credit card details</li>
        <li>Bank account information</li>
        <li>Social Security Number</li>
      </ul>
      <br/>
      <p>PayPal Security Department</p>
    `,
    timestamp: "1 week ago",
    read: true,
  }
];
