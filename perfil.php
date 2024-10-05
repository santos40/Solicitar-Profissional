<?php
session_start();
include 'config.php';
include 'functions.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    header('Location: index.php');
    exit;
}

$profissional = getProfissionalById($conn, $id);
if (!$profissional) {
    header('Location: index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $profissional['nome']; ?> - ViaWhatsApp</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <main>
        <div class="perfil-container">
            <img src="<?php echo $profissional['logo']; ?>" alt="<?php echo $profissional['nome']; ?>" class="perfil-logo">
            <h1><?php echo $profissional['nome']; ?></h1>
            <p class="categoria"><?php echo $profissional['categoria']; ?> - <?php echo $profissional['cidade']; ?></p>
            <p class="descricao"><?php echo $profissional['descricao']; ?></p>
            
            <div class="contato-info">
                <a href="https://wa.me/<?php echo $profissional['whatsapp']; ?>" class="btn-whatsapp" target="_blank">Contatar via WhatsApp</a>
                <?php if ($profissional['youtube']): ?>
                    <a href="<?php echo $profissional['youtube']; ?>" target="_blank" class="btn-social">YouTube</a>
                <?php endif; ?>
                <?php if ($profissional['instagram']): ?>
                    <a href="https://instagram.com/<?php echo $profissional['instagram']; ?>" target="_blank" class="btn-social">Instagram</a>
                <?php endif; ?>
                <?php if ($profissional['website']): ?>
                    <a href="<?php echo $profissional['website']; ?>" target="_blank" class="btn-social">Website</a>
                <?php endif; ?>
            </div>
            
            <button class="btn-share" onclick="compartilhar('<?php echo $profissional['nome']; ?>', '<?php echo $profissional['id']; ?>')">Compartilhar Perfil</button>
        </div>
    </main>

    <?php include 'footer.php'; ?>

    <script src="js/script.js"></script>
</body>
</html>