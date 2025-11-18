import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  Plus, 
  Edit, 
  Send,
  CheckCircle,
  Clock,
  XCircle,
  Copy
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Mensagens = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mensagens</h1>
            <p className="text-muted-foreground">Gerencie templates e histórico de envios</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Novo template
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Enviadas Hoje"
            value="24"
            icon={<Send className="h-5 w-5" />}
            color="primary"
          />
          <StatCard
            title="Entregues"
            value="22"
            icon={<CheckCircle className="h-5 w-5" />}
            color="secondary"
          />
          <StatCard
            title="Pendentes"
            value="2"
            icon={<Clock className="h-5 w-5" />}
            color="accent"
          />
          <StatCard
            title="Falhas"
            value="0"
            icon={<XCircle className="h-5 w-5" />}
            color="destructive"
          />
        </div>

        {/* Templates */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Confirmation Template */}
          <Card className="p-6 border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-1">
                  Confirmação de Consulta
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enviado 24 horas antes do atendimento
                </p>
              </div>
              <Badge className="bg-secondary/10 text-secondary">Ativo</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Mensagem</Label>
                <Textarea
                  className="mt-2 min-h-[120px] bg-muted/20"
                  value={`Olá {{nome}}! 👋

Lembramos que você tem uma consulta agendada para amanhã:

📅 Data: {{data}}
🕐 Horário: {{hora}}
👨‍⚕️ Profissional: {{profissional}}
📍 Local: {{clinica}}

Por favor, confirme sua presença respondendo SIM.

Caso precise remarcar, entre em contato conosco.`}
                  readOnly
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  {`{{nome}}`}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  {`{{data}}`}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  {`{{hora}}`}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  {`{{profissional}}`}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  {`{{clinica}}`}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button className="flex-1 bg-gradient-secondary">
                  Testar envio
                </Button>
              </div>
            </div>
          </Card>

          {/* Post-visit Template */}
          <Card className="p-6 border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-1">
                  Pós-Atendimento
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enviado 2 horas após o atendimento
                </p>
              </div>
              <Badge className="bg-secondary/10 text-secondary">Ativo</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Mensagem</Label>
                <Textarea
                  className="mt-2 min-h-[120px] bg-muted/20"
                  value={`Olá {{nome}}! 😊

Esperamos que seu atendimento hoje tenha sido excelente!

Agradecemos sua confiança em nossos serviços.

Como foi sua experiência? Sua opinião é muito importante para nós!

Próxima consulta: {{proxima_data}}

Equipe {{clinica}} 💚`}
                  readOnly
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  {`{{nome}}`}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  {`{{proxima_data}}`}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  {`{{clinica}}`}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button className="flex-1 bg-gradient-secondary">
                  Testar envio
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Message History */}
        <Card className="border-border bg-card">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-card-foreground">Histórico de Envios</h3>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <MessageRow
                  datetime="18/11/2025 08:30"
                  patient="Ana Silva"
                  phone="(11) 98765-4321"
                  type="Confirmação"
                  status="delivered"
                />
                <MessageRow
                  datetime="18/11/2025 08:30"
                  patient="Carlos Oliveira"
                  phone="(11) 97654-3210"
                  type="Confirmação"
                  status="read"
                />
                <MessageRow
                  datetime="18/11/2025 11:15"
                  patient="Beatriz Souza"
                  phone="(11) 96543-2109"
                  type="Pós-atendimento"
                  status="delivered"
                />
                <MessageRow
                  datetime="18/11/2025 08:30"
                  patient="Pedro Lima"
                  phone="(11) 95432-1098"
                  type="Confirmação"
                  status="pending"
                />
                <MessageRow
                  datetime="17/11/2025 17:30"
                  patient="Julia Ferreira"
                  phone="(11) 94321-0987"
                  type="Pós-atendimento"
                  status="read"
                />
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent" | "destructive";
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="p-4 border-border bg-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

interface MessageRowProps {
  datetime: string;
  patient: string;
  phone: string;
  type: string;
  status: "pending" | "delivered" | "read" | "failed";
}

const MessageRow = ({ datetime, patient, phone, type, status }: MessageRowProps) => {
  const statusConfig = {
    pending: {
      label: "Pendente",
      className: "bg-accent/10 text-accent",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    delivered: {
      label: "Entregue",
      className: "bg-primary/10 text-primary",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
    read: {
      label: "Lida",
      className: "bg-secondary/10 text-secondary",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
    failed: {
      label: "Falhou",
      className: "bg-destructive/10 text-destructive",
      icon: <XCircle className="h-3 w-3 mr-1" />,
    },
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{datetime}</TableCell>
      <TableCell>{patient}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>
        <Badge className={`${statusConfig[status].className} flex items-center w-fit`}>
          {statusConfig[status].icon}
          {statusConfig[status].label}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm">
          Ver detalhes
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Mensagens;
