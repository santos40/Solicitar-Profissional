<?php
session_start();
include 'config.php';
include 'functions.php';

requireAuth();

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newPassword = $_POST['new_password'];
    $confirmPassword = $_POST['confirm_password'];

    if ($newPassword === $confirmPassword) {
        updateAdminPassword($conn, $_SESSION['admin_id'], $newPassword);
        $success = 'Senha alterada com sucesso. Você será redirecionado em 3 segundos.';
        header("refresh:3;url=admin.php");
    } else {
        $error = 'As senhas não coincidem';
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alterar Senha - ViaWhatsApp</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main>
        <h1>Alterar Senha</h1>
        <?php if ($error): ?>
            <p class="error"><?php echo $error; ?></p>
        <?php endif; ?>
        <?php if ($success): ?>
            <p class="success"><?php echo $success; ?></p>
        <?php else: ?>
            <form action="admin_change_password.php" method="POST">
                <label for="new_password">Nova Senha:</label>
                <input type="password" id="new_password" name="new_password" required>

                <label for="confirm_password">Confirmar Nova Senha:</label>
                <input type="password" id="confirm_password" name="confirm_password" required>

                <button type="submit">Alterar Senha</button>
            </form>
        <?php endif; ?>
    </main>
</body>
</html>