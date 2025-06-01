import { EmailData, EmailCategory, EmailCategoryInfo } from "@/types";

// Category configurations with visual information
export const EMAIL_CATEGORIES: Record<EmailCategory, EmailCategoryInfo> = {
  work: {
    id: "work",
    name: "Work",
    icon: "💼",
    color: "blue",
    description: "Work-related emails, meetings and projects",
  },
  personal: {
    id: "personal",
    name: "Personal",
    icon: "👤",
    color: "green",
    description: "Personal emails from friends and family",
  },
  promotions: {
    id: "promotions",
    name: "Promotions",
    icon: "🏷️",
    color: "orange",
    description: "Offers, discounts and promotions",
  },
  urgent: {
    id: "urgent",
    name: "Urgent",
    icon: "🚨",
    color: "red",
    description: "Emails that require immediate action",
  },
  bills: {
    id: "bills",
    name: "Bills",
    icon: "💳",
    color: "yellow",
    description: "Invoices, bills and charges",
  },
  social: {
    id: "social",
    name: "Social",
    icon: "👥",
    color: "purple",
    description: "Social media notifications",
  },
  newsletters: {
    id: "newsletters",
    name: "Newsletters",
    icon: "📰",
    color: "indigo",
    description: "Newsletters and informational bulletins",
  },
  travel: {
    id: "travel",
    name: "Travel",
    icon: "✈️",
    color: "cyan",
    description: "Reservations, tickets and travel information",
  },
  shopping: {
    id: "shopping",
    name: "Shopping",
    icon: "🛒",
    color: "pink",
    description: "Order confirmations and deliveries",
  },
  security: {
    id: "security",
    name: "Security",
    icon: "🔒",
    color: "gray",
    description: "Security alerts and verifications",
  },
  spam: {
    id: "spam",
    name: "Spam",
    icon: "🚫",
    color: "red",
    description: "Unwanted emails and spam",
  },
  general: {
    id: "general",
    name: "General",
    icon: "📧",
    color: "gray",
    description: "Other uncategorized emails",
  },
};

// Classification patterns for automatic categorization
const CLASSIFICATION_PATTERNS = {
  work: {
    senders: [
      /.*@(company|corp|inc|ltd|llc|enterprise|business|office|work)\..*$/i,
      /.*@(microsoft|google|apple|amazon|meta|linkedin|slack|zoom|teams)\.com$/i,
      /.*@(github|gitlab|bitbucket|jira|confluence|notion)\..*$/i,
    ],
    subjects: [
      /\b(meeting|reunião|call|chamada|conference|conferência)\b/i,
      /\b(project|projeto|task|tarefa|deadline|prazo)\b/i,
      /\b(interview|entrevista|job|trabalho|position|cargo|offer|oferta)\b/i,
      /\b(report|relatório|presentation|apresentação|proposal|proposta)\b/i,
      /\b(team|equipe|colleague|colega|manager|gerente|boss|chefe)\b/i,
    ],
    content: [
      /\b(quarterly|trimestral|annual|anual|budget|orçamento|revenue|receita)\b/i,
      /\b(client|cliente|customer|consumidor|vendor|fornecedor)\b/i,
      /\b(contract|contrato|agreement|acordo|partnership|parceria)\b/i,
    ],
  },

  personal: {
    senders: [/.*@(gmail|yahoo|hotmail|outlook|icloud|protonmail)\..*$/i],
    subjects: [
      /\b(family|família|friend|amigo|birthday|aniversário|wedding|casamento)\b/i,
      /\b(vacation|férias|holiday|feriado|weekend|fim de semana)\b/i,
      /\b(dinner|jantar|lunch|almoço|party|festa|celebration|celebração)\b/i,
    ],
    content: [
      /\b(love|amor|miss|saudade|hope|espero|see you|te vejo)\b/i,
      /\b(how are you|como você está|what's up|e aí|long time|há tempo)\b/i,
    ],
  },

  promotions: {
    senders: [
      /.*@(marketing|promo|offers|deals|newsletter|noreply)\..*$/i,
      /.*@(amazon|ebay|mercadolivre|shopee|aliexpress|magazineluiza)\..*$/i,
    ],
    subjects: [
      /\b(sale|promoção|discount|desconto|offer|oferta|deal|negócio)\b/i,
      /\b(50%|70%|off|black friday|cyber monday|liquidação)\b/i,
      /\b(free|grátis|limited time|tempo limitado|exclusive|exclusivo)\b/i,
      /\b(coupon|cupom|voucher|cashback|frete grátis|free shipping)\b/i,
    ],
    content: [
      /\b(buy now|compre agora|shop now|compre já|limited offer|oferta limitada)\b/i,
      /\b(save|economize|special price|preço especial|best deal|melhor oferta)\b/i,
    ],
  },

  urgent: {
    subjects: [
      /\b(urgent|urgente|asap|immediate|imediato|emergency|emergência)\b/i,
      /\b(action required|ação necessária|time sensitive|prazo|deadline)\b/i,
      /\b(important|importante|critical|crítico|alert|alerta)\b/i,
      /\b(final notice|aviso final|last chance|última chance)\b/i,
    ],
    content: [
      /\b(within 24 hours|em 24 horas|expires today|expira hoje)\b/i,
      /\b(respond immediately|responda imediatamente|act now|aja agora)\b/i,
    ],
  },

  bills: {
    senders: [
      /.*@(bank|banco|credit|credito|financial|financeiro|billing|cobrança)\..*$/i,
      /.*@(visa|mastercard|amex|nubank|itau|bradesco|santander|bb)\..*$/i,
      /.*@(electricity|energia|water|agua|gas|internet|phone|telefone)\..*$/i,
    ],
    subjects: [
      /\b(invoice|fatura|bill|conta|payment|pagamento|due|vencimento)\b/i,
      /\b(statement|extrato|balance|saldo|credit card|cartão de crédito)\b/i,
      /\b(overdue|em atraso|late fee|multa|interest|juros)\b/i,
      /\b(boleto|pix|transfer|transferência|charge|cobrança)\b/i,
    ],
    content: [
      /\b(amount due|valor devido|pay by|pagar até|total|valor total)\b/i,
      /\b(R\$|USD|\$|€|£|¥|₹)\s*[\d,.]+(,\d{2})?/,
    ],
  },

  social: {
    senders: [
      /.*@(facebook|instagram|twitter|linkedin|tiktok|youtube|whatsapp)\..*$/i,
      /.*@(discord|telegram|snapchat|pinterest|reddit|tumblr)\..*$/i,
    ],
    subjects: [
      /\b(notification|notificação|activity|atividade|mention|menção)\b/i,
      /\b(friend request|solicitação de amizade|follow|seguir|like|curtida)\b/i,
      /\b(comment|comentário|message|mensagem|post|publicação)\b/i,
    ],
    content: [
      /\b(tagged you|marcou você|shared|compartilhou|reacted|reagiu)\b/i,
      /\b(new follower|novo seguidor|connection|conexão|network|rede)\b/i,
    ],
  },

  newsletters: {
    senders: [
      /.*@(newsletter|news|media|blog|magazine|revista)\..*$/i,
      /.*@(substack|medium|mailchimp|constantcontact)\..*$/i,
    ],
    subjects: [
      /\b(newsletter|boletim|weekly|semanal|monthly|mensal|digest|resumo)\b/i,
      /\b(news|notícias|update|atualização|edition|edição|issue|número)\b/i,
      /\b(subscribe|inscrever|unsubscribe|cancelar inscrição)\b/i,
    ],
    content: [
      /\b(this week|esta semana|latest news|últimas notícias|trending|tendência)\b/i,
      /\b(read more|leia mais|full article|artigo completo)\b/i,
    ],
  },

  travel: {
    senders: [
      /.*@(booking|expedia|airbnb|hotels|airline|companhia aérea)\..*$/i,
      /.*@(uber|99|taxi|rental|aluguel|travel|viagem)\..*$/i,
    ],
    subjects: [
      /\b(flight|voo|hotel|reservation|reserva|booking|check-in)\b/i,
      /\b(itinerary|itinerário|boarding pass|cartão de embarque|ticket|passagem)\b/i,
      /\b(travel|viagem|trip|viagem|vacation|férias|destination|destino)\b/i,
    ],
    content: [
      /\b(departure|partida|arrival|chegada|gate|portão|terminal)\b/i,
      /\b(confirmation number|número de confirmação|reference|referência)\b/i,
    ],
  },

  shopping: {
    senders: [
      /.*@(amazon|mercadolivre|shopee|aliexpress|ebay|etsy)\..*$/i,
      /.*@(store|loja|shop|shopping|ecommerce|marketplace)\..*$/i,
    ],
    subjects: [
      /\b(order|pedido|shipped|enviado|delivered|entregue|tracking|rastreamento)\b/i,
      /\b(receipt|recibo|confirmation|confirmação|purchase|compra)\b/i,
      /\b(return|devolução|refund|reembolso|exchange|troca)\b/i,
    ],
    content: [
      /\b(order number|número do pedido|tracking number|código de rastreamento)\b/i,
      /\b(estimated delivery|entrega estimada|shipping|envio|package|pacote)\b/i,
    ],
  },

  security: {
    senders: [/.*@(security|segurança|noreply|no-reply|support|suporte)\..*$/i],
    subjects: [
      /\b(security|segurança|verify|verificar|suspicious|suspeito|alert|alerta)\b/i,
      /\b(login|acesso|password|senha|account|conta|unauthorized|não autorizado)\b/i,
      /\b(two-factor|dois fatores|2fa|authentication|autenticação)\b/i,
    ],
    content: [
      /\b(sign-in|login|access|acesso|device|dispositivo|location|localização)\b/i,
      /\b(verify your|verifique seu|confirm|confirme|secure|seguro)\b/i,
    ],
  },
};

// Main classification function
export function classifyEmail(email: EmailData): EmailCategory {
  // If already classified, return existing category
  if (email.category) {
    return email.category;
  }

  const emailText =
    `${email.sender} ${email.subject} ${email.content}`.toLowerCase();
  const senderDomain = email.sender.toLowerCase();
  const subject = email.subject.toLowerCase();
  const content = email.content.toLowerCase();

  // Check for spam first (highest priority)
  if (isSpamEmail(email)) {
    return "spam";
  }

  // Check each category
  for (const [category, patterns] of Object.entries(CLASSIFICATION_PATTERNS)) {
    let score = 0;

    // Check sender patterns
    if (patterns.senders) {
      for (const pattern of patterns.senders) {
        if (pattern.test(senderDomain)) {
          score += 3;
          break;
        }
      }
    }

    // Check subject patterns
    if (patterns.subjects) {
      for (const pattern of patterns.subjects) {
        if (pattern.test(subject)) {
          score += 2;
        }
      }
    }

    // Check content patterns
    if (patterns.content) {
      for (const pattern of patterns.content) {
        if (pattern.test(content)) {
          score += 1;
        }
      }
    }

    // If score is high enough, classify as this category
    if (score >= 2) {
      return category as EmailCategory;
    }
  }

  // Default to general if no category matches
  return "general";
}

// Helper function to detect spam
function isSpamEmail(email: EmailData): boolean {
  const spamPatterns = [
    /\b(nigerian prince|lottery|winner|congratulations|million|inheritance)\b/i,
    /\b(viagra|cialis|pharmacy|medication|pills|drugs)\b/i,
    /\b(click here|act now|limited time|urgent|free money|make money)\b/i,
    /\b(verify account|suspended|confirm identity|update payment)\b/i,
    /\b(crypto|bitcoin|investment|trading|profit|roi)\b/i,
    /\b(weight loss|lose weight|diet|supplement|miracle)\b/i,
  ];

  const emailText = `${email.subject} ${email.content}`.toLowerCase();

  return spamPatterns.some((pattern) => pattern.test(emailText));
}

// Function to get category color classes for UI
export function getCategoryColorClasses(category: EmailCategory): {
  bg: string;
  text: string;
  border: string;
} {
  const colorMap = {
    work: {
      bg: "bg-blue-50 dark:bg-blue-950/40",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-700",
    },
    personal: {
      bg: "bg-green-50 dark:bg-green-950/40",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-200 dark:border-green-700",
    },
    promotions: {
      bg: "bg-orange-50 dark:bg-orange-950/40",
      text: "text-orange-700 dark:text-orange-300",
      border: "border-orange-200 dark:border-orange-700",
    },
    urgent: {
      bg: "bg-red-50 dark:bg-red-950/40",
      text: "text-red-700 dark:text-red-300",
      border: "border-red-200 dark:border-red-700",
    },
    bills: {
      bg: "bg-yellow-50 dark:bg-yellow-950/40",
      text: "text-yellow-700 dark:text-yellow-300",
      border: "border-yellow-200 dark:border-yellow-700",
    },
    social: {
      bg: "bg-purple-50 dark:bg-purple-950/40",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-700",
    },
    newsletters: {
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      text: "text-indigo-700 dark:text-indigo-300",
      border: "border-indigo-200 dark:border-indigo-700",
    },
    travel: {
      bg: "bg-cyan-50 dark:bg-cyan-950/40",
      text: "text-cyan-700 dark:text-cyan-300",
      border: "border-cyan-200 dark:border-cyan-700",
    },
    shopping: {
      bg: "bg-pink-50 dark:bg-pink-950/40",
      text: "text-pink-700 dark:text-pink-300",
      border: "border-pink-200 dark:border-pink-700",
    },
    security: {
      bg: "bg-gray-50 dark:bg-gray-950/40",
      text: "text-gray-700 dark:text-gray-300",
      border: "border-gray-200 dark:border-gray-700",
    },
    spam: {
      bg: "bg-red-50 dark:bg-red-950/40",
      text: "text-red-700 dark:text-red-300",
      border: "border-red-200 dark:border-red-700",
    },
    general: {
      bg: "bg-gray-50 dark:bg-gray-950/40",
      text: "text-gray-700 dark:text-gray-300",
      border: "border-gray-200 dark:border-gray-700",
    },
  };

  return colorMap[category];
}
