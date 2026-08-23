DROP POLICY "Authenticated users can delete service requests" ON public.service_requests;
DROP POLICY "Authenticated users can update service requests" ON public.service_requests;
DROP POLICY "Authenticated users can view service requests" ON public.service_requests;

CREATE POLICY "Admins can view service requests" ON public.service_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update service requests" ON public.service_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete service requests" ON public.service_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));