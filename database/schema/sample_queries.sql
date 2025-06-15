-- Sample SQL Queries
SELECT COUNT(*) FROM transactions;
SELECT category, SUM(amount) FROM transactions GROUP BY category;
SELECT * FROM transactions ORDER BY date DESC LIMIT 10;
