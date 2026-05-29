-- Gronur Grocery — Products & categories (public catalog)
-- Run AFTER 001_initial_schema.sql

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read categories" ON public.categories;
CREATE POLICY "Anyone can read categories"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10, 2),
  unit TEXT NOT NULL DEFAULT 'kg',
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  subcategory TEXT,
  image TEXT NOT NULL,
  rating DECIMAL(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT TRUE,
  badge TEXT,
  nutrition JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read products" ON public.products;
CREATE POLICY "Anyone can read products"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);

DROP TRIGGER IF EXISTS products_updated_at ON public.products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Seed: categories
-- ---------------------------------------------------------------------------
INSERT INTO public.categories (id, name, icon, color, product_count) VALUES
  ('fruits', 'Fruits', 'Apple', 'bg-orange-100 text-orange-600', 8),
  ('vegetables', 'Vegetables', 'Carrot', 'bg-green-100 text-green-600', 6),
  ('dairy', 'Dairy', 'Milk', 'bg-blue-100 text-blue-600', 12),
  ('bakery', 'Bakery', 'Croissant', 'bg-amber-100 text-amber-600', 9),
  ('beverages', 'Beverages', 'Coffee', 'bg-red-100 text-red-600', 15),
  ('snacks', 'Snacks', 'Cookie', 'bg-purple-100 text-purple-600', 20)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  product_count = EXCLUDED.product_count;

-- ---------------------------------------------------------------------------
-- Seed: products (16 items from src/data/products.ts)
-- ---------------------------------------------------------------------------
INSERT INTO public.products (
  id, name, description, price, original_price, unit, category_id, subcategory,
  image, rating, reviews, in_stock, badge, nutrition
) VALUES
  ('1', 'Fresh Orange', 'Sweet and juicy oranges picked from the finest orchards. Rich in Vitamin C and perfect for fresh juice.', 14.75, 18.50, 'kg', 'fruits', 'citrus', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&auto=format&fit=crop', 4.8, 128, true, 'Popular', '{"calories":47,"protein":0.9,"carbs":12,"fat":0.1}'::jsonb),
  ('2', 'Red Apple', 'Crisp and sweet red apples. Perfect for snacking or baking.', 10.45, NULL, 'kg', 'fruits', 'pome', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop', 4.6, 95, true, 'Fresh', '{"calories":52,"protein":0.3,"carbs":14,"fat":0.2}'::jsonb),
  ('3', 'Strawberry', 'Fresh organic strawberries bursting with flavor.', 12.75, 15.00, 'kg', 'fruits', 'berries', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop', 4.9, 203, true, 'Best Seller', '{"calories":32,"protein":0.7,"carbs":8,"fat":0.3}'::jsonb),
  ('4', 'Dragon Fruit', 'Exotic dragon fruit with vibrant pink skin and sweet white flesh.', 45.35, NULL, 'kg', 'fruits', 'tropical', 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=500&auto=format&fit=crop', 4.3, 67, true, NULL, '{"calories":60,"protein":1.2,"carbs":13,"fat":0}'::jsonb),
  ('5', 'Fresh Lemon', 'Zesty fresh lemons perfect for cooking and beverages.', 11.75, NULL, 'kg', 'fruits', 'citrus', 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=500&auto=format&fit=crop', 4.5, 89, true, 'Organic', '{"calories":29,"protein":1.1,"carbs":9,"fat":0.3}'::jsonb),
  ('6', 'Watermelon', 'Sweet and refreshing watermelon, perfect for summer.', 11.35, 14.00, 'kg', 'fruits', 'melons', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop', 4.7, 156, true, 'Seasonal', '{"calories":30,"protein":0.6,"carbs":8,"fat":0.2}'::jsonb),
  ('7', 'Capsicum', 'Colorful bell peppers, crisp and fresh.', 22.65, NULL, 'kg', 'vegetables', 'peppers', 'https://images.unsplash.com/photo-1563565375-f3fdfdbbad0e?w=500&auto=format&fit=crop', 4.4, 78, true, NULL, '{"calories":31,"protein":1,"carbs":6,"fat":0.3}'::jsonb),
  ('8', 'Fresh Broccoli', 'Nutrient-rich broccoli florets, perfect for healthy meals.', 8.99, NULL, 'kg', 'vegetables', 'cruciferous', 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop', 4.6, 112, true, 'Healthy', '{"calories":34,"protein":2.8,"carbs":7,"fat":0.4}'::jsonb),
  ('9', 'Carrot', 'Sweet and crunchy carrots, rich in beta-carotene.', 6.50, NULL, 'kg', 'vegetables', 'root', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop', 4.5, 134, true, NULL, '{"calories":41,"protein":0.9,"carbs":10,"fat":0.2}'::jsonb),
  ('10', 'Spinach', 'Fresh baby spinach leaves, washed and ready to use.', 9.25, NULL, 'kg', 'vegetables', 'leafy', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop', 4.7, 98, true, 'Organic', '{"calories":23,"protein":2.9,"carbs":3.6,"fat":0.4}'::jsonb),
  ('11', 'Tomato', 'Ripe, juicy tomatoes perfect for salads and cooking.', 7.80, NULL, 'kg', 'vegetables', 'nightshade', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop', 4.6, 145, true, NULL, '{"calories":18,"protein":0.9,"carbs":3.9,"fat":0.2}'::jsonb),
  ('12', 'Cucumber', 'Crisp and refreshing cucumbers.', 5.40, NULL, 'kg', 'vegetables', 'gourd', 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a0?w=500&auto=format&fit=crop', 4.3, 87, true, NULL, '{"calories":15,"protein":0.7,"carbs":3.6,"fat":0.1}'::jsonb),
  ('13', 'Banana', 'Sweet ripe bananas, perfect energy snack.', 4.99, NULL, 'kg', 'fruits', 'tropical', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop', 4.8, 234, true, 'Popular', '{"calories":89,"protein":1.1,"carbs":23,"fat":0.3}'::jsonb),
  ('14', 'Grapes', 'Sweet seedless grapes, perfect for snacking.', 16.50, NULL, 'kg', 'fruits', 'berries', 'https://images.unsplash.com/photo-1537640538965-1756cd58090e?w=500&auto=format&fit=crop', 4.5, 167, true, NULL, '{"calories":69,"protein":0.7,"carbs":18,"fat":0.2}'::jsonb),
  ('15', 'Mango', 'Sweet and juicy tropical mangoes.', 18.75, NULL, 'kg', 'fruits', 'tropical', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop', 4.9, 189, true, 'Best Seller', '{"calories":60,"protein":0.8,"carbs":15,"fat":0.4}'::jsonb),
  ('16', 'Pineapple', 'Sweet and tangy fresh pineapple.', 13.50, NULL, 'kg', 'fruits', 'tropical', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&auto=format&fit=crop', 4.6, 134, true, NULL, '{"calories":50,"protein":0.5,"carbs":13,"fat":0.1}'::jsonb)
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
