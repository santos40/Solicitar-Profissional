function compartilhar(nome, id) {
    const texto = `Confira o perfil de ${nome} no ViaWhatsApp: https://viawhatsapp.com/perfil.php?id=${id}`;
    if (navigator.share) {
        navigator.share({
            title: 'ViaWhatsApp - Profissional',
            text: texto,
            url: `https://viawhatsapp.com/perfil.php?id=${id}`,
        })
        .then(() => console.log('Conteúdo compartilhado com sucesso'))
        .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
        // Fallback para navegadores que não suportam a API Web Share
        window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
    }
}