# EmailPanel Component

Um componente separado para exibir o painel de email no inbox.

## Funcionalidades

- Renderiza o painel de visualização de email quando um email é selecionado
- Responsivo - ajusta automaticamente sua largura baseado no estado do painel de AI
- Suporte a estado de loading
- Animações suaves de transição
- Facilmente customizável com props adicionais

## Uso

```tsx
import EmailPanel from "@/components/email-panel";

// Exemplo básico
<EmailPanel
  isAiPanelOpen={false}
  selectedEmail={emailData}
  onClose={() => setSelectedEmail(null)}
/>

// Com estado de loading
<EmailPanel
  isAiPanelOpen={true}
  selectedEmail={emailData}
  onClose={() => setSelectedEmail(null)}
  isLoading={true}
  className="custom-styles"
/>
```

## Props

| Prop            | Tipo                | Obrigatório | Descrição                         |
| --------------- | ------------------- | ----------- | --------------------------------- |
| `selectedEmail` | `EmailData \| null` | ✅          | Dados do email selecionado        |
| `isAiPanelOpen` | `boolean`           | ✅          | Se o painel de AI está aberto     |
| `onClose`       | `() => void`        | ✅          | Callback para fechar o painel     |
| `isLoading`     | `boolean`           | ❌          | Estado de loading (padrão: false) |
| `className`     | `string`            | ❌          | Classes CSS adicionais            |

## Estrutura do EmailData

```tsx
interface EmailData {
  id: string;
  sender: string;
  avatarUrl: string;
  subject: string;
  snippet: string;
  content: string;
  timestamp: string;
  read: boolean;
  isBrand?: boolean;
}
```

## Vantagens da Separação

1. **Reutilização**: O componente pode ser usado em outras partes da aplicação
2. **Manutenibilidade**: Lógica separada facilita manutenção e testes
3. **Performance**: Componente isolado permite otimizações específicas
4. **Flexibilidade**: Pode ser facilmente customizado sem afetar o inbox principal
