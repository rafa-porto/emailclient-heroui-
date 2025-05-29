import { EmailData } from "@/types";

export const mockEmails: EmailData[] = [
  {
    id: "1",
    sender: "Emma Rooney",
    avatarUrl: "https://i.pravatar.cc/150?u=emma.rooney",
    subject:
      "Appointment booked: Call Emma <> Emilie Lemaire @ Fri Apr 25, 2025 12:30pm - 1pm (GMT-7)",
    snippet: "Hi Emilie, how are you?...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>It was lovely to meet you. I have great news to share! The team absolutely adored you and they are willing to move forward with an offer!</p>
      <br/>
      <p>Would you be available for a 15 min call to go over compensation and benefits?</p>
      <p>Let me know,</p>
      <p>Emma</p>
    `,
    timestamp: "9:59AM",
    read: false,
    isAIGenerated: true,
    isImportant: true,
    attachments: [
      {
        id: "att1",
        name: "Job_Offer_Details.pdf",
        size: "234 KB",
        type: "application/pdf",
      },
      {
        id: "att2",
        name: "Benefits_Package.pdf",
        size: "156 KB",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "2",
    sender: "Github",
    avatarUrl: "/github.svg",
    isBrand: true,
    subject: "New pull request in danielpurnell/ui-docs",
    snippet: "There's a new pull request waiting for your review...",
    content: `
      <p>There's a new pull request waiting for your review in the repository danielpurnell/ui-docs.</p>
      <br/>
      <p><strong>Pull Request:</strong> Update documentation structure</p>
      <p><strong>Author:</strong> john-doe</p>
      <p><strong>Files changed:</strong> 12 files</p>
      <br/>
      <p>View the changes and provide your feedback.</p>
      <br/>
      <p>GitHub</p>
    `,
    timestamp: "9:48AM",
    read: true,
  },
  {
    id: "3",
    sender: "AWS",
    avatarUrl: "/aws.svg",
    isBrand: true,
    subject: "Monthly AWS Bill - May 2025",
    snippet: "Your AWS bill for May 2025 is ready...",
    content: `
      <p>Your AWS bill for May 2025 is now available.</p>
      <br/>
      <p><strong>Total Amount:</strong> $124.50</p>
      <p><strong>Billing Period:</strong> May 1-31, 2025</p>
      <br/>
      <p><strong>Service Breakdown:</strong><br/>
      EC2 Instances: $89.20<br/>
      S3 Storage: $18.10<br/>
      RDS Database: $17.20</p>
      <br/>
      <p>Your payment will be automatically charged to your default payment method.</p>
      <br/>
      <p>AWS Billing Team</p>
    `,
    timestamp: "9:42AM",
    read: false,
  },
  {
    id: "4",
    sender: "Apple",
    avatarUrl: "/apple.svg",
    isBrand: true,
    subject: "Your order has been shipped",
    snippet: "Great news! Your order is on its way...",
    content: `
      <p>Thank you for your order!</p>
      <br/>
      <p>Great news! Your order #W123456789 has been shipped and is on its way to you.</p>
      <br/>
      <p><strong>Order Details:</strong><br/>
      iPhone 15 Pro - Natural Titanium - 256GB<br/>
      Estimated delivery: May 30, 2025</p>
      <br/>
      <p>Track your package: TR123456789</p>
      <br/>
      <p>Apple Store Team</p>
    `,
    timestamp: "Yesterday",
    read: true,
    attachments: [
      {
        id: "att3",
        name: "Order_Receipt.pdf",
        size: "89 KB",
        type: "application/pdf",
      },
      {
        id: "att4",
        name: "Tracking_Info.pdf",
        size: "45 KB",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "5",
    sender: "Dr. Sarah Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=dr.sarah",
    subject: "Appointment Reminder - Tomorrow at 2:00 PM",
    snippet: "This is a reminder for your upcoming appointment...",
    content: `
      <p>Dear Emilie,</p>
      <br/>
      <p>This is a reminder for your upcoming appointment:</p>
      <br/>
      <p><strong>Date:</strong> May 29, 2025<br/>
      <strong>Time:</strong> 2:00 PM<br/>
      <strong>Location:</strong> 123 Medical Center Dr, Suite 200</p>
      <br/>
      <p>Please arrive 15 minutes early. If you need to reschedule, please call us at (555) 123-4567.</p>
      <br/>
      <p>Best regards,</p>
      <p>Dr. Sarah Johnson's Office</p>
    `,
    timestamp: "Yesterday",
    read: true,
    isAIGenerated: true,
    isImportant: true,
  },
  {
    id: "6",
    sender: "Stripe",
    avatarUrl: "/stripe.svg",
    isBrand: true,
    subject: "Payment successful - $299.00",
    snippet: "Your payment has been processed successfully...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>Your payment has been processed successfully.</p>
      <br/>
      <p><strong>Payment Details:</strong><br/>
      Amount: $299.00<br/>
      Date: May 28, 2025<br/>
      Description: Annual Pro Subscription<br/>
      Payment Method: •••• 4242</p>
      <br/>
      <p>Receipt ID: ch_3N1234567890</p>
      <br/>
      <p>Thanks for your business!</p>
      <p>Stripe</p>
    `,
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "7",
    sender: "Zoom",
    avatarUrl: "/zoom.svg",
    isBrand: true,
    subject: "Meeting scheduled: Team Standup - May 29, 10:00 AM",
    snippet: "You're invited to join a Zoom meeting...",
    content: `
      <p>You're invited to a Zoom meeting.</p>
      <br/>
      <p><strong>Topic:</strong> Team Standup<br/>
      <strong>Time:</strong> May 29, 2025 10:00 AM Pacific Time<br/>
      <strong>Meeting ID:</strong> 123 456 7890<br/>
      <strong>Passcode:</strong> standup2025</p>
      <br/>
      <p>Join Zoom Meeting:<br/>
      https://zoom.us/j/1234567890?pwd=abc123def456</p>
      <br/>
      <p>Zoom</p>
    `,
    timestamp: "2 hours ago",
    read: false,
    isAIGenerated: true,
    isImportant: true,
  },
  {
    id: "8",
    sender: "Figma",
    avatarUrl: "/figma.svg",
    isBrand: true,
    subject: "Design system components updated",
    snippet: "The design system has been updated with new components...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>The design system has been updated with new components and tokens.</p>
      <br/>
      <p><strong>What's New:</strong><br/>
      • New button variants<br/>
      • Updated color tokens<br/>
      • Improved accessibility features</p>
      <br/>
      <p>Check out the updated library in your Figma workspace.</p>
      <br/>
      <p>Figma Design Team</p>
    `,
    timestamp: "3 hours ago",
    read: true,
    attachments: [
      {
        id: "att5",
        name: "Design_System_Updates.pdf",
        size: "512 KB",
        type: "application/pdf",
      },
      {
        id: "att6",
        name: "Component_Library.fig",
        size: "2.1 MB",
        type: "application/figma",
      },
    ],
  },
  {
    id: "9",
    sender: "Linear",
    avatarUrl: "/linear.svg",
    isBrand: true,
    subject: "Issue assigned: Bug in user authentication",
    snippet: "A new issue has been assigned to you...",
    content: `
      <p>A new issue has been assigned to you:</p>
      <br/>
      <p><strong>Issue:</strong> Bug in user authentication<br/>
      <strong>Priority:</strong> High<br/>
      <strong>Team:</strong> Frontend</p>
      <br/>
      <p><strong>Description:</strong><br/>
      Users are experiencing login failures after the recent update. The issue seems to be related to token validation.</p>
      <br/>
      <p>View issue in Linear</p>
      <br/>
      <p>Linear</p>
    `,
    timestamp: "4 hours ago",
    read: false,
  },
  {
    id: "10",
    sender: "Calendly",
    avatarUrl: "/calendly.svg",
    isBrand: true,
    subject: "Meeting confirmed: Product Demo - Tomorrow 3:00 PM",
    snippet: "Your meeting has been confirmed...",
    content: `
      <p>Your meeting has been confirmed!</p>
      <br/>
      <p><strong>Event:</strong> Product Demo<br/>
      <strong>Date & Time:</strong> May 29, 2025 at 3:00 PM PST<br/>
      <strong>Duration:</strong> 30 minutes<br/>
      <strong>Location:</strong> Google Meet</p>
      <br/>
      <p><strong>Attendee:</strong> John Smith (john.smith@company.com)</p>
      <br/>
      <p>Join the meeting: [Google Meet Link]</p>
      <br/>
      <p>Calendly</p>
    `,
    timestamp: "5 hours ago",
    read: true,
    isAIGenerated: true,
    isImportant: true,
  },
  {
    id: "11",
    sender: "Netflix",
    avatarUrl: "/netflix.svg",
    isBrand: true,
    subject: "New episodes available in your list",
    snippet: "Your favorite shows have new episodes...",
    content: `
      <p>New episodes are now available for shows in your list:</p>
      <br/>
      <p>• Stranger Things - Season 5, Episode 3<br/>
      • The Crown - Season 7, Episode 2<br/>
      • Wednesday - Season 2, Episode 1</p>
      <br/>
      <p>Continue watching where you left off.</p>
      <br/>
      <p>Netflix</p>
    `,
    timestamp: "6 hours ago",
    read: true,
  },
  {
    id: "12",
    sender: "Notion",
    avatarUrl: "/notion.svg",
    isBrand: true,
    subject: "Weekly workspace digest",
    snippet: "Here's what happened in your workspace this week...",
    content: `
      <p>Here's what happened in your workspace this week:</p>
      <br/>
      <p><strong>Activity Summary:</strong><br/>
      • 12 pages created<br/>
      • 8 pages updated<br/>
      • 3 new team members added</p>
      <br/>
      <p><strong>Most Active Page:</strong><br/>
      Product Roadmap 2025</p>
      <br/>
      <p>Keep up the great work!</p>
      <br/>
      <p>Notion</p>
    `,
    timestamp: "Yesterday",
    read: false,
  },
  {
    id: "13",
    sender: "Vercel",
    avatarUrl: "/vercel.svg",
    isBrand: true,
    subject: "Deployment successful: emailclient-app",
    snippet: "Your deployment has been completed successfully...",
    content: `
      <p>Your deployment has been completed successfully!</p>
      <br/>
      <p><strong>Project:</strong> emailclient-app<br/>
      <strong>Branch:</strong> main<br/>
      <strong>Commit:</strong> abc123d (Add new email features)<br/>
      <strong>Domain:</strong> emailclient-app.vercel.app</p>
      <br/>
      <p><strong>Deployment Details:</strong><br/>
      • Build time: 2m 34s<br/>
      • Bundle size: 234 KB<br/>
      • Status: Ready</p>
      <br/>
      <p>View your live application: https://emailclient-app.vercel.app</p>
      <br/>
      <p>Vercel</p>
    `,
    timestamp: "Sunday",
    read: true,
  },
  {
    id: "14",
    sender: "Uber",
    avatarUrl: "/uber.svg",
    isBrand: true,
    subject: "Trip receipt: Downtown to Airport",
    snippet: "Thanks for riding with Uber!...",
    content: `
      <p>Thanks for riding with Uber!</p>
      <br/>
      <p><strong>Trip Details:</strong><br/>
      Date: May 28, 2025<br/>
      Time: 8:15 AM - 8:32 AM<br/>
      Driver: Carlos M. (4.9 ⭐)</p>
      <br/>
      <p><strong>Route:</strong><br/>
      From: 123 Home Street<br/>
      To: 456 Office Building, Downtown</p>
      <br/>
      <p><strong>Fare Breakdown:</strong><br/>
      Trip Fare: $10.50<br/>
      Tip: $2.00<br/>
      Total: $12.50</p>
      <br/>
      <p>Rate your trip and help us improve!</p>
      <br/>
      <p>Uber</p>
    `,
    timestamp: "Sunday",
    read: true,
  },
  {
    id: "15",
    sender: "Microsoft Teams",
    avatarUrl: "/microsoft-teams.svg",
    isBrand: true,
    subject: "You missed a call from the Marketing Team",
    snippet: "The Marketing Team tried to reach you...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>The Marketing Team tried to reach you at 2:30 PM today but you weren't available.</p>
      <br/>
      <p><strong>Call Details:</strong><br/>
      Duration: 0 seconds (missed)<br/>
      Participants: Sarah Kim, John Doe, Mike Wilson</p>
      <br/>
      <p>You can listen to the voicemail they left or call them back directly.</p>
      <br/>
      <p>Microsoft Teams</p>
    `,
    timestamp: "2:30 PM",
    read: false,
  },
  {
    id: "16",
    sender: "Sarah Connor",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah.connor",
    subject: "Next interview",
    snippet: "Hi Emilie, I wanted to share with you the good news that...",
    content: `
      <p>Hi Emilie,</p>
      <br/>
      <p>I wanted to share with you the good news that you've been selected for the next round of interviews!</p>
      <br/>
      <p>Please let me know your availability for next week, and I'll schedule the interviews accordingly.</p>
      <br/>
      <p>Best regards,</p>
      <p>Sarah</p>
    `,
    timestamp: "Friday",
    read: true,
  },
  {
    id: "17",
    sender: "Christina Correa",
    avatarUrl: "https://i.pravatar.cc/150?u=christina.correa",
    subject: "Document shared with you",
    snippet: "I totally understand. I wanted to clarify that we...",
    content: `
      <p>Hello Emilie,</p>
      <br/>
      <p>I totally understand. I wanted to clarify that we are looking for someone who can start immediately.</p>
      <br/>
      <p>I've shared a document with more details about the position. Please take a look and let me know if you have any questions.</p>
      <br/>
      <p>Regards,</p>
      <p>Christina</p>
    `,
    timestamp: "Friday",
    read: true,
    attachments: [
      {
        id: "att8",
        name: "Position_Details.pdf",
        size: "245 KB",
        type: "application/pdf",
      },
      {
        id: "att9",
        name: "Company_Overview.docx",
        size: "180 KB",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    ],
  },
  {
    id: "18",
    sender: "Slack",
    avatarUrl: "/slack.svg",
    isBrand: true,
    subject: "You've got 5 unread messages",
    snippet: "Your teams has sent you new messages...",
    content: `
      <p>You've got 5 unread messages in your Slack workspace.</p>
      <br/>
      <p>Click here to view them.</p>
    `,
    timestamp: "Friday",
    read: false,
  },
];
