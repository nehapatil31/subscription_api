CREATE OR REPLACE FUNCTION get_subscription(username VARCHAR ( 50 ))
RETURNS json
LANGUAGE 'plpgsql'
AS
$$
DECLARE
   plans_json json;
BEGIN
   plans_json:= json_build_object('data',(
   select json_agg(json_build_object(
   	'plan_id', t.plan_id,
	'start_date', t.start_date,   
	'end_date',(
		 CASE WHEN t.plan_id='FREE' THEN 'No end date'::VARCHAR
		 ELSE(
		 select (t.start_date + interval '1' day * p.validity::int)::VARCHAR from plans as p 
				 where p.plan_id=t.plan_id
		 )
		END) 
   )) FROM subscriptions AS t WHERE user_name=username
   ));
	return plans_json;
END;
$$;

CREATE OR REPLACE FUNCTION get_subscription(username VARCHAR ( 50 ), date timestamp)
RETURNS json
LANGUAGE 'plpgsql'
AS
$$
DECLARE
   plans_json json;
BEGIN
   plans_json:= json_build_object('data',(
   SELECT json_agg(json_build_object(
   	'plan_id', t.plan_id,  
	'days_left',(
		CASE WHEN t.plan_id='FREE' THEN 'Infinite'::VARCHAR
		ELSE
			(SELECT (t2.val - DATE_PART('day', date::timestamp - t.start_date::timestamp))::VARCHAR FROM
				 (SELECT (p.validity::int)as val FROM plans AS p 
				 WHERE p.plan_id=t.plan_id)t2)
		END) 
	   
   )) FROM subscriptions AS t WHERE user_name=username AND date::date>t.start_date
   ));
	return plans_json;
END;
$$;