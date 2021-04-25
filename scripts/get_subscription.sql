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
	 'end_date',(select t.start_date + interval '1' day * p.validity::int from plans as p 
				 where p.plan_id=t.plan_id) 
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
	'days_left',(SELECT t2.val - DATE_PART('day', date::timestamp - t.start_date::timestamp) FROM
				 (SELECT (p.validity::int)as val FROM plans AS p 
				 WHERE p.plan_id=t.plan_id)t2) 
   )) FROM subscriptions AS t WHERE user_name='neha' AND '2021-04-28'::date>t.start_date
   ));
	return plans_json;
END;
$$;