import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const novaCobrancaSchema = z.object({
  patient_id: z.string().min(1, "Selecione um paciente"),
  amount: z.string().min(1, "Informe o valor").refine(
    (val) => !isNaN(parseFloat(val.replace(",", "."))) && parseFloat(val.replace(",", ".")) > 0,
    "Valor deve ser maior que zero"
  ),
  due_date: z.string().min(1, "Informe a data de vencimento"),
  subscription_id: z.string().optional(),
});

type NovaCobrancaFormData = z.infer<typeof novaCobrancaSchema>;

interface NovaCobrancaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const NovaCobrancaDialog = ({ open, onOpenChange, onSuccess }: NovaCobrancaDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NovaCobrancaFormData>({
    resolver: zodResolver(novaCobrancaSchema),
    defaultValues: {
      patient_id: "",
      amount: "",
      due_date: "",
      subscription_id: "",
    },
  });

  const { data: patients = [], isLoading: loadingPatients } = useQuery({
    queryKey: ["patients-select"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("id, full_name")
        .order("full_name");
      if (error) throw error;
      return data;
    },
  });

  const selectedPatientId = form.watch("patient_id");

  const { data: subscriptions = [] } = useQuery({
    queryKey: ["subscriptions-select", selectedPatientId],
    queryFn: async () => {
      if (!selectedPatientId) return [];
      const { data, error } = await supabase
        .from("subscriptions")
        .select(`
          id,
          status,
          subscription_plans (name, price_monthly)
        `)
        .eq("patient_id", selectedPatientId)
        .eq("status", "ativa");
      if (error) throw error;
      return data;
    },
    enabled: !!selectedPatientId,
  });

  const onSubmit = async (data: NovaCobrancaFormData) => {
    setIsSubmitting(true);
    try {
      const amount = parseFloat(data.amount.replace(",", "."));
      const { error } = await supabase.from("invoices").insert({
        patient_id: data.patient_id,
        amount,
        issue_date: new Date().toISOString().split("T")[0],
        due_date: data.due_date,
        subscription_id: data.subscription_id || null,
        payment_status: "pendente",
      });

      if (error) throw error;

      toast.success("Cobrança criada com sucesso!");
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar cobrança:", error);
      toast.error("Erro ao criar cobrança. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Cobrança</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patient_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paciente</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={loadingPatients ? "Carregando..." : "Selecione um paciente"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {subscriptions.length > 0 && (
              <FormField
                control={form.control}
                name="subscription_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assinatura (opcional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vincular a assinatura" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Nenhuma</SelectItem>
                        {subscriptions.map((sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.subscription_plans?.name} - R$ {sub.subscription_plans?.price_monthly}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor (R$)</FormLabel>
                  <FormControl>
                    <Input placeholder="0,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Vencimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar Cobrança
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
