import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, FileText, Clock, Plus, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral da sua clínica</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Nova consulta
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Consultas Hoje"
            value="12"
            subtitle="+2 desde ontem"
            icon={<Calendar className="h-5 w-5" />}
            color="primary"
          />
          <KPICard
            title="Pacientes Ativos"
            value="148"
            subtitle="8 novos este mês"
            icon={<Users className="h-5 w-5" />}
            color="secondary"
          />
          <KPICard
            title="Receita do Mês"
            value="R$ 24.5k"
            subtitle="+15% vs mês anterior"
            icon={<DollarSign className="h-5 w-5" />}
            color="accent"
          />
          <KPICard
            title="Notas Emitidas"
            value="89"
            subtitle="Este mês"
            icon={<FileText className="h-5 w-5" />}
            color="primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pacientes do Dia */}
          <Card className="lg:col-span-2 p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">Pacientes do Dia</h2>
              <Badge variant="secondary">12 agendados</Badge>
            </div>
            
            <div className="space-y-3">
              <PatientCard
                name="Ana Silva"
                time="09:00"
                service="Pilates - Aula Regular"
                status="confirmed"
                professional="Dr. João Santos"
              />
              <PatientCard
                name="Carlos Oliveira"
                time="10:00"
                service="Fisioterapia - Avaliação"
                status="pending"
                professional="Dra. Maria Costa"
              />
              <PatientCard
                name="Beatriz Souza"
                time="11:00"
                service="Pilates - Aula Regular"
                status="confirmed"
                professional="Dr. João Santos"
              />
              <PatientCard
                name="Pedro Lima"
                time="14:00"
                service="Fisioterapia - Sessão"
                status="confirmed"
                professional="Dra. Maria Costa"
              />
              <PatientCard
                name="Julia Ferreira"
                time="15:00"
                service="Pilates - Aula Regular"
                status="pending"
                professional="Dr. João Santos"
              />
            </div>
          </Card>

          {/* Próximas Ações */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-6 text-card-foreground">Próximas Ações</h2>
            
            <div className="space-y-4">
              <ActionItem
                title="Confirmações pendentes"
                description="7 pacientes aguardando confirmação"
                icon={<Clock className="h-5 w-5 text-accent" />}
                action="Enviar lembretes"
              />
              
              <ActionItem
                title="Cobranças vencidas"
                description="3 pagamentos em atraso"
                icon={<DollarSign className="h-5 w-5 text-destructive" />}
                action="Ver detalhes"
              />
              
              <ActionItem
                title="Notas fiscais"
                description="5 notas para emitir"
                icon={<FileText className="h-5 w-5 text-primary" />}
                action="Emitir agora"
              />

              <ActionItem
                title="Novos pacientes"
                description="4 cadastros incompletos"
                icon={<Users className="h-5 w-5 text-secondary" />}
                action="Completar cadastros"
              />
            </div>
          </Card>
        </div>

        {/* Timeline do Dia */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-6 text-card-foreground">Timeline do Dia</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
            {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time, idx) => (
              <TimeSlot key={idx} time={time} occupied={idx < 5} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "accent";
}

const KPICard = ({ title, value, subtitle, icon, color }: KPICardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
  };

  return (
    <Card className="p-6 border-border bg-card hover:shadow-elegant transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

interface PatientCardProps {
  name: string;
  time: string;
  service: string;
  status: "confirmed" | "pending";
  professional: string;
}

const PatientCard = ({ name, time, service, status, professional }: PatientCardProps) => (
  <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
        {name.split(" ").map(n => n[0]).join("")}
      </div>
    </div>
    
    <div className="flex-grow min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <p className="font-semibold text-card-foreground truncate">{name}</p>
        {status === "confirmed" ? (
          <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
      </div>
      <p className="text-sm text-muted-foreground truncate">{service}</p>
      <p className="text-xs text-muted-foreground">{professional}</p>
    </div>
    
    <div className="flex-shrink-0 text-right">
      <p className="text-lg font-semibold text-primary">{time}</p>
    </div>
  </div>
);

interface ActionItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
}

const ActionItem = ({ title, description, icon, action }: ActionItemProps) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div className="flex-grow min-w-0">
      <p className="font-medium text-card-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Button variant="ghost" size="sm" className="flex-shrink-0 text-primary">
      {action}
    </Button>
  </div>
);

const TimeSlot = ({ time, occupied }: { time: string; occupied: boolean }) => (
  <div className={`p-4 rounded-lg text-center transition-all duration-300 ${
    occupied 
      ? "bg-gradient-primary text-white shadow-md" 
      : "bg-muted text-muted-foreground"
  }`}>
    <p className="text-sm font-medium">{time}</p>
    <p className="text-xs mt-1">{occupied ? "Ocupado" : "Livre"}</p>
  </div>
);

export default Dashboard;
