import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";

const Agenda = () => {
  const [currentDate] = useState(new Date());
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h às 19h

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
            <p className="text-muted-foreground">Gerencie todos os atendimentos</p>
          </div>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Novo agendamento
          </Button>
        </div>

        {/* Calendar Controls */}
        <Card className="p-4 border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">
                  {currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                </h2>
                <p className="text-sm text-muted-foreground">Semana de 18 a 24 de Novembro</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline">Dia</Button>
              <Button variant="default">Semana</Button>
              <Button variant="outline">Mês</Button>
            </div>
          </div>
        </Card>

        {/* Week View */}
        <Card className="p-6 border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header with days */}
              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className="text-sm font-medium text-muted-foreground">Horário</div>
                {weekDays.slice(1, 6).map((day, idx) => (
                  <div key={day} className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">{day}</p>
                    <p className={`text-2xl font-bold mt-1 ${idx === 0 ? "text-primary" : "text-card-foreground"}`}>
                      {18 + idx}
                    </p>
                  </div>
                ))}
              </div>

              {/* Time grid */}
              <div className="space-y-2">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {hour}:00
                    </div>
                    {[0, 1, 2, 3, 4].map((day) => (
                      <AppointmentSlot
                        key={`${hour}-${day}`}
                        hour={hour}
                        day={day}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Legend */}
        <Card className="p-4 border-border bg-card">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gradient-primary" />
              <span className="text-sm text-card-foreground">Confirmado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-accent" />
              <span className="text-sm text-card-foreground">Pendente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-muted" />
              <span className="text-sm text-card-foreground">Livre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-destructive/20" />
              <span className="text-sm text-card-foreground">Cancelado</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const appointments = [
  { hour: 9, day: 0, patient: "Ana Silva", service: "Pilates", status: "confirmed" },
  { hour: 10, day: 0, patient: "Carlos Oliveira", service: "Fisio", status: "pending" },
  { hour: 11, day: 0, patient: "Beatriz Souza", service: "Pilates", status: "confirmed" },
  { hour: 9, day: 1, patient: "João Pedro", service: "Pilates", status: "confirmed" },
  { hour: 14, day: 1, patient: "Maria Santos", service: "Fisio", status: "confirmed" },
  { hour: 10, day: 2, patient: "Pedro Lima", service: "Avaliação", status: "pending" },
  { hour: 15, day: 2, patient: "Julia Ferreira", service: "Pilates", status: "confirmed" },
  { hour: 9, day: 3, patient: "Lucas Costa", service: "Fisio", status: "confirmed" },
  { hour: 16, day: 3, patient: "Fernanda Dias", service: "Pilates", status: "pending" },
  { hour: 11, day: 4, patient: "Roberto Alves", service: "Pilates", status: "confirmed" },
];

const AppointmentSlot = ({ hour, day }: { hour: number; day: number }) => {
  const appointment = appointments.find(a => a.hour === hour && a.day === day);
  
  if (!appointment) {
    return (
      <div className="min-h-[60px] rounded-lg border-2 border-dashed border-muted bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer flex items-center justify-center group">
        <Plus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  }

  const statusColors = {
    confirmed: "bg-gradient-primary text-white",
    pending: "bg-accent text-accent-foreground",
  };

  return (
    <div className={`min-h-[60px] rounded-lg p-2 ${statusColors[appointment.status as keyof typeof statusColors]} cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105`}>
      <p className="font-semibold text-xs mb-1 truncate">{appointment.patient}</p>
      <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
        {appointment.service}
      </Badge>
    </div>
  );
};

export default Agenda;
