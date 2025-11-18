import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Phone, Mail, Calendar, DollarSign, FileText } from "lucide-react";

const Pacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
            <p className="text-muted-foreground">Gerencie o cadastro de pacientes</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Novo paciente
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, telefone ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtros</Button>
            <Button variant="outline">Exportar</Button>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total de Pacientes"
            value="148"
            subtitle="+12 este mês"
            color="primary"
          />
          <StatCard
            title="Ativos"
            value="132"
            subtitle="89% do total"
            color="secondary"
          />
          <StatCard
            title="Novos (30 dias)"
            value="12"
            subtitle="+3 vs mês anterior"
            color="accent"
          />
          <StatCard
            title="Inativos"
            value="16"
            subtitle="11% do total"
            color="muted"
          />
        </div>

        {/* Patients List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PatientCard
            name="Ana Silva"
            phone="(11) 98765-4321"
            email="ana.silva@email.com"
            lastVisit="Hoje, 09:00"
            status="active"
            plan="Pilates Mensal"
          />
          <PatientCard
            name="Carlos Oliveira"
            phone="(11) 97654-3210"
            email="carlos.o@email.com"
            lastVisit="Ontem, 14:00"
            status="active"
            plan="Fisioterapia Semanal"
          />
          <PatientCard
            name="Beatriz Souza"
            phone="(11) 96543-2109"
            email="bia.souza@email.com"
            lastVisit="2 dias atrás"
            status="active"
            plan="Pilates Mensal"
          />
          <PatientCard
            name="Pedro Lima"
            phone="(11) 95432-1098"
            email="pedro.lima@email.com"
            lastVisit="Há 15 dias"
            status="pending"
            plan="Avaliação"
          />
          <PatientCard
            name="Julia Ferreira"
            phone="(11) 94321-0987"
            email="julia.f@email.com"
            lastVisit="Hoje, 15:00"
            status="active"
            plan="Pilates Mensal"
          />
          <PatientCard
            name="Lucas Costa"
            phone="(11) 93210-9876"
            email="lucas.costa@email.com"
            lastVisit="Ontem, 10:00"
            status="active"
            plan="Fisioterapia Semanal"
          />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: "primary" | "secondary" | "accent" | "muted";
}

const StatCard = ({ title, value, subtitle, color }: StatCardProps) => {
  const colorClasses = {
    primary: "border-primary/20 bg-primary/5",
    secondary: "border-secondary/20 bg-secondary/5",
    accent: "border-accent/20 bg-accent/5",
    muted: "border-border bg-muted/30",
  };

  return (
    <Card className={`p-4 border-2 ${colorClasses[color]}`}>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </Card>
  );
};

interface PatientCardProps {
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  status: "active" | "pending" | "inactive";
  plan: string;
}

const PatientCard = ({ name, phone, email, lastVisit, status, plan }: PatientCardProps) => {
  const statusColors = {
    active: "bg-secondary/10 text-secondary",
    pending: "bg-accent/10 text-accent",
    inactive: "bg-muted text-muted-foreground",
  };

  const statusLabels = {
    active: "Ativo",
    pending: "Pendente",
    inactive: "Inativo",
  };

  return (
    <Card className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer group border-border bg-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
            {name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <Badge className={`text-xs mt-1 ${statusColors[status]}`}>
              {statusLabels[status]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{lastVisit}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">{plan}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Pacientes;
