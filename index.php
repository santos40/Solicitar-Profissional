<?php
session_start();
include 'config.php';
include 'functions.php';

$page_title = "ViaWhatsApp - Portal de Profissionais da Construção e Limpeza";
$page_description = "Encontre profissionais qualificados da construção e limpeza. Conecte-se diretamente via WhatsApp.";

$profissionais = getProfissionais($conn);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?></title>
    <meta name="description" content="<?php echo $page_description; ?>">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <main>
        <h1>Bem-vindo ao ViaWhatsApp</h1>
        <p>Encontre os melhores profissionais da construção e limpeza.</p>

        <form action="pesquisa.php" method="GET" class="search-form">
            <input type="text" name="q" placeholder="Pesquisar por nome, categoria ou cidade">
            <button type="submit">Pesquisar</button>
        </form>

        <div class="profissionais-grid">
            <?php foreach ($profissionais as $profissional): ?>
                <div class="profissional-card">
                    <img src="<?php echo $profissional['logo']; ?>" alt="<?php echo $profissional['nome']; ?>">
                    <h2><?php echo $profissional['nome']; ?></h2>
                    <p><?php echo $profissional['categoria']; ?> - <?php echo $profissional['cidade']; ?></p>
                    <p><?php echo substr($profissional['descricao'], 0, 100); ?>...</p>
                    <a href="perfil.php?id=<?php echo $profissional['id']; ?>" class="btn-perfil">Ver Perfil</a>
                    <a href="https://wa.me/<?php echo $profissional['whatsapp']; ?>" class="btn-whatsapp" target="_blank">
                        WhatsApp
                    </a>
                    <button class="btn-share" onclick="compartilhar('<?php echo $profissional['nome']; ?>', '<?php echo $profissional['id']; ?>')">Compartilhar</button>
                </div>
            <?php endforeach; ?>
        </div>
    </main>

    <?php include 'footer.php'; ?>

    <script src="js/script.js"></script>
</body>
</html>