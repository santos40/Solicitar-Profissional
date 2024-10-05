<?php
session_start();
include 'config.php';
include 'functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $whatsapp = $_POST['whatsapp'];
    $descricao = $_POST['descricao'];
    $youtube = $_POST['youtube'];
    $instagram = $_POST['instagram'];
    $website = $_POST['website'];

    // Processar o upload do logo
    $logo = '';
    if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $logoName = uniqid() . '_' . basename($_FILES['logo']['name']);
        $logoPath = $uploadDir . $logoName;
        
        if (move_uploaded_file($_FILES['logo']['tmp_name'], $logoPath)) {
            $logo = $logoPath;
        }
    }

    // Inserir dados no banco de dados
    $stmt = $conn->prepare("INSERT INTO profissionais (nome, whatsapp, descricao, youtube, instagram, website, logo) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nome, $whatsapp, $descricao, $youtube, $instagram, $website, $logo]);

    // Redirecionar para a página de pagamento
    header('Location: pagamento.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Profissional - ViaWhatsApp</title>
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
        <h1>Cadastro de Profissional</h1>
        <form action="cadastro.php" method="POST" enctype="multipart/form-data">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>

            <label for="whatsapp">WhatsApp:</label>
            <input type="text" id="whatsapp" name="whatsapp" required>

            <label for="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" required></textarea>

            <label for="youtube">Link do YouTube:</label>
            <input type="url" id="youtube" name="youtube">

            <label for="instagram">Instagram:</label>
            <input type="text" id="instagram" name="instagram">

            <label for="website">Website:</label>
            <input type="url" id="website" name="website">

            <label for="logo">Logotipo:</label>
            <input type="file" id="logo" name="logo" accept="image/*">

            <button type="submit">Cadastrar</button>
        </form>
    </main>

    <footer>
        <p>&copy; 2024 ViaWhatsApp. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
