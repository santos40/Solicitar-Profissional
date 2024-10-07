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
    <?php include 'header.php'; ?>

    <main>
        <!-- Área para a aplicação React -->
        <div id="react-root"></div>

        <!-- Conteúdo PHP existente -->
        <h1>Bem-vindo ao Orçamentos Grátis</h1>
        <p>Encontre os melhores profissionais da construção e limpeza.</p>

        <form action="pesquisa.php" method="GET" class="search-form">
            <input type="text" name="q" placeholder="Pesquisar por nome, categoria ou cidade">
            <button type="submit">Pesquisar</button>
        </form>

        <div class="profissionais-grid">
            <?php foreach ($profissionais as $profissional): ?>
                <div class="profissional-card">
                    <img src="<?php echo htmlspecialchars($profissional['logo']); ?>" alt="<?php echo htmlspecialchars($profissional['nome']); ?>">
                    <h2><?php echo htmlspecialchars($profissional['nome']); ?></h2>
                    <p><?php echo htmlspecialchars($profissional['categoria']); ?> - <?php echo htmlspecialchars($profissional['cidade']); ?></p>
                    <p><?php echo htmlspecialchars(substr($profissional['descricao'], 0, 100)); ?>...</p>
                    <a href="perfil.php?id=<?php echo $profissional['id']; ?>" class="btn-perfil">Ver Perfil</a>
                    <a href="https://wa.me/<?php echo htmlspecialchars($profissional['whatsapp']); ?>" class="btn-whatsapp" target="_blank">WhatsApp</a>
                    <button class="btn-share" onclick="compartilhar('<?php echo htmlspecialchars($profissional['nome']); ?>', '<?php echo $profissional['id']; ?>')">Compartilhar</button>
                </div>
            <?php endforeach; ?>
        </div>
    </main>

    <?php include 'footer.php'; ?>

    <!-- Scripts para carregar a aplicação React -->
    <script src="/.gpt_engineer/index.js" type="module"></script>
    <script src="/src/main.jsx" type="module"></script>
    <script src="js/script.js"></script>
</body>
</html>