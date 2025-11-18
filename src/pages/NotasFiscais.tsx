import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Plus, 
  Download, 
  Eye,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NotasFiscais = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notas Fiscais</h1>
            <p className="text-muted-foreground">Emissão e gestão de NFS-e</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar relatório
            </Button>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Emitir nota
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Emitidas no Mês"
            value="89"
            subtitle="+12 vs mês anterior"
            icon={<FileText className="h-5 w-5" />}
            color="primary"
          />
          <StatCard
            title="Valor Total"
            value="R$ 31.150"
            subtitle="Total faturado"
            icon={<CheckCircle className="h-5 w-5" />}
            color="secondary"
          />
          <StatCard
            title="Pendentes"
            value="5"
            subtitle="Aguardando emissão"
            icon={<Clock className="h-5 w-5" />}
            color="accent"
          />
          <StatCard
            title="Canceladas"
            value="2"
            subtitle="Este mês"
            icon={<XCircle className="h-5 w-5" />}
            color="destructive"
          />
        </div>

        {/* Preview Card */}
        <Card className="p-6 border-border bg-gradient-to-br from-card to-muted/20">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-48 h-64 bg-white rounded-lg shadow-lg p-4 border-2 border-primary/20">
              <div className="space-y-2">
                <div className="h-4 bg-primary/20 rounded" />
                <div className="h-3 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="mt-6 space-y-1">
                  <div className="h-2 bg-muted rounded" />
                  <div className="h-2 bg-muted rounded" />
                  <div className="h-2 bg-muted rounded w-4/5" />
                </div>
                <div className="mt-6">
                  <div className="h-6 bg-secondary/20 rounded" />
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Emissão Automática de NFS-e
              </h3>
              <p className="text-muted-foreground mb-4">
                Notas fiscais são geradas automaticamente após a confirmação de pagamento, 
                garantindo conformidade fiscal sem trabalho manual.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-card-foreground">Integração</p>
                  <p className="text-sm text-muted-foreground">PlugNotas / NFe.io</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-card-foreground">Formato</p>
                  <p className="text-sm text-muted-foreground">PDF + XML</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-card-foreground">Envio</p>
                  <p className="text-sm text-muted-foreground">Email automático</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-card-foreground">Armazenamento</p>
                  <p className="text-sm text-muted-foreground">Seguro na nuvem</p>
                </div>
              </div>
              
              <Button variant="outline" className="mt-2">
                Configurar integração
              </Button>
            </div>
          </div>
        </Card>

        {/* Invoices Table */}
        <Card className="border-border bg-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">Notas Emitidas</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por número ou cliente..." className="pl-10 w-80" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Data Emissão</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <InvoiceRow
                  number="NF-2025/089"
                  date="18/11/2025"
                  client="Ana Silva"
                  service="Pilates - Mensalidade"
                  value="R$ 350,00"
                  status="issued"
                />
                <InvoiceRow
                  number="NF-2025/088"
                  date="18/11/2025"
                  client="Carlos Oliveira"
                  service="Fisioterapia - Sessão"
                  value="R$ 180,00"
                  status="issued"
                />
                <InvoiceRow
                  number="NF-2025/087"
                  date="17/11/2025"
                  client="Beatriz Souza"
                  service="Pilates - Mensalidade"
                  value="R$ 350,00"
                  status="issued"
                />
                <InvoiceRow
                  number="NF-2025/086"
                  date="17/11/2025"
                  client="Pedro Lima"
                  service="Avaliação Física"
                  value="R$ 120,00"
                  status="pending"
                />
                <InvoiceRow
                  number="NF-2025/085"
                  date="16/11/2025"
                  client="Julia Ferreira"
                  service="Pilates - Mensalidade"
                  value="R$ 350,00"
                  status="issued"
                />
                <InvoiceRow
                  number="NF-2025/084"
                  date="15/11/2025"
                  client="Lucas Costa"
                  service="Fisioterapia - Sessão"
                  value="R$ 180,00"
                  status="cancelled"
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
  subtitle: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent" | "destructive";
}

const StatCard = ({ title, value, subtitle, icon, color }: StatCardProps) => {
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
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

interface InvoiceRowProps {
  number: string;
  date: string;
  client: string;
  service: string;
  value: string;
  status: "issued" | "pending" | "cancelled";
}

const InvoiceRow = ({ number, date, client, service, value, status }: InvoiceRowProps) => {
  const statusConfig = {
    issued: {
      label: "Emitida",
      className: "bg-secondary/10 text-secondary",
    },
    pending: {
      label: "Pendente",
      className: "bg-accent/10 text-accent",
    },
    cancelled: {
      label: "Cancelada",
      className: "bg-destructive/10 text-destructive",
    },
  };

  return (
    <TableRow>
      <TableCell className="font-semibold text-primary">{number}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{client}</TableCell>
      <TableCell>{service}</TableCell>
      <TableCell className="font-semibold">{value}</TableCell>
      <TableCell>
        <Badge className={statusConfig[status].className}>
          {statusConfig[status].label}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NotasFiscais;
