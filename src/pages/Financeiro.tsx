import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Plus,
  Download,
  Search,
  Loader2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { NovaCobrancaDialog } from "@/components/financeiro/NovaCobrancaDialog";
import { DetalhesCobrancaDialog } from "@/components/financeiro/DetalhesCobrancaDialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Financeiro = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [novaCobrancaOpen, setNovaCobrancaOpen] = useState(false);
  const [detalhesOpen, setDetalhesOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const { data: invoices = [], isLoading, refetch } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          patient:patients(full_name, phone, email),
          subscription:subscriptions(subscription_plans(name))
        `)
        .order("due_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.patient?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: invoices.reduce((acc, inv) => acc + Number(inv.amount), 0),
    received: invoices.filter(inv => inv.payment_status === "pago").reduce((acc, inv) => acc + Number(inv.amount), 0),
    pending: invoices.filter(inv => inv.payment_status === "pendente").reduce((acc, inv) => acc + Number(inv.amount), 0),
    overdue: invoices.filter(inv => inv.payment_status === "atrasado").reduce((acc, inv) => acc + Number(inv.amount), 0),
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  };

  const handleViewDetails = (invoice: any) => {
    setSelectedInvoice(invoice);
    setDetalhesOpen(true);
  };

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
            <Button className="bg-gradient-primary" onClick={() => setNovaCobrancaOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova cobrança
            </Button>
          </div>
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RevenueCard
            title="Receita Total"
            value={formatCurrency(stats.total)}
            icon={<TrendingUp className="h-5 w-5" />}
            color="primary"
          />
          <RevenueCard
            title="Recebido"
            value={formatCurrency(stats.received)}
            icon={<CheckCircle className="h-5 w-5" />}
            color="secondary"
          />
          <RevenueCard
            title="Pendente"
            value={formatCurrency(stats.pending)}
            icon={<Clock className="h-5 w-5" />}
            color="accent"
          />
          <RevenueCard
            title="Em Atraso"
            value={formatCurrency(stats.overdue)}
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

        {/* Invoices Table */}
        <Card className="border-border bg-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">Cobranças</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar paciente..." 
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                <CreditCard className="h-12 w-12 mb-2" />
                <p>Nenhuma cobrança encontrada</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <InvoiceRow 
                      key={invoice.id} 
                      invoice={invoice} 
                      onViewDetails={() => handleViewDetails(invoice)}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </Card>
      </div>

      <NovaCobrancaDialog 
        open={novaCobrancaOpen} 
        onOpenChange={setNovaCobrancaOpen}
        onSuccess={refetch}
      />

      <DetalhesCobrancaDialog
        open={detalhesOpen}
        onOpenChange={setDetalhesOpen}
        invoice={selectedInvoice}
        onUpdate={refetch}
      />
    </div>
  );
};

interface RevenueCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent" | "destructive";
}

const RevenueCard = ({ title, value, icon, color }: RevenueCardProps) => {
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
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

interface InvoiceRowProps {
  invoice: any;
  onViewDetails: () => void;
}

const statusConfig = {
  pendente: { label: "Pendente", className: "bg-accent/10 text-accent" },
  pago: { label: "Pago", className: "bg-secondary/10 text-secondary" },
  atrasado: { label: "Atrasado", className: "bg-destructive/10 text-destructive" },
  cancelado: { label: "Cancelado", className: "bg-muted text-muted-foreground" },
};

const InvoiceRow = ({ invoice, onViewDetails }: InvoiceRowProps) => {
  const status = statusConfig[invoice.payment_status as keyof typeof statusConfig] || statusConfig.pendente;

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "dd/MM/yyyy", { locale: ptBR });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{invoice.patient?.full_name || "-"}</TableCell>
      <TableCell>{invoice.subscription?.subscription_plans?.name || "Avulso"}</TableCell>
      <TableCell className="font-semibold text-primary">{formatCurrency(invoice.amount)}</TableCell>
      <TableCell>{formatDate(invoice.due_date)}</TableCell>
      <TableCell>
        <Badge className={status.className}>{status.label}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" onClick={onViewDetails}>
          Ver detalhes
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Financeiro;
