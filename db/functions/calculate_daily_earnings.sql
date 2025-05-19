-- Função para calcular rendimentos diários
CREATE OR REPLACE FUNCTION calculate_daily_earnings()
RETURNS TABLE (
  investment_id UUID,
  user_id UUID,
  amount NUMERIC,
  day_number INTEGER
) AS $$
DECLARE
  today_date DATE := CURRENT_DATE;
  investment RECORD;
  daily_earning NUMERIC;
  day_num INTEGER;
BEGIN
  -- Verificar se já foram calculados rendimentos para hoje
  IF EXISTS (
    SELECT 1 FROM earnings 
    WHERE DATE(created_at) = today_date
  ) THEN
    RAISE EXCEPTION 'Os rendimentos já foram calculados para hoje';
  END IF;

  -- Processar cada investimento ativo
  FOR investment IN 
    SELECT * FROM investments 
    WHERE status = 'active' AND days_remaining > 0
  LOOP
    -- Calcular rendimento diário
    daily_earning := investment.amount * (investment.daily_rate / 100);
    day_num := investment.days_total - investment.days_remaining + 1;
    
    -- Retornar resultado
    investment_id := investment.id;
    user_id := investment.user_id;
    amount := daily_earning;
    day_number := day_num;
    
    RETURN NEXT;
  END LOOP;
  
  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Função para aplicar rendimentos diários
CREATE OR REPLACE FUNCTION apply_daily_earnings()
RETURNS INTEGER AS $$
DECLARE
  earnings_count INTEGER := 0;
  earning RECORD;
BEGIN
  -- Calcular rendimentos
  FOR earning IN SELECT * FROM calculate_daily_earnings()
  LOOP
    -- Inserir registro de rendimento
    INSERT INTO earnings (user_id, investment_id, amount, day_number)
    VALUES (earning.user_id, earning.investment_id, earning.amount, earning.day_number);
    
    -- Atualizar saldo do usuário
    UPDATE profiles
    SET balance = balance + earning.amount
    WHERE id = earning.user_id;
    
    -- Registrar transação
    INSERT INTO transactions (user_id, type, amount, reference_id, description)
    VALUES (
      earning.user_id,
      'earning',
      earning.amount,
      earning.investment_id,
      'Rendimento diário (' || earning.day_number || '/' || 
      (SELECT days_total FROM investments WHERE id = earning.investment_id) || 
      '): $' || ROUND(earning.amount::numeric, 2)
    );
    
    -- Atualizar dias restantes do investimento
    UPDATE investments
    SET 
      days_remaining = days_remaining - 1,
      status = CASE WHEN days_remaining <= 1 THEN 'completed' ELSE 'active' END
    WHERE id = earning.investment_id;
    
    earnings_count := earnings_count + 1;
  END LOOP;
  
  RETURN earnings_count;
END;
$$ LANGUAGE plpgsql;
