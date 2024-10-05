<?php
session_start();
include 'config.php';
include 'functions.php';

// Aqui você implementaria a lógica de processamento do pagamento
// Por enquanto, vamos apenas exibir as opções de pagamento
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagamento - ViaWhatsApp</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="cadastro.php">Cadastro</a></li>
                <li><a href="pesquisa.php">Pesquisa</a></li>
                <?php if(isset($_SESSION['user_id'])): ?>
                    <li><a href="perfil.php">Perfil</a></li>
                    <li><a href="logout.php">Sair</a></li>
                <?php else: ?>
                    <li><a href="login.php">Login</a></li>
                <?php endif; ?>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Pagamento</h1>
        <p>Escolha sua forma de pagamento:</p>
        <div class="payment-options">
            <button onclick="processPayment('credit_card')">Cartão de Crédito</button>
            <button onclick="processPayment('boleto')">Boleto Bancário</button>
            <button onclick="processPayment('pix')">PIX</button>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 ViaWhatsApp. Todos os direitos reservados.</p>
    </footer>

    <script>
        function processPayment(method) {
            // Aqui você implementaria a lógica de processamento do pagamento
            alert('Processando pagamento via ' + method);
            // Após o processamento bem-sucedido, você redirecionaria o usuário para uma página de confirmação
        }
    </script>
</body>
</html>
