<?php

function getDbConnection()
{
	$dbHost = getenv('DB_HOST') ?: 'localhost';
	$dbUser = getenv('DB_USER') ?: 'colors_user';
	$dbPassword = getenv('DB_PASSWORD') ?: '';
	$dbName = getenv('DB_NAME') ?: 'COP4331';

	$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
	if ($conn->connect_error)
	{
		return null;
	}

	return $conn;
}

?>