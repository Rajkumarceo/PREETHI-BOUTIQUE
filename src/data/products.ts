export type Product = {
  id: string;
  brand: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  badge?: string;
  image: string;
  category: string;
  fabric: string;
};

const uniqueImages = [
  "/peach_gold_dress_1.png",
  "/peach_gold_saree_2.png",
  "/peach_gold_lehenga_3.png",
  "/peach_gold_kurta_4.png",
  "/peach_gold_anarkali_5.png",
  "/peach_gold_bottoms_6.png",
  "/ethnic_wear_render_1_1778589999727.png",
  "/ethnic_wear_render_2_1778590015048.png",
  "/ethnic_wear_render_3_1778590032162.png",
  "/product_a_pink_anarkali.png",
  "/product_b_obsidian_saree.png",
  "/product_c_sandal_coord.png",
  "/ethnic_wear_render_4_1778590051580.png",
  "/ethnic_wear_render_5_1778590070970.png",
  "/ethnic_wear_render_6_1778590086803.png",
  "/product_anarkali.png",
  "/product_lehenga_chikankari.png",
  "/product_saree_silk.png",
  "/product_velvet.png",
  "/boutique 3.jpg",
  "/boutique 5.jpg",
  "/boutique 6.jpg",
  "/boutique 7.jpg",
  "/boutique 8.jpg"
];

export const products: Product[] = uniqueImages.map((image, i) => {
  const brands = [
    "Preethi Signature", "Avira Label", "Zari Studio", "Preethi Signature", "Avira Label", "Zari Studio", "Preethi Signature", "Avira Label", "Zari Studio", "Preethi Signature", "Avira Label", "Zari Studio",
    "Maharani Edit", "Avira Label", "Zari Studio", "Royal Threads", "Preethi Signature", "Silk Route", "Velvet Dreams", "Avira Label", "Zari Studio", "Heritage Weaves", "Preethi Signature", "Avira Label"
  ];
  const fabrics = [
    "Pure Silk", "Banarasi", "Georgette", "Cotton Blend", "Georgette", "Cotton Blend", "Chanderi", "Organza", "Silk Blend", "Velvet", "Georgette", "Linen",
    "Chanderi", "Net", "Organza", "Silk Blend", "Chikankari", "Pure Silk", "Velvet", "Cotton", "Georgette", "Banarasi", "Silk Blend", "Linen"
  ];
  const categories = [
    "Suits", "Sarees", "Lehenga", "Kurtas", "Anarkali", "Bottoms", "Suits", "Sarees", "Lehenga", "Kurtas", "Sarees", "Co-ords",
    "Lehenga", "Anarkali", "Sarees", "Suits", "Lehenga", "Sarees", "Kurtas", "Bottoms", "Suits", "Sarees", "Co-ords", "Kurtas"
  ];
  
  const originalPrice = 4000 + ((i * 137) % 15000);
  const discount = 10 + ((i * 17) % 40);
  const salePrice = Math.floor(originalPrice * (1 - discount / 100));
  
  return {
    id: `prod_${i}`,
    brand: brands[i],
    name: `${fabrics[i]} Designer Ensemble`,
    originalPrice,
    salePrice,
    discountPercentage: discount,
    badge: i === 0 ? "Bestseller" : i === 2 ? "New Launch" : i === 8 ? "Premium Edit" : i === 15 ? "Limited Edition" : undefined,
    image,
    category: categories[i],
    fabric: fabrics[i]
  };
});
