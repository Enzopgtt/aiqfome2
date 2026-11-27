import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Bike,
  ChevronDown,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  UserRound,
  X,
} from "lucide-react";

type Restaurant = {
  name: string;
  category: string;
  rating: string;
  time: string;
  delivery: string;
  image: string;
  badge?: string;
  accent: string;
};

const categories = [
  { name: "Todos", emoji: "✦" },
  { name: "Hambúrguer", emoji: "🍔" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Japonesa", emoji: "🍣" },
  { name: "Brasileira", emoji: "🍛" },
  { name: "Doces", emoji: "🍰" },
  { name: "Saudável", emoji: "🥗" },
  { name: "Café", emoji: "☕" },
];

const restaurants: Restaurant[] = [
  {
    name: "Burgueria do Zé",
    category: "Hambúrguer",
    rating: "4,9",
    time: "25–35 min",
    delivery: "Grátis",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85",
    badge: "Mais pedido",
    accent: "#f4d56d",
  },
  {
    name: "Pizzaria 7 Luas",
    category: "Pizza",
    rating: "4,8",
    time: "35–45 min",
    delivery: "R$ 3,99",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=85",
    badge: "Frete leve",
    accent: "#f1a887",
  },
  {
    name: "Maki Maki",
    category: "Japonesa",
    rating: "4,7",
    time: "40–50 min",
    delivery: "R$ 4,99",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=85",
    accent: "#b8d7c9",
  },
  {
    name: "Da Roça Cozinha",
    category: "Brasileira",
    rating: "4,9",
    time: "30–40 min",
    delivery: "Grátis",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
    badge: "Queridinho local",
    accent: "#dfb978",
  },
  {
    name: "Verde de Casa",
    category: "Saudável",
    rating: "4,8",
    time: "25–35 min",
    delivery: "R$ 2,99",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    accent: "#b9d7a7",
  },
  {
    name: "Doce Encontro",
    category: "Doces",
    rating: "4,9",
    time: "20–30 min",
    delivery: "R$ 2,99",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=85",
    badge: "Novo por aqui",
    accent: "#f0b7bd",
  },
];

const offers = [
  {
    title: "Seu almoço com até 30% OFF",
    detail: "Em restaurantes selecionados perto de você",
    code: "ALMOCO30",
    tone: "offer-featured",
    icon: "🍛",
  },
  {
    title: "Frete grátis hoje",
    detail: "Do jeitinho que você gosta",
    code: "FRETEGRATIS",
    tone: "offer-peach",
    icon: "🛵",
  },
  {
    title: "Aquele docinho",
    detail: "R$ 10 off no primeiro pedido",
    code: "DOCINHO10",
    tone: "offer-yellow",
    icon: "🍰",
  },
];

const menuItems = [
  { name: "Combo da casa", description: "Burger, fritas e bebida", price: 39.9 },
  { name: "Pizza individual", description: "Até 2 sabores", price: 29.9 },
];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [cartCount, setCartCount] = useState(() => Number(localStorage.getItem("aiqfome-cart-count") ?? 0));
  const [cartTotal, setCartTotal] = useState(() => Number(localStorage.getItem("aiqfome-cart-total") ?? 0));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("Centro, Londrina");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("aiqfome-cart-count", String(cartCount));
    localStorage.setItem("aiqfome-cart-total", String(cartTotal));
  }, [cartCount, cartTotal]);

  const filteredRestaurants = useMemo(() => {
    const normalizedSearch = submittedSearch.trim().toLocaleLowerCase();
    return restaurants.filter((restaurant) => {
      const matchesCategory = activeCategory === "Todos" || restaurant.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        `${restaurant.name} ${restaurant.category}`.toLocaleLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, submittedSearch]);

  const addToCart = (item = menuItems[0]) => {
    setCartCount((count) => count + 1);
    setCartTotal((total) => total + item.price);
    toast.success(`${item.name} adicionado ao carrinho`, {
      description: "Você pode revisar seu pedido pelo carrinho.",
    });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedSearch(searchTerm);
    document.getElementById("restaurantes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFavorite = (name: string) => {
    setFavoriteRestaurants((favorites) =>
      favorites.includes(name) ? favorites.filter((favorite) => favorite !== name) : [...favorites, name],
    );
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="aiqfome início">
            <span className="brand-mark">a</span>
            <span className="brand-word">aiqfome<span className="brand-dot">.</span></span>
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a className="nav-link active" href="#restaurantes">Pedir comida</a>
            <a className="nav-link" href="#ofertas">Ofertas</a>
            <a className="nav-link" href="#parceiros">Seja parceiro</a>
          </nav>

          <div className="header-actions">
            <button className="location-button" type="button" onClick={() => setIsLocationOpen((open) => !open)} aria-expanded={isLocationOpen}>
              <MapPin size={16} strokeWidth={2.3} />
              <span>{deliveryLocation}</span>
              <ChevronDown size={15} />
            </button>
            {isLocationOpen && <div className="location-popover" role="dialog" aria-label="Escolher localização"><span className="popover-title">entregar em</span>{["Centro, Londrina", "Zona 7, Maringá", "Batel, Curitiba"].map((location) => <button type="button" key={location} className={deliveryLocation === location ? "selected" : ""} onClick={() => { setDeliveryLocation(location); setIsLocationOpen(false); toast.success("Localização atualizada", { description: location }); }}><MapPin size={14} />{location}</button>)}</div>}
            <button className="login-button" type="button" onClick={() => toast("Área do cliente", { description: "O login fica disponível no seu próximo pedido." })}>
              <UserRound size={17} />
              <span>Entrar</span>
            </button>
            <button className="cart-button" type="button" onClick={() => setIsCartOpen(true)} aria-label="Abrir carrinho">
              <ShoppingBag size={19} />
              <span className="cart-label">Carrinho</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Abrir menu">
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="mobile-menu" aria-label="Menu mobile">
            <a href="#restaurantes" onClick={() => setMobileMenuOpen(false)}>Pedir comida <ArrowRight size={15} /></a>
            <a href="#ofertas" onClick={() => setMobileMenuOpen(false)}>Ofertas <ArrowRight size={15} /></a>
            <a href="#parceiros" onClick={() => setMobileMenuOpen(false)}>Seja parceiro <ArrowRight size={15} /></a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={14} /> bom de pedir, melhor de receber</div>
              <h1>Comida boa tem <em>lugar</em> marcado.</h1>
              <p className="hero-text">Descubra sabores da sua cidade, encontre seus favoritos e peça sem complicação.</p>
              <form className="hero-search" onSubmit={handleSearch}>
                <Search size={20} className="search-icon" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Busque por restaurante ou prato"
                  aria-label="Buscar restaurante ou prato"
                />
                <button type="submit">Buscar</button>
              </form>
              <div className="hero-notes">
                <span><Bike size={16} /> Entrega rastreada</span>
                <span><Heart size={16} /> Feito para a sua cidade</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="Composição de pratos populares">
              <div className="hero-sticker"><span>feito</span><strong>com<br />carinho</strong></div>
              <div className="hero-main-image image-frame">
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1100&q=85" alt="Pizza artesanal com folhas frescas" />
                <div className="image-caption"><span>o pedido da vez</span><strong>Pizza artesanal</strong></div>
              </div>
              <div className="hero-small-image image-frame">
                <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85" alt="Prato com guiozas" />
              </div>
              <div className="hero-delivery-note"><Package size={18} /><span><strong>Chega quentinho</strong><small>da cozinha até a sua porta</small></span></div>
            </div>
          </div>
        </section>

        <section className="category-section section-space" aria-labelledby="category-title">
          <div className="container">
            <div className="section-heading compact-heading">
              <div>
                <span className="section-kicker">vai de quê?</span>
                <h2 id="category-title">Escolha seu mood.</h2>
              </div>
              <a className="text-link" href="#restaurantes">Ver tudo <ArrowRight size={16} /></a>
            </div>
            <div className="category-scroller" role="list" aria-label="Categorias de comida">
              {categories.map((category) => (
                <button
                  className={`category-pill ${activeCategory === category.name ? "selected" : ""}`}
                  type="button"
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setSubmittedSearch("");
                    setSearchTerm("");
                  }}
                  role="listitem"
                >
                  <span className="category-emoji">{category.emoji}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Sobre o aiqfome">
          <div className="container proof-grid">
            <div className="proof-intro"><span className="section-kicker">mais que delivery</span><strong>bom para pedir.<br /><em>bom para a cidade.</em></strong></div>
            <div className="proof-stat"><strong>6 mi</strong><span>de fominhas</span></div>
            <div className="proof-stat"><strong>30 mil</strong><span>lojistas parceiros</span></div>
            <div className="proof-stat"><strong>700+</strong><span>cidades conectadas</span></div>
          </div>
        </section>

        <section className="offers-section section-space" id="ofertas" aria-labelledby="offers-title">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">só hoje, viu?</span>
                <h2 id="offers-title">Achados que valem o clique.</h2>
              </div>
              <button className="round-arrow" type="button" onClick={() => toast("Mais ofertas chegando", { description: "Estamos preparando novos achados para você." })} aria-label="Ver mais ofertas"><ChevronRight size={20} /></button>
            </div>
            <div className="offers-grid">
              {offers.map((offer, index) => (
                <article className={`offer-card ${offer.tone}`} key={offer.code}>
                  <div className="offer-card-content">
                    <span className="offer-icon" aria-hidden="true">{offer.icon}</span>
                    <span className="offer-label">{index === 0 ? "oferta da casa" : index === 1 ? "queridinha" : "primeiro pedido"}</span>
                    <h3>{offer.title}</h3>
                    <p>{offer.detail}</p>
                    <button type="button" onClick={() => { navigator.clipboard?.writeText(offer.code); toast.success("Cupom copiado", { description: offer.code }); }}>
                      copiar {offer.code} <ArrowRight size={15} />
                    </button>
                  </div>
                  <div className="offer-art" aria-hidden="true"><span>{offer.icon}</span><span>{offer.icon}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="restaurants-section section-space" id="restaurantes" aria-labelledby="restaurants-title">
          <div className="container">
            <div className="section-heading restaurant-heading">
              <div>
                <span className="section-kicker">perto de você</span>
                <h2 id="restaurants-title">Favoritos do bairro.</h2>
                {submittedSearch && <p className="search-result-note">Resultados para “{submittedSearch}”</p>}
              </div>
              <div className="sort-control"><span>Ordenar:</span><button type="button">Mais pedidos <ChevronDown size={15} /></button></div>
            </div>
            {filteredRestaurants.length > 0 ? (
              <div className="restaurant-grid">
                {filteredRestaurants.map((restaurant) => {
                  const isFavorite = favoriteRestaurants.includes(restaurant.name);
                  return (
                    <article className="restaurant-card" key={restaurant.name}>
                      <div className="restaurant-image-wrap" style={{ backgroundColor: restaurant.accent }}>
                        <img src={restaurant.image} alt={restaurant.name} />
                        {restaurant.badge && <span className="restaurant-badge">{restaurant.badge}</span>}
                        <button className={`favorite-button ${isFavorite ? "is-favorite" : ""}`} type="button" onClick={() => toggleFavorite(restaurant.name)} aria-label={isFavorite ? `Remover ${restaurant.name} dos favoritos` : `Favoritar ${restaurant.name}`}>
                          <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <div className="restaurant-card-body">
                        <div className="restaurant-title-row"><h3>{restaurant.name}</h3><span className="rating"><Star size={13} fill="currentColor" /> {restaurant.rating}</span></div>
                        <p className="restaurant-category">{restaurant.category}</p>
                        <div className="restaurant-meta"><span><Clock3 size={14} /> {restaurant.time}</span><span><Bike size={14} /> {restaurant.delivery}</span></div>
                        <button className="quick-add-button" type="button" onClick={() => addToCart({ name: `Combo ${restaurant.name}`, description: "Escolha do chef", price: 39.9 })}><Plus size={16} /> adicionar pedido</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state"><Search size={24} /><h3>Nenhum sabor encontrado.</h3><p>Tente outra busca ou escolha uma categoria para continuar explorando.</p><button type="button" onClick={() => { setActiveCategory("Todos"); setSearchTerm(""); setSubmittedSearch(""); }}>Limpar filtros</button></div>
            )}
          </div>
        </section>

        <section className="local-section section-space" id="parceiros">
          <div className="container local-banner">
            <div className="local-copy">
              <span className="section-kicker">quem faz acontecer</span>
              <h2>Seu bairro tem<br /><em>muito sabor.</em></h2>
              <p>Do restaurante da esquina ao seu novo favorito: peça local, descubra histórias e fortaleça quem faz a cidade acontecer.</p>
              <button className="primary-button" type="button" onClick={() => toast("Que bom ter você por aqui", { description: "Em breve você também poderá cadastrar seu restaurante." })}>Conhecer o movimento <ArrowRight size={17} /></button>
            </div>
            <div className="local-collage" aria-hidden="true">
              <div className="collage-note">feito aqui<br /><strong>para você</strong></div>
              <div className="collage-photo photo-one"><img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=85" alt="" /></div>
              <div className="collage-photo photo-two"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85" alt="" /></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div><a className="brand footer-brand" href="#top"><span className="brand-mark">a</span><span className="brand-word">aiqfome<span className="brand-dot">.</span></span></a><p>Comida boa, do seu jeito.</p></div>
          <div className="footer-links"><a href="#ofertas">Ofertas</a><a href="#restaurantes">Restaurantes</a><a href="#parceiros">Seja parceiro</a><a href="#top">Ajuda</a></div>
          <span className="footer-copy">feito com fome em 2026</span>
        </div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="Ações rápidas">
        <a href="#top"><span>⌂</span>Início</a>
        <a href="#restaurantes"><Search size={18} />Buscar</a>
        <button type="button" onClick={() => setIsCartOpen(true)}><span className="bottom-cart-icon"><ShoppingBag size={18} />{cartCount > 0 && <b>{cartCount}</b>}</span>Carrinho</button>
        <button type="button" onClick={() => toast("Seus favoritos", { description: "Salve restaurantes para encontrar tudo mais rápido." })}><Heart size={18} />Favoritos</button>
      </nav>

      {isCartOpen && (
        <div className="cart-overlay" role="presentation" onClick={() => setIsCartOpen(false)}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}>
            <div className="cart-drawer-header"><div><span className="section-kicker">seu pedido</span><h2 id="cart-title">Carrinho</h2></div><button type="button" onClick={() => setIsCartOpen(false)} aria-label="Fechar carrinho"><X size={20} /></button></div>
            {cartCount === 0 ? (
              <div className="cart-empty"><div className="cart-empty-icon"><ShoppingBag size={24} /></div><h3>Ainda está vazio.</h3><p>Adicione um favorito do bairro para começar.</p><button type="button" onClick={() => setIsCartOpen(false)}>Explorar restaurantes</button></div>
            ) : (
              <>
                <div className="cart-items"><div className="cart-item"><div><strong>{cartCount > 1 ? `${cartCount} itens do seu pedido` : "Combo do seu restaurante"}</strong><span>Seleção especial do aiqfome</span></div><div className="cart-item-price">{formatCurrency(cartTotal)}</div></div><div className="cart-item-actions"><button type="button" onClick={() => { setCartCount((count) => Math.max(0, count - 1)); setCartTotal((total) => Math.max(0, total - 39.9)); }}><Minus size={14} /> Remover um</button><button type="button" onClick={() => addToCart()}><Plus size={14} /> Adicionar mais</button></div></div>
                <div className="cart-summary"><div><span>Subtotal</span><strong>{formatCurrency(cartTotal)}</strong></div><div><span>Entrega</span><strong className="free-delivery">grátis</strong></div><div className="cart-total"><span>Total</span><strong>{formatCurrency(cartTotal)}</strong></div><button className="primary-button checkout-button" type="button" onClick={() => toast.success("Pedido quase lá!", { description: "Escolha o endereço para finalizar." })}>Continuar pedido <ArrowRight size={17} /></button></div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
