CREATE OR REPLACE FUNCTION add_subscription(username VARCHAR ( 50 ), planid VARCHAR ( 50 ), start_date VARCHAR(50))
RETURNS json
LANGUAGE 'plpgsql'
AS
$$
DECLARE
   plans_json json;
BEGIN
	INSERT INTO subscriptions(user_name,plan_id,start_date) 
    VALUES (username,planid,TO_TIMESTAMP(start_date,'YYYY-MM-DD'));
	
   plans_json:= json_build_object('amount',(
		 select cost from plans where plan_id=planid
   ));
	return plans_json;
END;
$$;