import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ExternalLink, 
  Heart, 
  Palette, 
  ShoppingBag, 
  Instagram, 
  ArrowRight, 
  Check, 
  Send, 
  Share2,
  Bookmark, 
  Music2, 
  Info, 
  Mail, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "./assets/logo.jpg";
import logoSymbol from "./assets/logo-symbol.png";
import heroPatternBanner from "./assets/images/hero_pattern_banner.jpg";
import underTheSea from "./assets/under-the-sea.jpeg";


// Types
interface PatternItem {
  id: string;
  title: string;
  category: "Fabric" | "Wallpaper" | "Product";
  description: string;
  image: string;
  palette: { name: string; hex: string }[];
  marketplaceLinks: {
    spoonflower?: string;
    redbubble?: string;
    zazzle?: string;
    creativeMarket?: string;
  };
  details: string;
  featured?: boolean;
}

// Custom Rub el Hizb (8-pointed Islamic Star) Icon Component
const GeometricStar = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={`${className} text-brand-gold fill-none stroke-current`} 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="2.5" className="fill-brand-gold/10" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" transform="rotate(0 12 12)" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" transform="rotate(45 12 12)" />
  </svg>
);

// Elegant Section Divider with 8-pointed star and horizontal gradient borders
const StarDivider = () => (
  <div className="flex items-center justify-center gap-4 my-12" id="star-divider">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-gold/50 to-brand-gold"></div>
    <GeometricStar className="w-5 h-5 animate-spin-slow text-brand-gold" />
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-brand-gold/50 to-brand-gold"></div>
  </div>
);

// Mock Data
const PORTFOLIO_DATA: PatternItem[] = [
  {
  id: "mughal-garden",
  title: "Mughal Garden",
  category: "Fabric",
  details: "Rich cobalt blue storytelling in classic Toile de Jouy style — an ornate architectural pavilion surrounded by majestic peacocks, palm trees, and delicate birds, capturing timeless heritage elegance.",
  image: "/src/assets/images/1316a.jpg",
  featured: true,
  designId: "19470156",
  marketplaceLinks: {
    spoonflower: "https://www.spoonflower.com/profiles/snadiacreations",
    creativeMarket: "https://creativemarket.com/snadiacreations"
  }
},
    
  {
    id: "flora-deco-neoclassical-floral-frame",
    title: "Flora Deco - Neoclassical Floral Frame Lilac Aqua Blue",
    category: "wallpaper",
    description: "Bright neoclassical floral bouquet framed by elegant scrollwork. Vibrant cool-toned palette of lilac, light lavender, ice blue, and aqua. Perfect for grandmillennial interiors, whimsical nurseries, and preppy maximalist bedroom spaces.",
    image: "/src/assets/images/2164.jpg",
    featured: false,
    designId: "22752519",
    marketplaceLinks: {
      spoonflower: "https://www.spoonflower.com/profiles/snadiacreations",
      creativeMarket: "https://creativemarket.com/snadiacreations"
    },
    details: "A bright neoclassical bouquet framed by elegant scrollwork, designed for grandmillennial interiors, whimsical nurseries, and preppy maximalist bedroom spaces."},
 {
  id: "studio-geo-art-deco-tribal-stripe",
  title: "Studio Geo - Art Deco Geometric Tribal Stripe Gold Teal",
  category: "Fabric",
  description: "Bold geometric pattern featuring horizontal bands of interlocking triangles, chevrons, and intricate linear motifs. Sophisticated dark palette of deep teal, sage green, and warm gold. Ideal for modern eclectic interiors, statement wallpaper, and stylish home decor.",
  details: "Bold geometric pattern featuring horizontal bands of interlocking triangles, chevrons, and intricate linear motifs. Sophisticated dark palette of deep teal, sage green, and warm gold. Ideal for modern eclectic interiors, statement wallpaper, and stylish home decor.",
  image: "/src/assets/images/1800a.jpg",
  featured: false,
  designId: "20382578",
  marketplaceLinks: {
    spoonflower: "https://www.spoonflower.com/profiles/snadiacreations",
    creativeMarket: "https://creativemarket.com/snadiacreations"
  }
},
  {
  id: "crustacean-core-nautical-print",
  title: "Crustacean Core Design",
  category: "Product",
  description: "Playful nautical pattern featuring textured red prawns, ship steering wheels, anchors, and intertwined ropes. Warm vintage color palette of sandy beige, rust red, and tan. Perfect for coastal kitchens, seaside homes, and themed decor.",
  details: "Playful nautical pattern featuring textured red prawns, ship steering wheels, anchors, and intertwined ropes. Warm vintage color palette of sandy beige, rust red, and tan. Perfect for coastal kitchens, seaside homes, and themed decor.",
  image: "/src/assets/images/1.jpeg",
  featured: false,
  marketplaceLinks: {
    zazzle: "https://www.zazzle.com/store/snadiacreations"
  }
},
  {
  id: "studio-wild-eclectic-animal-print-collage",
  title: "Studio Wild - Eclectic Mixed Animal Print Collage Blue Pink",
  category: "Fabric",
  description: "Whimsical collage pattern featuring a mix of abstracted animal prints including leopard spots, tiger stripes, and mosaic patches. Playful multi-color palette of sky blue, plum, magenta, and lime green. Perfect for bold eclectic interiors and creative fashion.",
  details: "Whimsical collage pattern featuring a mix of abstracted animal prints including leopard spots, tiger stripes, and mosaic patches. Playful multi-color palette of sky blue, plum, magenta, and lime green. Perfect for bold eclectic interiors and creative fashion.",
  image: "/src/assets/images/1800.jpeg",
  featured: false,
  designId: "20389332",
  marketplaceLinks: {
    spoonflower: "https://www.spoonflower.com/profiles/snadiacreations",
    creativeMarket: "https://creativemarket.com/snadiacreations"
  }
},
  {
  id: "celestial-geometric-tile",
  title: "Peach Plaid Grid Nursery Minimalist Check Pattern",
  category: "Product",
  description: "Soft peach plaid check pattern featuring minimal grid lines and warm cream tones. Ideal for gender-neutral modern nurseries, cozy farmhouse kids rooms, and playful interior spaces.",
  details: "Soft peach plaid check pattern featuring minimal grid lines and warm cream tones. Ideal for gender-neutral modern nurseries, cozy farmhouse kids rooms, and playful interior spaces.",
  image: "/src/assets/images/1164.jpeg",
  featured: false,
  marketplaceLinks: {
  redbubble: "https://www.redbubble.com/people/nadiacreativity"
  }
},

  {
  id: "studio-forest-vintage-owl-botanical",
  title: "Studio Forest - Vintage Owl Botanical Symmetrical Cream Brown",
  category: "Wallpaper",
  description: "Whimsical botanical pattern featuring majestic owls with expansive feathered wings framed by symmetrical scrolling vines and delicate flowers. Earthy palette of warm caramel, sage green, and cream. Perfect for cozy nature-inspired spaces and eclectic home decor.",
  details: "Whimsical botanical pattern featuring majestic owls with expansive feathered wings framed by symmetrical scrolling vines and delicate flowers. Earthy palette of warm caramel, sage green, and cream. Perfect for cozy nature-inspired spaces and eclectic home decor.",
  image: "/src/assets/images/1639.jpeg",
  featured: false,
  designId: "20034037",
  marketplaceLinks: {
    spoonflower: "https://www.spoonflower.com/profiles/snadiacreations",
    creativeMarket: "https://creativemarket.com/snadiacreations"
  }
},

 {
  id: "redbubble-lifestyle-collection",
  title: "Botanical & Celestial Print Collection",
  category: "Product",
  description: "A curated mix of nature-inspired designs — minimalist leaf line art, a celestial sun burst, a delicate wildflower, and festive holiday artwork — applied across apparel, accessories, and stationery.",
  details: "A curated mix of nature-inspired designs — minimalist leaf line art, a celestial sun burst, a delicate wildflower, and festive holiday artwork — applied across apparel, accessories, and stationery. Available on t-shirts, bucket hats, water bottles, and postcards.",
  image: "/src/assets/images/2.jpeg",
  featured: false,
  marketplaceLinks: {
    redbubble: "https://www.redbubble.com/people/nadiacreativity"
  }
},

{
  id: "zazzle-backpack-collection",
  title: "Playful Print Backpack Collection",
  category: "Product",
  description: "A vibrant range of backpack designs — florals, dolphins, jellyfish, and abstract textures — applied to functional, everyday bags for kids and adults alike.",
  details: "A vibrant range of backpack designs — florals, dolphins, jellyfish, and abstract textures — applied to functional, everyday bags for kids and adults alike. Available in multiple colorways with customizable name options.",
  image: "/src/assets/images/3.jpeg",
  featured: false,
  marketplaceLinks: {
    zazzle: "https://www.zazzle.com/store/snadiacreations"
  }
},

];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Fabric" | "Wallpaper" | "Product">("All");
  const [selectedItem, setSelectedItem] = useState<PatternItem | null>(null);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  
  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", message: "", interest: "Licensing" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Filter logic
  const filteredPatterns = activeCategory === "All" 
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(item => item.category === activeCategory);

  // Toggle like
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Copy hex code to clipboard
  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Form submit handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill out all fields.");
      return;
    }
    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    
    setFormError("");
    setFormSubmitted(true);
    setFormData({ name: "", email: "", message: "", interest: "Licensing" });
    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  // Track scrolling to activate navigation highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "portfolio", "shop", "about", "contact"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-gold-light selection:bg-brand-gold selection:text-brand-dark font-sans" id="home">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-brand-dark/90 border-b border-brand-gold/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group text-left cursor-pointer"
            id="brand-logo"
          >
            <img 
            src={logo} 
            alt="Snadia Creations Logo" 
           className="w-26 h-26 object-contain rounded-full"
            />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-white block">
                Snadia
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold block font-medium -mt-1">
                Creations
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            {[
              { id: "home", label: "Home" },
              { id: "portfolio", label: "Portfolio" },
              { id: "shop", label: "Shop Links" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-2 text-xs transition-colors duration-300 cursor-pointer ${
                  activeNav === item.id ? "text-brand-gold font-semibold" : "text-gray-400 hover:text-white"
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
                {activeNav === item.id && (
                  <motion.div 
                    layoutId="activeUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* External Marketplace Launcher Quick Link */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollToSection("shop")}
              className="flex items-center gap-2 border border-brand-gold/30 hover:border-brand-gold px-4 py-2 text-xs uppercase tracking-widest font-medium rounded-full text-brand-gold hover:bg-brand-gold/5 transition-all duration-300 cursor-pointer"
              id="header-shop-btn"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Shop Now
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-gold hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-30 bg-brand-dark/95 border-b border-brand-gold/20 shadow-2xl p-6 md:hidden flex flex-col gap-5 text-center backdrop-blur-lg"
            id="mobile-drawer"
          >
            {[
              { id: "home", label: "Home" },
              { id: "portfolio", label: "Portfolio" },
              { id: "shop", label: "Shop Links" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`py-2 text-sm uppercase tracking-wider block w-full ${
                  activeNav === item.id ? "text-brand-gold font-bold" : "text-gray-300 hover:text-white"
                }`}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("shop")}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-dark py-3 text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-white transition-all"
              id="mobile-shop-cta"
            >
              <ShoppingBag className="w-4 h-4" />
              Visit Our Marketplaces
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center py-20" id="hero-banner">
        {/* Pattern Background with radial fade to deep aubergine */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroPatternBanner}
            alt="Snadia Creations Seamless Pattern Banner" 
            className="w-full h-full object-cover opacity-35 transform scale-105 select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#120914_90%)]"></div>
        </div>

        {/* Brand Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            
            {/* Elegant luxury badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-aubergine/60 border border-brand-gold/20 text-brand-gold text-xs uppercase tracking-[0.2em] font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              Surface Pattern Design Studio
            </motion.div>

            {/* Main Brand Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-6"
            >
              Pattern, <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-light">
             Reimagined.
             </span>
            
            </motion.h1>

            {/* Tagline / Story intro */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-light mb-10"
            >
              We design vibrant, nature-inspired surface patterns — from bold florals and tropical prints to abstract shapes and vintage-inspired motifs — for fabric, wallpaper, and home decor.
            </motion.p>

            {/* Interactive Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={() => scrollToSection("portfolio")}
                className="bg-brand-gold text-brand-dark hover:bg-brand-gold-light px-8 py-4 rounded-lg font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-brand-gold/10 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-explore-btn"
              >
                Explore Portfolio
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollToSection("shop")}
                className="border border-brand-gold/40 hover:border-brand-gold text-brand-gold hover:text-white hover:bg-brand-gold/5 px-8 py-4 rounded-lg font-semibold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-shop-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                Where to Buy
              </button>
            </motion.div>

          </div>
        </div>

        {/* Decorative corner vector layout to add luxury feel */}
        <div className="absolute right-4 bottom-4 w-40 h-40 sm:w-64 sm:h-64 opacity-60 pointer-events-none">
        <img src={logoSymbol} alt="Snadia Creations Symbol" className="w-full h-full object-contain opacity-100 brightness-125 mix-blend-screen" />
       </div>
      </section>


      {/* PORTFOLIO SECTION */}
      <section className="py-24 bg-brand-dark relative z-10" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">The Gallery</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-2">
              Featured Patterns & Mockups
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light mt-4">
              Explore our pristine digital mockups, wallpapers, and custom textile swatches. Each collection represents seamless geometric and botanic symmetry.
            </p>
          </div>

          <StarDivider />

          {/* Filtering Category Tabs */}
          <div className="flex justify-center flex-wrap items-center gap-2 sm:gap-4 mb-12">
            {[
              { id: "All", label: "All Works" },
              { id: "Fabric", label: "Fabric Swatches" },
              { id: "Wallpaper", label: "Wallpaper Previews" },
              { id: "Product", label: "Product Mockups" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id 
                    ? "bg-brand-gold text-brand-dark shadow-md" 
                    : "bg-brand-aubergine/40 border border-brand-gold/10 text-gray-400 hover:text-white hover:border-brand-gold/30"
                }`}
                id={`filter-tab-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* PORTFOLIO GRID */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            id="portfolio-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredPatterns.map((pattern, index) => {
                const isLiked = !!likes[pattern.id];
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={pattern.id}
                    className="group bg-brand-aubergine/20 border border-brand-gold/10 rounded-2xl overflow-hidden shadow-xl hover:border-brand-gold/30 hover:shadow-2xl transition-all-custom duration-500 cursor-pointer"
                    onClick={() => setSelectedItem(pattern)}
                    id={`portfolio-card-${pattern.id}`}
                  >
                    {/* Image Area with luxury hover actions */}
                    <div className="relative aspect-square overflow-hidden bg-brand-aubergine">
                      <img 
                        src={pattern.image} 
                        alt={pattern.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Gradient overlay on card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Top Corner Badge - Category */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-brand-dark/80 backdrop-blur-md border border-brand-gold/20 text-brand-gold text-[10px] uppercase tracking-widest font-semibold rounded-full">
                          {pattern.category}
                        </span>
                      </div>

                      {/* Top Corner Action - Favorite */}
                      <button 
                        onClick={(e) => toggleLike(pattern.id, e)}
                        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-brand-dark/80 backdrop-blur-md border border-brand-gold/15 text-brand-gold hover:text-brand-ruby hover:scale-110 transition-all duration-300"
                        id={`like-btn-${pattern.id}`}
                        aria-label="Favorite design"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-brand-ruby stroke-brand-ruby" : "stroke-current fill-transparent"}`} />
                      </button>

                      {/* Floating hover reveal content */}
                      <div className="absolute bottom-0 inset-x-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-medium mb-1 flex items-center gap-1">
                          <Palette className="w-3 h-3" />
                          View Color Palette
                        </span>
                        <h3 className="font-serif text-xl font-medium text-white mb-2">
                          {pattern.title}
                        </h3>
                        <p className="text-xs text-gray-300 font-light line-clamp-2 mb-4">
                          {pattern.description}
                        </p>
                        
                        {/* Quick Purchase Hover Link */}
                        <div className="flex gap-2">
                          {Object.keys(pattern.marketplaceLinks).slice(0, 2).map((key) => (
                            <span 
                              key={key}
                              className="px-3 py-1.5 bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1"
                            >
                              Available on {key}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Static Card Area (Visible Always) */}
                    <div className="p-5 border-t border-brand-gold/5 flex items-center justify-between bg-brand-aubergine/10">
                      <div>
                        <h4 className="font-serif text-lg font-medium text-white group-hover:text-brand-gold transition-colors duration-300">
                          {pattern.title}
                        </h4>
                        <span className="text-[11px] text-gray-400 tracking-wider">
                          {pattern.category} Collection
                        </span>
                      </div>
                      
                      {/* Action Button */}
                      <span className="w-8 h-8 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark group-hover:border-brand-gold transition-all duration-300">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>


      {/* INTERACTIVE LIGHTBOX / DETAIL MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10" id="lightbox-container">
            {/* Dark background overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md cursor-zoom-out"
            ></motion.div>

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-5xl bg-brand-aubergine border border-brand-gold/30 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto flex flex-col md:flex-row lightbox-open"
              id="lightbox-modal"
            >
              
              {/* Close button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-dark/80 text-brand-gold border border-brand-gold/25 hover:text-white hover:border-brand-gold transition-colors cursor-pointer"
                id="close-lightbox-btn"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image Zoom Preview */}
              <div className="w-full md:w-1/2 relative bg-brand-dark flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-contain select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Category Label */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-4 py-1.5 bg-brand-dark/85 border border-brand-gold/25 text-brand-gold text-xs uppercase tracking-widest font-semibold rounded-full">
                    {selectedItem.category}
                  </span>
                </div>
              </div>

              {/* Right Column: Dynamic Info & Shopping */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-brand-aubergine/40 border-l border-brand-gold/10">
                <div>
                  
                  {/* Decorative Geometric Header Detail */}
                  <div className="flex items-center gap-2 mb-4">
                    <GeometricStar className="w-4 h-4 text-brand-gold" />
                    <span className="text-xs tracking-[0.25em] uppercase text-brand-gold font-semibold">
                      Featured Product Design
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-3xl md:text-4xl font-medium text-white tracking-tight mb-3">
                    {selectedItem.title}
                  </h3>

                  {/* details */}
                  <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                    {selectedItem.details}
                  </p>

                  {/* Design ID */}
<div className="mb-8" id="design-id-widget">
  <span className="text-xs uppercase tracking-widest text-brand-gold">
    Design Reference
  </span>
  <div className="mt-2">
    <button
      onClick={() => copyToClipboard(selectedItem.designId)}
      className="px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition font-mono font-medium tracking-wide"
      title={`Click to copy ${selectedItem.designId}`}
    >
      {selectedItem.designId}
    </button>
  </div>
</div>

                </div>

                {/* Direct Buy Marketplace Outlets */}
                <div className="border-t border-brand-gold/15 pt-6 mt-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-bold block mb-4 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4" />
                    Purchase on External Marketplaces
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="lightbox-marketplaces">
                    {/* Spoonflower */}
                    {selectedItem.marketplaceLinks.spoonflower && (
                      <a
                        href={selectedItem.marketplaceLinks.spoonflower}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-brand-emerald/20 to-brand-emerald/5 hover:from-brand-emerald/30 border border-brand-emerald/30 hover:border-brand-emerald/80 text-white transition-all duration-300 group text-sm font-semibold"
                      >
                        <span>Buy on Spoonflower</span>
                        <ExternalLink className="w-4 h-4 text-brand-emerald group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}

                    {/* Redbubble */}
                    {selectedItem.marketplaceLinks.redbubble && (
                      <a
                        href={selectedItem.marketplaceLinks.redbubble}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-brand-ruby/20 to-brand-ruby/5 hover:from-brand-ruby/30 border border-brand-ruby/30 hover:border-brand-ruby/80 text-white transition-all duration-300 group text-sm font-semibold"
                      >
                        <span>Buy on Redbubble</span>
                        <ExternalLink className="w-4 h-4 text-brand-ruby group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}

                    {/* Zazzle */}
                    {selectedItem.marketplaceLinks.zazzle && (
                      <a
                        href={selectedItem.marketplaceLinks.zazzle}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-brand-sapphire/20 to-brand-sapphire/5 hover:from-brand-sapphire/30 border border-brand-sapphire/30 hover:border-brand-sapphire/80 text-white transition-all duration-300 group text-sm font-semibold"
                      >
                        <span>Buy on Zazzle</span>
                        <ExternalLink className="w-4 h-4 text-brand-sapphire group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}

                    {/* Creative Market */}
                    {selectedItem.marketplaceLinks.creativeMarket && (
                      <a
                        href={selectedItem.marketplaceLinks.creativeMarket}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-brand-teal/20 to-brand-teal/5 hover:from-brand-teal/30 border border-brand-teal/30 hover:border-brand-teal/80 text-white transition-all duration-300 group text-sm font-semibold"
                      >
                        <span>Buy on Creative Market</span>
                        <ExternalLink className="w-4 h-4 text-brand-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>

                  {/* Copyright notice */}
                  <p className="text-[10px] text-gray-500 font-light mt-5 text-center">
                    All patterns are copyrighted © Snadia Creations. Licensing queries are welcome.
                  </p>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* SHOP LINKS SECTION ("Where to Buy") */}
      <section className="py-24 bg-brand-dark/50 border-y border-brand-gold/10 relative z-10" id="shop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">Where to Buy</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-2">
              Our Online Marketplace Outlets
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light mt-4">
              We partner with global leading print-on-demand marketplaces. Click below to view Snadia Creations collections on premium fabric bolts, home goods, wallpapers, and customizable designs.
            </p>
          </div>

          <StarDivider />

          {/* Marketplace Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12" id="marketplace-grid">
            
            {/* Spoonflower Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-brand-aubergine/30 border border-brand-emerald/20 p-8 rounded-2xl flex flex-col justify-between min-h-[260px] shadow-lg hover:border-brand-emerald/70 transition-all duration-300"
              id="marketplace-spoonflower"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald font-bold text-xl mb-6">
                  SF
                </div>
                <h3 className="font-serif text-2xl font-medium text-white mb-2">Spoonflower</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Best for custom fabrics by the yard, high-end organic wallpaper, and pre-sewn home textiles like curtains and bed sheets.
                </p>
              </div>
              <a
                href="https://www.spoonflower.com/profiles/snadiacreations"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold font-bold hover:text-white mt-6 transition-colors"
              >
                Shop Fabrics
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Redbubble Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-brand-aubergine/30 border border-brand-ruby/20 p-8 rounded-2xl flex flex-col justify-between min-h-[260px] shadow-lg hover:border-brand-ruby/70 transition-all duration-300"
              id="marketplace-redbubble"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-ruby/10 border border-brand-ruby/30 flex items-center justify-center text-brand-ruby font-bold text-xl mb-6">
                  RB
                </div>
                <h3 className="font-serif text-2xl font-medium text-white mb-2">Redbubble</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Best for high-quality everyday merchandise, smartphone cases, vibrant matte stickers, apparel, and durable custom tote bags.
                </p>
              </div>
              <a
                href="https://www.redbubble.com/people/nadiacreativity"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold font-bold hover:text-white mt-6 transition-colors"
              >
                Shop Merchandise
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Zazzle Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-brand-aubergine/30 border border-brand-sapphire/20 p-8 rounded-2xl flex flex-col justify-between min-h-[260px] shadow-lg hover:border-brand-sapphire/70 transition-all duration-300"
              id="marketplace-zazzle"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-sapphire/10 border border-brand-sapphire/30 flex items-center justify-center text-brand-sapphire font-bold text-xl mb-6">
                  ZZ
                </div>
                <h3 className="font-serif text-2xl font-medium text-white mb-2">Zazzle</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Best for fully customizable gift wrapping paper, wedding stationery, luxury mugs, home decor accents, and party accessories.
                </p>
              </div>
              <a
                href="https://www.zazzle.com/store/snadiacreations"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold font-bold hover:text-white mt-6 transition-colors"
              >
                Shop Gifts
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Creative Market Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-brand-aubergine/30 border border-brand-teal/20 p-8 rounded-2xl flex flex-col justify-between min-h-[260px] shadow-lg hover:border-brand-teal/70 transition-all duration-300"
              id="marketplace-creativemarket"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal font-bold text-xl mb-6">
                  CM
                </div>
                <h3 className="font-serif text-2xl font-medium text-white mb-2">Creative Market</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Best for design professionals purchasing high-res commercial repeat swatches, digital pattern tiles, and vector license packs.
                </p>
              </div>
              <a
                href="https://creativemarket.com/snadiacreations"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold font-bold hover:text-white mt-6 transition-colors"
              >
                Buy Vector Files
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

          </div>

        </div>
      </section>


      {/* ABOUT THE BRAND SECTION */}
      <section className="py-24 bg-brand-dark relative overflow-hidden z-10" id="about">
        
        {/* Subtle geometric decorative backdrops */}
        <div className="absolute top-1/2 left-0 w-96 h-96 opacity-5 -translate-y-1/2 -translate-x-1/2 pointer-events-none">
          <GeometricStar className="w-full h-full text-brand-gold" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column: Overlapping Luxury Layout showcasing a pattern swatch */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative max-w-md w-full">
                
                {/* Background gold card border */}
                <div className="absolute inset-0 border-2 border-brand-gold/25 rounded-2xl transform translate-x-4 translate-y-4 pointer-events-none"></div>
                
                {/* Image card with gold border and subtle drop shadows */}
                <div className="relative rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl bg-brand-aubergine aspect-[4/5]">
                  <img 
                    src={underTheSea} 
                    alt="Snadia Creations Under the Sea Pattern" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
                  
                  {/* Overlay branding detail */}
                  <div className="absolute bottom-6 inset-x-6">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold block mb-1">
                      Our Philosophy
                    </span>
                    <h4 className="font-serif text-4xl text-white font-medium">
                      "Where nature meets modern design"
                    </h4>
                  </div>
                </div>

                {/* Micro Floating Motif Swatch Card */}
                <div className="absolute -bottom-6 -right-6 bg-brand-aubergine border border-brand-gold/40 p-4 rounded-xl shadow-xl max-w-[180px] hidden sm:block">
                  <div className="flex items-center gap-2 mb-2">
                    <GeometricStar className="w-4 h-4 text-brand-gold animate-spin-slow" />
                    <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold">100% Seamless</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                    Precisely hand-crafted vectors that repeat fluidly over any length of material.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Narrative Brand Story */}
            <div className="w-full lg:w-1/2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">About Snadia Creations</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-2 mb-6">
                  Blending Nature & Modern Design
                </h2>
              
              <div className="space-y-6 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                <p>
                  At <strong className="text-brand-gold font-medium">Snadia Creations</strong>, we're passionate about turning everyday inspiration — nature, texture, and pattern — into surface designs people love to live with. Our collections find their heartbeat in four distinct styles:
                </p>

                {/* Bullet list with custom decorative gold bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <GeometricStar className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Floral & Botanical</h4>
                      <p className="text-xs text-gray-400 mt-1">Delicate blossoms, wildflowers, and leafy motifs designed for a soft, natural feel.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <GeometricStar className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Geometric & Checks</h4>
                      <p className="text-xs text-gray-400 mt-1">Clean grids, checks, and repeating shapes built for a modern, structured look.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <GeometricStar className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Animal Print</h4>
                      <p className="text-xs text-gray-400 mt-1">Bold prints inspired by nature's own patterns, from classic spots to playful textures.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <GeometricStar className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Nautical & Stripes</h4>
                      <p className="text-xs text-gray-400 mt-1">Coastal-inspired stripes and sea motifs bringing a fresh, breezy energy to any space.</p>
                    </div>
                  </div>
                </div>

                <p className="pt-4">
                  Each pattern starts as a hand-drawn or digitally illustrated concept, refined into seamless, high-resolution repeats — ready for fabric, wallpaper, home decor, and beyond.
                </p>

                <p>
                   We work with fabric mills, home goods brands, and interior decorators looking for fresh, ready-to-license surface patterns. If you're interested in bringing our designs into your next product line, explore our marketplace links or reach out directly for custom licensing.
                </p>
              </div>

              {/* About Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-brand-gold/15 mt-10">
                <div>
                  <span className="block font-serif text-3xl font-bold text-white">100+</span>
                  <span className="block text-[10px] uppercase tracking-widest text-brand-gold mt-1">Seamless Patterns</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-white">4</span>
                  <span className="block text-[10px] uppercase tracking-widest text-brand-gold mt-1">Partner Stores</span>
                </div>
                <div>
                  <span className="block font-serif text-3xl font-bold text-white">100%</span>
                  <span className="block text-[10px] uppercase tracking-widest text-brand-gold mt-1">High-Res Vector</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* CONTACT & SOCIAL PORTAL SECTION */}
      <section className="py-24 bg-brand-dark/40 border-t border-brand-gold/10 relative z-10" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-16 items-stretch">
            
            {/* Left Column: Direct Inquiries & Handles */}
            <div className="w-full lg:w-5/12 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">Connect with Us</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-2 mb-6">
                  Bring Elegance to Your Next Project
                </h2>
                <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-8">
                  We love collaborating with interior designers, boutique fabric brands, licensing agents, and retail shops. If you would like to discuss custom commission projects, colorway changes, or exclusive licensing, get in touch!
                </p>

            {/* Direct contact indicators */}
<div className="space-y-4">
  <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-aubergine/20 border border-brand-gold/10">
    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
      <Mail className="w-5 h-5" />
    </div>
    <div>
      <span className="block text-[10px] uppercase tracking-widest text-gray-400">Email Inquiry</span>
      <a href="mailto:snadiasaleem16@gmail.com" className="text-white hover:text-brand-gold text-sm font-semibold transition-colors">
        snadiasaleem16@gmail.com
      </a>
    </div>
  </div>

  <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-aubergine/20 border border-brand-gold/10">
    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
      <Instagram className="w-5 h-5" />
    </div>
    <div>
      <span className="block text-[10px] uppercase tracking-widest text-gray-400">Instagram</span>
      <a href="https://instagram.com/snadiacreations" target="_blank" rel="noreferrer" className="text-white hover:text-brand-gold text-sm font-semibold transition-colors">
        @snadiacreations
      </a>
    </div>
  </div>

  <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-aubergine/20 border border-brand-gold/10">
    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
      <Bookmark className="w-5 h-5" />
    </div>
    <div>
      <span className="block text-[10px] uppercase tracking-widest text-gray-400">Pinterest</span>
      <a href="https://www.pinterest.com/snadiacreations/" target="_blank" rel="noreferrer" className="text-white hover:text-brand-gold text-sm font-semibold transition-colors">
        @snadiacreations
      </a>
    </div>
  </div>

  <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-aubergine/20 border border-brand-gold/10">
    <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
      <Music2 className="w-5 h-5" />
    </div>
    <div>
      <span className="block text-[10px] uppercase tracking-widest text-gray-400">TikTok</span>
      <a href="https://www.tiktok.com/@snadiacreations" target="_blank" rel="noreferrer" className="text-white hover:text-brand-gold text-sm font-semibold transition-colors">
        @snadiacreations
      </a>
    </div>
 </div>
            </div>
          </div>
        </div>
  
                      
            {/* Right Column: Secure Inquiries Form */}
            <div className="w-full lg:w-7/12 bg-brand-aubergine/20 border border-brand-gold/15 rounded-3xl p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden">
              
              {/* Subtle design detail inside form */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none tr...">
              <img src={logoSymbol} alt="" className="w-full h-full object-contain" />
             </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight mb-2">
                Get in Touch
              </h3>
              <p className="text-xs text-gray-400 mb-8 font-light">
                Fill out the secure design form below. Our response time is typically within 24 hours.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-5" id="licensing-contact-form">
                
                {formError && (
                  <div className="p-4 bg-brand-ruby/15 border border-brand-ruby/40 text-brand-ruby text-xs font-semibold rounded-lg">
                    {formError}
                  </div>
                )}

                {formSubmitted && (
                  <div className="p-5 bg-brand-emerald/15 border border-brand-emerald/40 text-white rounded-xl flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-emerald flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-brand-gold">Thank you for your message!</h4>
                      <p className="text-xs text-gray-300 mt-1">Your inquiry regarding Snadia Creations licensing has been safely submitted. We will connect with you via email shortly.</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[11px] uppercase tracking-wider text-brand-gold font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Jane Doe"
                      className="w-full bg-brand-dark/60 border border-brand-gold/15 focus:border-brand-gold rounded-lg px-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[11px] uppercase tracking-wider text-brand-gold font-bold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="jane@example.com"
                      className="w-full bg-brand-dark/60 border border-brand-gold/15 focus:border-brand-gold rounded-lg px-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-[11px] uppercase tracking-wider text-brand-gold font-bold mb-2">
                    Primary Interest
                  </label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                    className="w-full bg-brand-dark/60 border border-brand-gold/15 focus:border-brand-gold rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                  >
                    <option value="CustomDesign" className="bg-brand-aubergine">Custom Design Request</option>
                    <option value="Colorway" className="bg-brand-aubergine">Colorway Change Request</option>
                    <option value="Scale" className="bg-brand-aubergine">Pattern Scale / Size Request</option>
                    <option value="Collaboration" className="bg-brand-aubergine">Collaboration Inquiry</option>
                    <option value="Other" className="bg-brand-aubergine">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] uppercase tracking-wider text-brand-gold font-bold mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your brand, product line, or the specific design you are interested in..."
                    className="w-full bg-brand-dark/60 border border-brand-gold/15 focus:border-brand-gold rounded-lg px-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full py-4 px-6 rounded-lg bg-brand-gold text-brand-dark hover:bg-brand-gold-light disabled:bg-gray-700 disabled:text-gray-400 font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-gold/5"
                  id="submit-contact-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Message
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark border-t border-brand-gold/15 py-12 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          <div className="flex items-center gap-2.5 mb-4">
            <img src={logoSymbol} alt="" className="w-18 h-18 object-contain animate-pulse" />
            <span className="font-serif text-xl font-semibold tracking-wide text-white">Snadia Creations</span>
          </div>

          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed font-light">
            "Bringing vibrant, nature-inspired patterns to fabrics, wallpapers, and home decor. Handcrafted with care."
          </p>

          <div className="flex gap-6 mt-6 text-[11px] tracking-wider uppercase text-gray-400">
            <button onClick={() => scrollToSection("home")} className="hover:text-brand-gold">Home</button>
            <button onClick={() => scrollToSection("portfolio")} className="hover:text-brand-gold">Portfolio</button>
            <button onClick={() => scrollToSection("shop")} className="hover:text-brand-gold">Shop</button>
            <button onClick={() => scrollToSection("about")} className="hover:text-brand-gold">About</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-brand-gold">Contact</button>
          </div>

          <p className="text-[10px] text-gray-600 mt-8">
            © 2026 Snadia Creations. All Rights Reserved. Designed for digital arts, wallpaper textiles, and luxury licensing.
          </p>

        </div>
      </footer>

    </div>
  );
}
