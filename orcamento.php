<?php
session_start();
include 'config.php';
include 'functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Processar o formulário de orçamento aqui
    // Por exemplo:
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $servico = $_POST['servico'] ?? '';
    $descricao = $_POST['descricao'] ?? '';

    // Aqui você pode salvar esses dados no banco de dados ou enviar por e-mail
    // Por enquanto, vamos apenas simular uma resposta de sucesso
    $sucesso = true;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitar Orçamento - ViaWhatsApp</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <main>
        <h1>Solicitar Orçamento</h1>
        <?php if (isset($sucesso) && $sucesso): ?>
            <p class="success">Orçamento solicitado com sucesso!</p>
        <?php else: ?>
            <form action="orcamento.php" method="POST" class="orcamento-form">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" required>

                <label for="servico">Serviço Desejado:</label>
                <input type="text" id="servico" name="servico" required>

                <label for="descricao">Descrição do Serviço:</label>
                <textarea id="descricao" name="descricao" required></textarea>

                <button type="submit">Solicitar Orçamento</button>
            </form>
        <?php endif; ?>
    </main>

    <?php include 'footer.php'; ?>
</body>
</html>