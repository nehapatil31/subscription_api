-- create plans table
CREATE TABLE plans (
	plan_id VARCHAR ( 50 ) PRIMARY KEY,
	validity VARCHAR ( 50 ) NOT NULL,
	cost NUMERIC(5,2) NOT NULL
);

--create user table
CREATE TABLE users (
	user_name VARCHAR ( 50 ) PRIMARY KEY,
	created_at TIMESTAMP
);

-- create subscription table
CREATE TABLE subscriptions (
	subscription_id serial PRIMARY KEY,
	user_name VARCHAR ( 50 ) NOT NULL,
	plan_id VARCHAR ( 50 ),
	start_date TIMESTAMP,
	CONSTRAINT fk_Plan  
	FOREIGN KEY(plan_id)   
	REFERENCES plans(plan_id),
	CONSTRAINT fk_User 
	FOREIGN KEY(user_name)   
	REFERENCES users(user_name)   
);

-- insert values to plans table
INSERT INTO plans(plan_id, validity, cost)
VALUES ('FREE', 'Infinite', 0.0);
INSERT INTO plans(plan_id, validity, cost)
VALUES ('TRIAL', '7', 0.0);
INSERT INTO plans(plan_id, validity, cost)
VALUES ('LITE_1M', '30', 100.0);
INSERT INTO plans(plan_id, validity, cost)
VALUES ('PRO_1M', '30', 200.0);
INSERT INTO plans(plan_id, validity, cost)
VALUES ('LITE_6M', '180', 500.0);
INSERT INTO plans(plan_id, validity, cost)
VALUES ('PRO_6M', '180', 900.0);
