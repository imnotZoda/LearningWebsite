USE learn_schema;
SET NAMES utf8mb4;

SET @mojibake = CONVERT(0xCE93C387C3B6 USING utf8mb4);
SET @em_dash = CONVERT(0xE28094 USING utf8mb4);

UPDATE topics
SET title = REPLACE(title, @mojibake, @em_dash),
    slug = REPLACE(slug, @mojibake, @em_dash),
    content = REPLACE(content, @mojibake, @em_dash);

UPDATE quizzes
SET title = REPLACE(title, @mojibake, @em_dash);

UPDATE quiz_questions
SET question_text = REPLACE(question_text, @mojibake, @em_dash);

UPDATE quiz_options
SET option_text = REPLACE(option_text, @mojibake, @em_dash);
