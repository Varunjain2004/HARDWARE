-- Repair script for MySQL system tables
CREATE DATABASE IF NOT EXISTS mysql;
USE mysql;

-- Recreate the servers table
CREATE TABLE IF NOT EXISTS servers (
    Server_name char(64) NOT NULL,
    Host char(64) NOT NULL,
    Db char(64) NOT NULL,
    Username char(64) NOT NULL,
    Password char(64) NOT NULL,
    Port int(4) NOT NULL,
    Socket char(64) NOT NULL,
    Wrapper char(64) NOT NULL,
    Owner char(64) NOT NULL,
    PRIMARY KEY (Server_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Recreate the plugin table
CREATE TABLE IF NOT EXISTS plugin (
    name char(64) NOT NULL,
    dl char(128) NOT NULL,
    PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; 