import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Bell, Calendar, CreditCard, FileText, Shield } from "lucide-react";

export default function Configuracoes() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">Gerencie as configurações da sua clínica</p>
      </div>

      <Tabs defaultValue="clinica" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="clinica">
            <Building2 className="h-4 w-4 mr-2" />
            Clínica
          </TabsTrigger>
          <TabsTrigger value="usuarios">
            <Users className="h-4 w-4 mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="integracoes">
            <CreditCard className="h-4 w-4 mr-2" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="notificacoes">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
        </TabsList>

        {/* Clínica */}
        <TabsContent value="clinica" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Clínica</CardTitle>
              <CardDescription>Dados básicos e fiscais da sua clínica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-clinica">Nome da Clínica</Label>
                  <Input id="nome-clinica" placeholder="Clínica Exemplo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Input id="endereco" placeholder="Rua, número, bairro, cidade - UF" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 0000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contato@clinica.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site">Website</Label>
                  <Input id="site" placeholder="www.clinica.com" />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Dados Fiscais (NFS-e)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inscricao-municipal">Inscrição Municipal</Label>
                    <Input id="inscricao-municipal" placeholder="000.000.000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codigo-servico">Código de Serviço</Label>
                    <Input id="codigo-servico" placeholder="4.00.00" />
                  </div>
                </div>
              </div>

              <Button className="mt-4">Salvar Alterações</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horário de Funcionamento</CardTitle>
              <CardDescription>Configure os horários de atendimento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="abertura">Horário de Abertura</Label>
                  <Input id="abertura" type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechamento">Horário de Fechamento</Label>
                  <Input id="fechamento" type="time" defaultValue="18:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="intervalo">Intervalo entre Consultas (minutos)</Label>
                <Input id="intervalo" type="number" defaultValue="30" />
              </div>
              <Button>Salvar Horários</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuários */}
        <TabsContent value="usuarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>Adicione e gerencie usuários do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Adicionar Novo Usuário
              </Button>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="font-semibold">Usuários Cadastrados</h3>
                
                <div className="space-y-2">
                  {[
                    { nome: "Dr. João Silva", email: "joao@clinica.com", role: "Admin", status: "Ativo" },
                    { nome: "Maria Santos", email: "maria@clinica.com", role: "Recepção", status: "Ativo" },
                    { nome: "Dr. Pedro Costa", email: "pedro@clinica.com", role: "Profissional", status: "Ativo" },
                  ].map((usuario, idx) => (
                    <Card key={idx}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                            {usuario.nome.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{usuario.nome}</p>
                            <p className="text-sm text-muted-foreground">{usuario.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">{usuario.role}</p>
                            <p className="text-xs text-success">{usuario.status}</p>
                          </div>
                          <Button variant="outline" size="sm">Editar</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Permissões e Papéis
              </CardTitle>
              <CardDescription>Configure as permissões de cada papel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { role: "Admin", descricao: "Acesso total ao sistema" },
                  { role: "Recepção", descricao: "Agenda, pacientes e mensagens" },
                  { role: "Profissional", descricao: "Visualizar agenda e pacientes" },
                  { role: "Contador", descricao: "Acesso financeiro e notas fiscais" },
                ].map((papel, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-semibold">{papel.role}</p>
                      <p className="text-sm text-muted-foreground">{papel.descricao}</p>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrações */}
        <TabsContent value="integracoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Calendar</CardTitle>
              <CardDescription>Sincronize seus agendamentos com o Google Calendar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">Status: Não Conectado</p>
                    <p className="text-sm text-muted-foreground">Conecte para sincronizar automaticamente</p>
                  </div>
                </div>
                <Button>Conectar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business API</CardTitle>
              <CardDescription>Envie confirmações e mensagens automatizadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-8 w-8 text-success" />
                  <div>
                    <p className="font-semibold">Status: Não Conectado</p>
                    <p className="text-sm text-muted-foreground">Configure para enviar mensagens automáticas</p>
                  </div>
                </div>
                <Button>Configurar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gateway de Pagamento</CardTitle>
              <CardDescription>Receba pagamentos e gerencie assinaturas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-accent" />
                  <div>
                    <p className="font-semibold">Status: Não Conectado</p>
                    <p className="text-sm text-muted-foreground">Stripe, Pagar.me ou Iugu</p>
                  </div>
                </div>
                <Button>Conectar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emissão de NFS-e</CardTitle>
              <CardDescription>Emita notas fiscais automaticamente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">Status: Não Conectado</p>
                    <p className="text-sm text-muted-foreground">PlugNotas ou NFe.io</p>
                  </div>
                </div>
                <Button>Conectar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>Configure quando e como receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Novos Agendamentos</p>
                    <p className="text-sm text-muted-foreground">Receba notificação quando uma nova consulta for marcada</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Confirmações de Pacientes</p>
                    <p className="text-sm text-muted-foreground">Notificação quando um paciente confirmar presença</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Pagamentos Recebidos</p>
                    <p className="text-sm text-muted-foreground">Alertas de pagamentos e cobranças processadas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Falhas em Cobranças</p>
                    <p className="text-sm text-muted-foreground">Notificação imediata quando uma cobrança falhar</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Resumo Diário</p>
                    <p className="text-sm text-muted-foreground">Receba um resumo das atividades do dia por e-mail</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold">Canais de Notificação</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <Label>Notificações no App</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <Label>E-mail</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch />
                    <Label>SMS</Label>
                  </div>
                </div>
              </div>

              <Button className="mt-4">Salvar Preferências</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
