import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

interface Invoice {
  id: string;
  amount: number;
  issue_date: string;
  due_date: string;
  paid_date: string | null;
  payment_status: "pendente" | "pago" | "atrasado" | "cancelado";
  invoice_number: string | null;
  nfse_number: string | null;
  nfse_pdf_url: string | null;
  patient: {
    full_name: string;
    phone: string;
    email: string | null;
  };
  subscription: {
    subscription_plans: {
      name: string;
    };
  } | null;
}

interface DetalhesCobrancaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
  onUpdate?: () => void;
}

const statusConfig = {
  pendente: { label: "Pendente", className: "bg-accent/10 text-accent" },
  pago: { label: "Pago", className: "bg-secondary/10 text-secondary" },
  atrasado: { label: "Atrasado", className: "bg-destructive/10 text-destructive" },
  cancelado: { label: "Cancelado", className: "bg-muted text-muted-foreground" },
};

export const DetalhesCobrancaDialog = ({
  open,
  onOpenChange,
  invoice,
  onUpdate,
}: DetalhesCobrancaDialogProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!invoice) return null;

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "dd/MM/yyyy", { locale: ptBR });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleMarkAsPaid = async () => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("invoices")
        .update({
          payment_status: "pago",
          paid_date: new Date().toISOString().split("T")[0],
        })
        .eq("id", invoice.id);

      if (error) throw error;

      toast.success("Cobrança marcada como paga!");
      onUpdate?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao atualizar cobrança:", error);
      toast.error("Erro ao atualizar cobrança.");
    } finally {
      setIsUpdating(false);
    }
  };

  const status = statusConfig[invoice.payment_status] || statusConfig.pendente;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes da Cobrança</span>
            <Badge className={status.className}>{status.label}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Patient Info */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Paciente</h4>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="font-semibold text-foreground">{invoice.patient.full_name}</p>
              <p className="text-sm text-muted-foreground">{invoice.patient.phone}</p>
              {invoice.patient.email && (
                <p className="text-sm text-muted-foreground">{invoice.patient.email}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Valor</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(invoice.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nº da Cobrança</p>
              <p className="font-medium">{invoice.invoice_number || "-"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Data de Emissão</p>
              <p className="font-medium">{formatDate(invoice.issue_date)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Vencimento</p>
              <p className="font-medium">{formatDate(invoice.due_date)}</p>
            </div>
          </div>

          {invoice.paid_date && (
            <div>
              <p className="text-sm text-muted-foreground">Data de Pagamento</p>
              <p className="font-medium text-secondary">{formatDate(invoice.paid_date)}</p>
            </div>
          )}

          {invoice.subscription && (
            <div>
              <p className="text-sm text-muted-foreground">Plano</p>
              <p className="font-medium">{invoice.subscription.subscription_plans.name}</p>
            </div>
          )}

          <Separator />

          {/* NFS-e Info */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Nota Fiscal</h4>
            {invoice.nfse_number ? (
              <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="font-medium">NFS-e: {invoice.nfse_number}</span>
                </div>
                {invoice.nfse_pdf_url && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={invoice.nfse_pdf_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">Nota fiscal não emitida</p>
            )}
          </div>

          {/* Actions */}
          {invoice.payment_status === "pendente" && (
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              <Button onClick={handleMarkAsPaid} disabled={isUpdating}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Marcar como Pago
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
