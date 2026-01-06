-- Populate database with your existing cars from the hardcoded data
-- This is a one-time migration to move existing cars into the database

INSERT INTO public.cars (title, make, model, year, price, mileage, fuel_type, transmission, body_type, engine_size, color, doors, seats, description, features, images, youtube_url, sold, featured)
VALUES 
  -- Mini Clubman
  ('Mini Clubman', 'Mini', 'Clubman', 2016, 9495, 67000, 'Diesel', 'Manual', 'Hatchback', '2.0L', 'White', 5, 5, 
   'A stylish and practical Mini Clubman with excellent fuel economy and modern features.',
   ARRAY['Bluetooth', 'Parking Sensors', 'Climate Control', 'Alloy Wheels'],
   ARRAY['https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/Mini%20clubman/IMG_3893.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/Mini%20clubman/IMG_3894.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/Mini%20clubman/IMG_3895.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/Mini%20clubman/IMG_3896.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/Mini%20clubman/IMG_3897.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/Mini%20clubman/IMG_3898.HEIC'],
   NULL, true, false),
  
  -- Mitsubishi L200
  ('Mitsubishi L200', 'Mitsubishi', 'L200', 2019, 13995, 61000, 'Diesel', 'Manual', 'Pickup', '2.4L', 'White', 4, 5,
   'Powerful and reliable pickup truck, perfect for work and leisure.',
   ARRAY['4x4', 'Leather Seats', 'Sat Nav', 'Reversing Camera', 'Tow Bar'],
   ARRAY['https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/L200/IMG_3903.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/L200/IMG_3904.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/L200/IMG_3905.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/L200/IMG_3906.HEIC', 'https://pub-4f4452db66dc43fb8c5cc527cc44b4f0.r2.dev/gjc500/L200/IMG_3907.HEIC'],
   'https://youtu.be/6iHSVAL3qKc', true, false);

-- Add more cars here following the same pattern
