<?php
session_start();
include 'config.php';
include 'functions.php';

$profissionais = getProfissionais($conn);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orçamentos Grátis - Portal de Profissionais</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>