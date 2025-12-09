-- Fix patients table RLS: restrict SELECT to admin, recepcao, and profissional only
DROP POLICY IF EXISTS "Usuários autenticados podem ver pacientes" ON public.patients;

CREATE POLICY "Admins, recepção e profissionais podem ver pacientes"
ON public.patients
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'recepcao'::app_role) OR 
  has_role(auth.uid(), 'profissional'::app_role)
);

-- Fix invoices table: add UPDATE policy for admin, contador, and recepcao
CREATE POLICY "Admins, contadores e recepção podem atualizar notas fiscais"
ON public.invoices
FOR UPDATE
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'contador'::app_role) OR 
  has_role(auth.uid(), 'recepcao'::app_role)
);