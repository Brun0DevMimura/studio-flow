import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, MessageSquare, CreditCard, FileText, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm animate-fade-in">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Gestão completa para sua clínica</span>
            </div>
            
            <h1 className="mb-6 text-5xl md:text-6xl font-bold text-white animate-slide-up">
              Transforme a gestão da sua clínica de pilates
            </h1>
            
            <p className="mb-8 max-w-2xl text-xl text-white/90 animate-slide-up" style={{ animationDelay: "100ms" }}>
              Agenda integrada, comunicação automática, cobranças recorrentes e emissão de notas fiscais. Tudo em um só lugar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                Agendar demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Tudo que você precisa em uma plataforma
            </h2>
            <p className="text-xl text-muted-foreground">
              Funcionalidades pensadas para otimizar cada aspecto da sua clínica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calendar className="h-8 w-8" />}
              title="Agenda Integrada"
              description="Sincronização automática com Google Calendar. Visualize e gerencie todos os atendimentos em tempo real."
              color="primary"
            />
            
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="WhatsApp Automático"
              description="Envio automático de confirmações 24h antes e mensagens pós-atendimento. Reduza faltas significativamente."
              color="secondary"
            />
            
            <FeatureCard
              icon={<CreditCard className="h-8 w-8" />}
              title="Cobranças Recorrentes"
              description="Configure pagamentos mensais automáticos. Webhooks inteligentes e gestão completa de inadimplência."
              color="accent"
            />
            
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Emissão de NFS-e"
              description="Gere notas fiscais automaticamente após confirmação de pagamento. Conformidade fiscal garantida."
              color="primary"
            />
            
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Gestão de Pacientes"
              description="Histórico completo, prontuários digitais e controle de consentimento (LGPD). Tudo organizado."
              color="secondary"
            />
            
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="Dashboard Inteligente"
              description="Visualize métricas importantes, pacientes do dia e próximos atendimentos em um só lugar."
              color="accent"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Por que escolher nossa plataforma?
              </h2>
              <div className="space-y-4">
                <BenefitItem text="Redução de até 70% nas faltas com confirmações automáticas" />
                <BenefitItem text="Economia de 10+ horas por semana em tarefas administrativas" />
                <BenefitItem text="Conformidade total com LGPD e requisitos fiscais" />
                <BenefitItem text="Integração nativa com ferramentas que você já usa" />
                <BenefitItem text="Suporte especializado para o setor de saúde" />
              </div>
            </div>
            
            <Card className="p-8 shadow-elegant bg-card">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-card-foreground">Agenda Sempre Sincronizada</h3>
                    <p className="text-sm text-muted-foreground">
                      Alterações em tempo real entre o sistema e seu Google Calendar
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary/10 p-3">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-card-foreground">Comunicação Inteligente</h3>
                    <p className="text-sm text-muted-foreground">
                      Templates personalizáveis e envio automatizado no momento ideal
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <CreditCard className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-card-foreground">Financeiro Automatizado</h3>
                    <p className="text-sm text-muted-foreground">
                      Da cobrança à nota fiscal, tudo acontece automaticamente
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Pronto para transformar sua clínica?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a dezenas de clínicas que já otimizaram sua gestão
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
            Começar teste grátis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent";
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
  };

  return (
    <Card className="p-6 hover:shadow-elegant transition-all duration-300 border-border bg-card group cursor-pointer">
      <div className={`inline-flex rounded-lg p-3 mb-4 ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
    <p className="text-foreground">{text}</p>
  </div>
);

export default Index;
