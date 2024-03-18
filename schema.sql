-- Active: 1710761862668@@127.0.0.1@3306@login_system


CREATE DATABASE IF NOT EXISTS login_system;

USE login_system;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
