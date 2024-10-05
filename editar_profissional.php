<?php
session_start();
include 'config.php';
include 'functions.php';

requireAuth();

$id = $_GET['id'] ?? null;
if (!$id) {
    header('Location: admin.php');
    exit;
}

$profissional = getProfissionalById($conn, $id);
if (!$profissional) {
    header('Location: admin.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $categoria = $_POST['categoria'];
    $cidade = $_POST['cidade'];
    $whatsapp = $_POST['whatsapp'];
    $descricao = $_POST['descricao'];
    $youtube = $_POST['youtube'];
    $instagram = $_POST['instagram'];
    $website = $_POST['website'];
    $pago = isset($_POST['pago']) ? 1 : 0;

    updateProfissional($conn, $id, $nome, $categoria, $cidade, $whatsapp, $descricao, $youtube, $instagram, $website, $pago);
    header('Location: admin.php');
    exit;
}

$categorias = getCategorias($conn);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Profissional - ViaWhatsApp</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <main>
        <h1>Editar Profissional</h1>
        <form action="editar_profissional.php?id=<?php echo $id; ?>" method="POST">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value="<?php echo htmlspecialchars($profissional['nome']); ?>" required>

            <label for="categoria">Categoria:</label>
            <select id="categoria" name="categoria" required>
                <?php foreach ($categorias as $categoria): ?>
                    <option value="<?php echo htmlspecialchars($categoria['categoria']); ?>" <?php echo $categoria['categoria'] === $profissional['categoria'] ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($categoria['categoria']); ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" value="<?php echo htmlspecialchars($profissional['cidade']); ?>" required>

            <label for="whatsapp">WhatsApp:</label>
            <input type="text" id="whatsapp" name="whatsapp" value="<?php echo htmlspecialchars($profissional['whatsapp']); ?>" required>

            <label for="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" required><?php echo htmlspecialchars($profissional['descricao']); ?></textarea>

            <label for="youtube">Link do YouTube:</label>
            <input type="url" id="youtube" name="youtube" value="<?php echo htmlspecialchars($profissional['youtube']); ?>">

            <label for="instagram">Instagram:</label>
            <input type="text" id="instagram" name="instagram" value="<?php echo htmlspecialchars($profissional['instagram']); ?>">

            <label for="website">Website:</label>
            <input type="url" id="website" name="website" value="<?php echo htmlspecialchars($profissional['website']); ?>">

            <label for="pago">Pago:</label>
            <input type="checkbox" id="pago" name="pago" <?php echo $profissional['pago'] ? 'checked' : ''; ?>>

            <button type="submit">Atualizar</button>
        </form>
    </main>

    <?php include 'footer.php'; ?>
</body>
</html>