ALTER TABLE public.service_requests
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS paddle_transaction_id text;

CREATE INDEX IF NOT EXISTS idx_service_requests_user_id ON public.service_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_order_id ON public.service_requests(order_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_txn ON public.orders(paddle_transaction_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON public.subscriptions(paddle_customer_id);

CREATE POLICY "Customers can view their own requests"
  ON public.service_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_id);