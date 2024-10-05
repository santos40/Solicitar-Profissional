<?php
session_start();
include 'config.php';
include 'functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $categoria = $_POST['categoria'];
    $cidade = $_POST['cidade'];
    $whatsapp = $_POST['whatsapp'];
    $descricao = $_POST['descricao'];
    $youtube = $_POST['youtube'];
    $instagram = $_POST['instagram'];
    $website = $_POST['website'];

    $logo = '';
    if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        $logoName = uniqid() . '_' . basename($_FILES['logo']['name']);
        $logoPath = $uploadDir . $logoName;
        
        if (move_uploaded_file($_FILES['logo']['tmp_name'], $logoPath)) {
            $logo = $logoPath;
        }
    }

    $stmt = $conn->prepare("INSERT INTO profissionais (nome, categoria, cidade, whatsapp, descricao, youtube, instagram, website, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$nome, $categoria, $cidade, $whatsapp, $descricao, $youtube, $instagram, $website, $logo]);

    header('Location: pagamento.php');
    exit;
}

$categorias = getCategorias($conn);
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
    <?php include 'header.php'; ?>

    <main>
        <h1>Cadastro de Profissional</h1>
        <form action="cadastro.php" method="POST" enctype="multipart/form-data">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>

            <label for="categoria">Categoria:</label>
            <select id="categoria" name="categoria" required>
                <?php foreach ($categorias as $categoria): ?>
                    <option value="<?php echo $categoria['nome']; ?>"><?php echo $categoria['nome']; ?></option>
                <?php endforeach; ?>
            </select>

            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" required>

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

    <?php include 'footer.php'; ?>
</body>
</html>