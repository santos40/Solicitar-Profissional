<?php
session_start();
include 'config.php';
include 'functions.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $admin = getAdminByUsername($conn, $username);

    if ($admin) {
        if ($admin['is_first_access'] && $password === 'primeiro_acesso') {
            $_SESSION['admin_id'] = $admin['id'];
            header('Location: admin_change_password.php');
            exit;
        } elseif (!$admin['is_first_access'] && password_verify($password, $admin['password'])) {
            $_SESSION['admin_id'] = $admin['id'];
            header('Location: admin.php');
            exit;
        } else {
            $error = 'Credenciais inválidas';
        }
    } else {
        $error = 'Usuário não encontrado';
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Administrativo - ViaWhatsApp</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main>
        <h1>Login Administrativo</h1>
        <?php if ($error): ?>
            <p class="error"><?php echo $error; ?></p>
        <?php endif; ?>
        <form action="admin_login.php" method="POST">
            <label for="username">Usuário:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Entrar</button>
        </form>
    </main>
</body>
</html>