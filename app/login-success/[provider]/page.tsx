"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";

import { title, subtitle } from "@/components/primitives";

const loadingMessages = {
  gmail: [
    "Conectando à sua conta do Gmail...",
    "Sincronizando suas mensagens...",
    "Carregando suas pastas...",
    "Pronto! Redirecionando...",
  ],
  outlook: [
    "Conectando à sua conta do Outlook...",
    "Sincronizando seus e-mails...",
    "Organizando sua caixa de entrada...",
    "Pronto! Redirecionando...",
  ],
  apple: [
    "Conectando à sua conta da Apple...",
    "Verificando suas credenciais...",
    "Configurando sua caixa de entrada...",
    "Pronto! Redirecionando...",
  ],
  default: [
    "Conectando à sua conta...",
    "Carregando suas informações...",
    "Quase lá...",
    "Redirecionando...",
  ],
};

export default function LoginSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Obtém o provider da URL ou usa 'default' se não estiver definido
  const provider = (params?.provider as keyof typeof loadingMessages) || "default";
  const messages = loadingMessages[provider] || loadingMessages.default;

  useEffect(() => {
    if (currentMessageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (currentMessageIndex === messages.length - 1) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages.length, router]);

  const getProviderName = () => {
    switch (provider) {
      case "gmail":
        return "Gmail";
      case "outlook":
        return "Outlook";
      case "apple":
        return "Apple Mail";
      default:
        return "seu e-mail";
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-default-50/50 shadow-xl rounded-lg w-full">
        <Spinner color="success" size="lg" />
        <h1
          className={title({
            color: "green",
            class: "mt-6 mb-4 leading-snug",
          })}
        >
          Conectado ao {getProviderName()} com sucesso!
        </h1>
        <p
          className={subtitle({
            class: "mb-8 text-default-600 dark:text-default-400",
          })}
        >
          {messages[currentMessageIndex]}
        </p>
        <div className="w-full bg-default-200 dark:bg-default-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-success h-2.5 rounded-full transition-all duration-1500 ease-linear"
            style={{
              width: `${((currentMessageIndex + 1) / messages.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
