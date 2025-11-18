import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Plus,
  Download,
  Search
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Financeiro = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
            <p className="text-muted-foreground">Gestão de pagamentos e assinaturas</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Nova cobrança
            </Button>
          </div>
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RevenueCard
            title="Receita Total"
            value="R$ 24.500"
            change="+15%"
            trend="up"
            icon={<TrendingUp className="h-5 w-5" />}
            color="primary"
          />
          <RevenueCard
            title="Recebido"
            value="R$ 21.300"
            change="+8%"
            trend="up"
            icon={<CheckCircle className="h-5 w-5" />}
            color="secondary"
          />
          <RevenueCard
            title="Pendente"
            value="R$ 3.200"
            change="-5%"
            trend="down"
            icon={<Clock className="h-5 w-5" />}
            color="accent"
          />
          <RevenueCard
            title="Em Atraso"
            value="R$ 1.850"
            change="+2%"
            trend="up"
            icon={<AlertCircle className="h-5 w-5" />}
            color="destructive"
          />
        </div>

        {/* Charts Placeholder */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 border-border bg-card">
            <h3 className="text-lg font-semibold mb-4 text-card-foreground">Receita Mensal</h3>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Gráfico de receita mensal</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h3 className="text-lg font-semibold mb-4 text-card-foreground">Status de Pagamentos</h3>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Distribuição de status</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Subscriptions Table */}
        <Card className="border-border bg-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">Assinaturas Ativas</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-10 w-64" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Próximo Pagamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SubscriptionRow
                  patient="Ana Silva"
                  plan="Pilates Mensal"
                  value="R$ 350,00"
                  nextPayment="25/11/2025"
                  status="active"
                />
                <SubscriptionRow
                  patient="Carlos Oliveira"
                  plan="Fisioterapia Semanal"
                  value="R$ 180,00"
                  nextPayment="22/11/2025"
                  status="active"
                />
                <SubscriptionRow
                  patient="Beatriz Souza"
                  plan="Pilates Mensal"
                  value="R$ 350,00"
                  nextPayment="28/11/2025"
                  status="active"
                />
                <SubscriptionRow
                  patient="Pedro Lima"
                  plan="Avaliação"
                  value="R$ 120,00"
                  nextPayment="20/11/2025"
                  status="pending"
                />
                <SubscriptionRow
                  patient="Julia Ferreira"
                  plan="Pilates Mensal"
                  value="R$ 350,00"
                  nextPayment="15/11/2025"
                  status="overdue"
                />
                <SubscriptionRow
                  patient="Lucas Costa"
                  plan="Fisioterapia Semanal"
                  value="R$ 180,00"
                  nextPayment="26/11/2025"
                  status="active"
                />
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

interface RevenueCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent" | "destructive";
}

const RevenueCard = ({ title, value, change, trend, icon, color }: RevenueCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="p-6 border-border bg-card hover:shadow-elegant transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-card-foreground mb-1">{value}</p>
          <div className="flex items-center gap-1">
            <span className={`text-xs font-medium ${trend === "up" ? "text-secondary" : "text-destructive"}`}>
              {change}
            </span>
            <span className="text-xs text-muted-foreground">vs mês anterior</span>
          </div>
        </div>
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

interface SubscriptionRowProps {
  patient: string;
  plan: string;
  value: string;
  nextPayment: string;
  status: "active" | "pending" | "overdue";
}

const SubscriptionRow = ({ patient, plan, value, nextPayment, status }: SubscriptionRowProps) => {
  const statusConfig = {
    active: {
      label: "Ativo",
      className: "bg-secondary/10 text-secondary",
    },
    pending: {
      label: "Pendente",
      className: "bg-accent/10 text-accent",
    },
    overdue: {
      label: "Vencido",
      className: "bg-destructive/10 text-destructive",
    },
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{patient}</TableCell>
      <TableCell>{plan}</TableCell>
      <TableCell className="font-semibold text-primary">{value}</TableCell>
      <TableCell>{nextPayment}</TableCell>
      <TableCell>
        <Badge className={statusConfig[status].className}>
          {statusConfig[status].label}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm">
            Ver detalhes
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Financeiro;
