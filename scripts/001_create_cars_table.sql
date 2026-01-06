-- Create cars table to store all vehicle listings
CREATE TABLE IF NOT EXISTS public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  fuel_type TEXT NOT NULL,
  transmission TEXT NOT NULL,
  body_type TEXT,
  engine_size TEXT,
  color TEXT,
  doors INTEGER,
  seats INTEGER,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  youtube_url TEXT,
  sold BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all cars
CREATE POLICY "cars_public_read"
  ON public.cars FOR SELECT
  USING (true);

-- For now, allow all authenticated users to manage cars
-- Later you can restrict this to admin users only
CREATE POLICY "cars_authenticated_all"
  ON public.cars FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS cars_sold_idx ON public.cars(sold);
CREATE INDEX IF NOT EXISTS cars_featured_idx ON public.cars(featured);
CREATE INDEX IF NOT EXISTS cars_created_at_idx ON public.cars(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
