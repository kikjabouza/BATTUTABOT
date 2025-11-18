// src/utils/importAllImages.js
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => { 
    images[item.replace('./', '')] = r(item); 
  });
  return images;
}

// Importe toutes les images du dossier
const images = importAll(
  require.context('@/assets/', true, /\.(jpg|jpeg|png|gif|svg|webp)$/)
);

export default images;