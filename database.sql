-- TechMATRIX Project Database Schema
-- Database: techmatrix_db

CREATE TABLE IF NOT EXISTS project_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    service_type TEXT NOT NULL,
    project_details TEXT NOT NULL,
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Example Insert for testing
INSERT INTO project_requests (full_name, email, service_type, project_details)
VALUES ('Sample User', 'sample@example.com', 'Website Design', 'This is a test project request for the TechMATRIX system.');