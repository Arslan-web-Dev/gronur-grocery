import fs from 'fs'

const items = [
  ['1', 'Fresh Orange', 'Sweet and juicy oranges rich in Vitamin C.', 14.75, 18.5, 'fruits', 'citrus', 'photo-1547514701-42782101795e', 4.8, 128, 'Popular', 'kg'],
  ['2', 'Red Apple', 'Crisp and sweet red apples for snacking or baking.', 10.45, null, 'fruits', 'pome', 'photo-1560806887-1e4cd0b6cbd6', 4.6, 95, 'Fresh', 'kg'],
  ['3', 'Strawberry', 'Fresh organic strawberries bursting with flavor.', 12.75, 15, 'fruits', 'berries', 'photo-1464965911861-746a04b4bca6', 4.9, 203, 'Best Seller', 'kg'],
  ['4', 'Dragon Fruit', 'Exotic dragon fruit with sweet white flesh.', 45.35, null, 'fruits', 'tropical', 'photo-1527325678964-54921661f888', 4.3, 67, null, 'kg'],
  ['5', 'Fresh Lemon', 'Zesty lemons for cooking and beverages.', 11.75, null, 'fruits', 'citrus', 'photo-1590502593747-42a996133562', 4.5, 89, 'Organic', 'kg'],
  ['6', 'Watermelon', 'Sweet refreshing watermelon for summer.', 11.35, 14, 'fruits', 'melons', 'photo-1587049352846-4a222e784d38', 4.7, 156, 'Seasonal', 'kg'],
  ['7', 'Capsicum', 'Colorful crisp bell peppers.', 22.65, null, 'vegetables', 'peppers', 'photo-1563565375-f3fdfdbbad0e', 4.4, 78, null, 'kg'],
  ['8', 'Fresh Broccoli', 'Nutrient-rich broccoli florets.', 8.99, null, 'vegetables', 'cruciferous', 'photo-1459411621453-7b03977f4bfc', 4.6, 112, 'Healthy', 'kg'],
  ['9', 'Carrot', 'Sweet crunchy carrots rich in beta-carotene.', 6.5, null, 'vegetables', 'root', 'photo-1598170845058-32b9d6a5da37', 4.5, 134, null, 'kg'],
  ['10', 'Spinach', 'Fresh baby spinach leaves ready to use.', 9.25, null, 'vegetables', 'leafy', 'photo-1576045057995-568f588f82fb', 4.7, 98, 'Organic', 'kg'],
  ['11', 'Tomato', 'Ripe juicy tomatoes for salads and cooking.', 7.8, null, 'vegetables', 'nightshade', 'photo-1592924357228-91a4daadcfea', 4.6, 145, null, 'kg'],
  ['12', 'Cucumber', 'Crisp refreshing cucumbers.', 5.4, null, 'vegetables', 'gourd', 'photo-1449300079323-02e209d9d3a0', 4.3, 87, null, 'kg'],
  ['13', 'Banana', 'Sweet ripe bananas perfect energy snack.', 4.99, null, 'fruits', 'tropical', 'photo-1571771894821-ce9b6c11b08e', 4.8, 234, 'Popular', 'kg'],
  ['14', 'Grapes', 'Sweet seedless grapes for snacking.', 16.5, null, 'fruits', 'berries', 'photo-1537640538965-1756cd58090e', 4.5, 167, null, 'kg'],
  ['15', 'Mango', 'Sweet juicy tropical mangoes.', 18.75, null, 'fruits', 'tropical', 'photo-1553279768-865429fa0078', 4.9, 189, 'Best Seller', 'kg'],
  ['16', 'Pineapple', 'Sweet tangy fresh pineapple.', 13.5, null, 'fruits', 'tropical', 'photo-1550258987-190a2d41a8ba', 4.6, 134, null, 'kg'],
  ['17', 'Kiwi', 'Tangy green kiwi packed with vitamin C.', 8.99, null, 'fruits', 'tropical', 'photo-1585059896004-aa1aa899b1c8', 4.5, 112, null, 'kg'],
  ['18', 'Avocado', 'Creamy ripe Hass avocados.', 12.25, 14.5, 'fruits', 'tropical', 'photo-1523049673857-eb18f1d7b578', 4.7, 198, 'Popular', 'kg'],
  ['19', 'Blueberry', 'Plump sweet blueberries antioxidant rich.', 15.5, null, 'fruits', 'berries', 'photo-1498557850523-fd3d118b962e', 4.8, 176, null, 'kg'],
  ['20', 'Peach', 'Juicy fragrant peaches in season.', 9.75, null, 'fruits', 'pome', 'photo-1639668456909-06074e22772d', 4.6, 89, 'Seasonal', 'kg'],
  ['21', 'Pear', 'Soft buttery pears naturally sweet.', 8.45, null, 'fruits', 'pome', 'photo-1615484477861-315698f2f654', 4.4, 67, null, 'kg'],
  ['22', 'Cherry', 'Dark sweet cherries hand picked.', 19.99, 24, 'fruits', 'berries', 'photo-1528821120929-79f2a38ea163', 4.7, 143, null, 'kg'],
  ['23', 'Pomegranate', 'Ruby arils bursting with antioxidants.', 11.25, null, 'fruits', 'tropical', 'photo-1615485929416-f3839b4b2bb0', 4.5, 98, null, 'kg'],
  ['24', 'Papaya', 'Tropical papaya soft and sweet.', 7.65, null, 'fruits', 'tropical', 'photo-1615485929416-f3839b4b2bb0', 4.3, 54, null, 'kg'],
  ['25', 'Potato', 'Versatile russet potatoes for every meal.', 4.25, null, 'vegetables', 'root', 'photo-1518977676601-b53f82aba655', 4.5, 210, null, 'kg'],
  ['26', 'Red Onion', 'Mild sweet red onions.', 3.85, null, 'vegetables', 'root', 'photo-1518977676601-b53f82aba655', 4.4, 156, null, 'kg'],
  ['27', 'Fresh Garlic', 'Aromatic garlic bulbs farm fresh.', 6.2, null, 'vegetables', 'root', 'photo-1618379882422-aa27137c1c0c', 4.6, 88, 'Organic', 'kg'],
  ['28', 'Iceberg Lettuce', 'Crunchy lettuce heads for salads.', 3.5, null, 'vegetables', 'leafy', 'photo-1622206151226-18ca0c9ab4a1', 4.2, 76, null, 'kg'],
  ['29', 'Cauliflower', 'White cauliflower florets low carb favorite.', 7.15, null, 'vegetables', 'cruciferous', 'photo-1568584711075-2632fbf25f80', 4.5, 92, null, 'kg'],
  ['30', 'Zucchini', 'Tender green zucchini squash.', 5.95, null, 'vegetables', 'gourd', 'photo-1595970888500-54e535b07b66', 4.4, 81, null, 'kg'],
  ['31', 'Eggplant', 'Glossy purple eggplant for grilling.', 6.75, null, 'vegetables', 'nightshade', 'photo-1659261201940-82f26166bc17', 4.3, 64, null, 'kg'],
  ['32', 'Sweet Corn', 'Sweet corn on the cob.', 4.5, null, 'vegetables', 'gourd', 'photo-1551758558-6c0417bb8d8b', 4.7, 132, 'Seasonal', 'kg'],
  ['33', 'Green Beans', 'Snap green beans crisp and fresh.', 6.85, null, 'vegetables', 'legume', 'photo-1595970888500-54e535b07b66', 4.5, 97, null, 'kg'],
  ['34', 'Asparagus', 'Tender asparagus spears premium grade.', 14.25, null, 'vegetables', 'stalk', 'photo-1615484477861-315698f2f654', 4.6, 71, 'Fresh', 'kg'],
  ['35', 'Whole Milk', 'Farm fresh vitamin D whole milk.', 3.49, null, 'dairy', 'milk', 'photo-1563636619-e9143da7973b', 4.7, 312, null, 'L'],
  ['36', 'Greek Yogurt', 'Thick protein rich plain Greek yogurt.', 5.99, null, 'dairy', 'yogurt', 'photo-1488477181946-6428a0291777', 4.8, 245, 'Popular', 'pack'],
  ['37', 'Cheddar Cheese', 'Sharp aged cheddar block.', 7.49, 8.99, 'dairy', 'cheese', 'photo-1486297678162-eb2a19b0a32d', 4.6, 178, null, 'pack'],
  ['38', 'Unsalted Butter', 'European style unsalted butter.', 4.99, null, 'dairy', 'milk', 'photo-1589985270523-2174b04b41d5', 4.7, 201, null, 'pack'],
  ['39', 'Free Range Eggs', 'Large brown free range eggs.', 5.49, null, 'dairy', 'eggs', 'photo-1582722879805-aaf01f17a8e0', 4.9, 389, 'Best Seller', 'dozen'],
  ['40', 'Cottage Cheese', 'Low fat cottage cheese creamy.', 4.25, null, 'dairy', 'cheese', 'photo-1488477181946-6428a0291777', 4.4, 134, null, 'pack'],
  ['41', 'Almond Milk', 'Unsweetened almond milk dairy free.', 4.29, null, 'dairy', 'milk', 'photo-1563636619-e9143da7973b', 4.5, 167, 'Organic', 'L'],
  ['42', 'Heavy Cream', 'Rich heavy whipping cream.', 5.15, null, 'dairy', 'milk', 'photo-1563636619-e9143da7973b', 4.6, 98, null, 'L'],
  ['43', 'Mozzarella', 'Fresh mozzarella ball for pizza.', 6.75, null, 'dairy', 'cheese', 'photo-1486297678162-eb2a19b0a32d', 4.7, 156, null, 'pack'],
  ['44', 'Sourdough Bread', 'Artisan sourdough loaf crusty outside.', 5.99, null, 'bakery', 'bread', 'photo-1509440159596-0249088772ff', 4.8, 267, 'Popular', 'loaf'],
  ['45', 'Butter Croissant', 'Flaky buttery French croissants.', 3.49, null, 'bakery', 'pastry', 'photo-1555507036-ab1f4038808a', 4.7, 198, null, 'pack'],
  ['46', 'Everything Bagels', 'Fresh baked everything bagels six pack.', 4.99, null, 'bakery', 'bread', 'photo-1509440159596-0249088772ff', 4.6, 145, null, 'pack'],
  ['47', 'Blueberry Muffin', 'Moist muffins loaded with blueberries.', 2.99, null, 'bakery', 'pastry', 'photo-1555507036-ab1f4038808a', 4.5, 112, null, 'pack'],
  ['48', 'Whole Wheat Bread', 'Soft whole wheat sandwich bread.', 3.79, null, 'bakery', 'bread', 'photo-1509440159596-0249088772ff', 4.4, 189, null, 'loaf'],
  ['49', 'Ciabatta Roll', 'Italian ciabatta rolls four pack.', 4.49, null, 'bakery', 'bread', 'photo-1509440159596-0249088772ff', 4.6, 87, null, 'pack'],
  ['50', 'Banana Bread', 'Homestyle banana bread loaf.', 6.25, null, 'bakery', 'pastry', 'photo-1555507036-ab1f4038808a', 4.7, 134, null, 'loaf'],
  ['51', 'Orange Juice', 'Fresh squeezed style orange juice.', 4.99, null, 'beverages', 'juice', 'photo-1621506289667-efbc12c6dfbc', 4.6, 223, null, 'L'],
  ['52', 'Organic Green Tea', 'Premium organic green tea bags.', 6.49, null, 'beverages', 'tea', 'photo-1544145945-f90425340c7e', 4.5, 156, 'Organic', 'box'],
  ['53', 'Cold Brew Coffee', 'Smooth cold brew ready to drink.', 5.99, 6.99, 'beverages', 'coffee', 'photo-1514431164617-a09d994a2ddc', 4.8, 298, 'Popular', 'bottle'],
  ['54', 'Coconut Water', 'Pure coconut water electrolytes.', 3.99, null, 'beverages', 'water', 'photo-1544145945-f90425340c7e', 4.6, 187, null, 'L'],
  ['55', 'Sparkling Water', 'Naturally sparkling mineral water.', 2.49, null, 'beverages', 'water', 'photo-1544145945-f90425340c7e', 4.4, 245, null, 'pack'],
  ['56', 'Mixed Nuts', 'Roasted unsalted mixed nuts.', 9.99, null, 'snacks', 'nuts', 'photo-1599599810769-0c0d0e49b2e0', 4.7, 312, 'Popular', 'pack'],
  ['57', 'Dark Chocolate', '72 percent dark chocolate bar.', 3.49, null, 'snacks', 'bars', 'photo-1511381939415-44080a27e27f', 4.8, 198, null, 'pack'],
  ['58', 'Potato Chips', 'Classic sea salt kettle chips.', 3.29, null, 'snacks', 'chips', 'photo-1566478989037-6d399f1c1f08', 4.5, 421, null, 'pack'],
  ['59', 'Granola Bars', 'Chewy oats and honey granola bars.', 5.49, null, 'snacks', 'bars', 'photo-1599599810769-0c0d0e49b2e0', 4.6, 267, null, 'box'],
  ['60', 'Trail Mix', 'Energy trail mix with dried fruit.', 7.25, null, 'snacks', 'nuts', 'photo-1599599810769-0c0d0e49b2e0', 4.7, 189, null, 'pack'],
  ['61', 'Pretzels', 'Crunchy salted pretzel twists.', 2.99, null, 'snacks', 'chips', 'photo-1566478989037-6d399f1c1f08', 4.4, 156, null, 'pack'],
  ['62', 'Protein Bars', 'Chocolate chip high protein bars.', 8.99, null, 'snacks', 'bars', 'photo-1599599810769-0c0d0e49b2e0', 4.6, 234, 'Healthy', 'box'],
  ['63', 'Popcorn', 'Microwave butter popcorn three pack.', 4.49, null, 'snacks', 'chips', 'photo-1566478989037-6d399f1c1f08', 4.3, 178, null, 'pack'],
]

const nutritionDefaults = [
  { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { calories: 32, protein: 0.7, carbs: 8, fat: 0.3 },
]

const products = items.map((row, i) => {
  const [id, name, description, price, originalPrice, category, subcategory, photo, rating, reviews, badge, unit] = row
  const product = {
    id,
    name,
    description,
    price: Number(price),
    unit,
    category,
    subcategory,
    image: `https://images.unsplash.com/${photo}?w=500&auto=format&fit=crop`,
    rating: Number(rating),
    reviews: Number(reviews),
    inStock: true,
    nutrition: nutritionDefaults[i % nutritionDefaults.length],
  }
  if (originalPrice != null) product.originalPrice = Number(originalPrice)
  if (badge) product.badge = badge
  return product
})

const counts = {}
for (const p of products) counts[p.category] = (counts[p.category] || 0) + 1

const categories = [
  ['fruits', 'Fruits', 'Apple', 'bg-orange-100 text-orange-600'],
  ['vegetables', 'Vegetables', 'Carrot', 'bg-green-100 text-green-600'],
  ['dairy', 'Dairy', 'Milk', 'bg-blue-100 text-blue-600'],
  ['bakery', 'Bakery', 'Croissant', 'bg-amber-100 text-amber-600'],
  ['beverages', 'Beverages', 'Coffee', 'bg-red-100 text-red-600'],
  ['snacks', 'Snacks', 'Cookie', 'bg-purple-100 text-purple-600'],
].map(([id, name, icon, color]) => ({
  id,
  name,
  icon,
  color,
  productCount: counts[id] || 0,
}))

fs.writeFileSync('src/data/products.json', JSON.stringify({ products, categories }, null, 2))

const esc = (s) => String(s).replace(/'/g, "''")
const sqlValues = products.map((p) => {
  const op = p.originalPrice != null ? p.originalPrice : 'NULL'
  const bd = p.badge ? `'${esc(p.badge)}'` : 'NULL'
  const nut = JSON.stringify(p.nutrition).replace(/'/g, "''")
  return `  ('${p.id}', '${esc(p.name)}', '${esc(p.description)}', ${p.price}, ${op}, '${p.unit}', '${p.category}', '${p.subcategory}', '${p.image}', ${p.rating}, ${p.reviews}, true, ${bd}, '${nut}'::jsonb)`
})

const catSql = categories
  .map((c) => `  ('${c.id}', '${esc(c.name)}', '${c.icon}', '${c.color}', ${c.productCount})`)
  .join(',\n')

const sql = `-- Auto-generated: ${products.length} products (run in Supabase SQL Editor)
-- Requires 002_products_schema.sql tables to exist first

INSERT INTO public.categories (id, name, icon, color, product_count) VALUES
${catSql}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  product_count = EXCLUDED.product_count;

INSERT INTO public.products (
  id, name, description, price, original_price, unit, category_id, subcategory,
  image, rating, reviews, in_stock, badge, nutrition
) VALUES
${sqlValues.join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  unit = EXCLUDED.unit,
  category_id = EXCLUDED.category_id,
  subcategory = EXCLUDED.subcategory,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  in_stock = EXCLUDED.in_stock,
  badge = EXCLUDED.badge,
  nutrition = EXCLUDED.nutrition;
`

fs.writeFileSync('supabase/migrations/003_seed_products.sql', sql)
console.log(`Generated ${products.length} products`, counts)
