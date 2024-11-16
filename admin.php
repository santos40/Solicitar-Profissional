<?php
session_start();
include 'config.php';
include 'functions.php';

requireAuth();

$profissionais = getAllProfissionais($conn);
$categorias = getCategorias($conn);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Administração - Solicitar Orçamento</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <main>
        <h1>Painel de Administração</h1>
        <a href="admin_logout.php" class="btn-logout">Sair</a>

        <h2>Gerenciar Profissionais</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>WhatsApp</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($profissionais as $profissional): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($profissional['nome']); ?></td>
                        <td><?php echo htmlspecialchars($profissional['categoria']); ?></td>
                        <td><?php echo htmlspecialchars($profissional['whatsapp']); ?></td>
                        <td><?php echo $profissional['pago'] ? 'Pago' : 'Pendente'; ?></td>
                        <td>
                            <a href="editar_profissional.php?id=<?php echo $profissional['id']; ?>" class="btn-edit">Editar</a>
                            <a href="deletar_profissional.php?id=<?php echo $profissional['id']; ?>" class="btn-delete" onclick="return confirm('Tem certeza que deseja deletar este profissional?');">Deletar</a>
                            <a href="toggle_pago.php?id=<?php echo $profissional['id']; ?>&pago=<?php echo $profissional['pago'] ? '0' : '1'; ?>" class="btn-toggle-pago">
                                <?php echo $profissional['pago'] ? 'Marcar como Não Pago' : 'Marcar como Pago'; ?>
                            </a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <h2>Gerenciar Categorias</h2>
        <ul>
            <?php foreach ($categorias as $categoria): ?>
                <li><?php echo $categoria['categoria']; ?></li>
            <?php endforeach; ?>
        </ul>
    </main>

    <?php include 'footer.php'; ?>
</body>
</html>