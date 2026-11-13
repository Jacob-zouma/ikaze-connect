import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Wrench,
  ShoppingBag,
  BriefcaseBusiness,
  Monitor,
  Truck,
  Building2,
  GraduationCap,
  Megaphone,
  ShieldCheck,
  Users,
  Smartphone,
  ChevronRight,
  Zap,
  Droplets,
  Paintbrush,
  Laptop,
  Scissors,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/ikaze-community.jpg";
import designer from "@/assets/designer.jpg";
import { modules, listings } from "@/lib/demo-data";
import { ListingCard } from "@/components/ikaze/listing-card";
import { SectionTitle, DemoNotice } from "@/components/ikaze/page-utils";
const icons = [
  Wrench,
  ShoppingBag,
  BriefcaseBusiness,
  Monitor,
  Truck,
  Megaphone,
  Building2,
  GraduationCap,
];
export function Home() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <section className="home-hero">
        <img
          src={hero}
          className="hero-photo"
          alt="Professionnelle burundaise dans un atelier, photographie illustrative"
          width={1536}
          height={1024}
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="hero-eyebrow">
            <span /> DES TALENTS D’ICI. DES POSSIBILITÉS SANS LIMITE.
          </span>
          <h1>
            IKAZE CONNECT
            <span>
              Votre quotidien,
              <br />
              plein de possibilités.
            </span>
          </h1>
          <p>
            Trouvez les bons professionnels, découvrez des produits
            <br className="desktop-break" /> et saisissez les opportunités près de chez vous.
          </p>
          <form
            className="hero-search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/recherche", search: { q: query, lieu: location } });
            }}
          >
            <div>
              <Search size={20} />
              <input
                aria-label="Que recherchez-vous ?"
                placeholder="Un service, un produit, une opportunité…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <label>
              <MapPin size={18} />
              <select
                aria-label="Localisation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Tout le Burundi</option>
                <option>Bujumbura</option>
                <option>Gitega</option>
                <option>Ngozi</option>
              </select>
            </label>
            <Button type="submit" size="lg">
              Rechercher <ArrowRight />
            </Button>
          </form>
          <div className="hero-popular">
            <span>Populaire :</span>
            {["Électricité", "Création de CV", "Mobilier"].map((text, i) => (
              <Link
                key={text}
                to="/$module"
                params={{ module: i === 1 ? "digital" : i === 2 ? "market" : "services" }}
              >
                {text}
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        </div>
        <div className="hero-caption">
          <span className="hero-caption-line" /> Les talents de chez nous,
          <br />
          <strong>au cœur de vos projets.</strong>
        </div>
      </section>
      <section className="module-shortcuts">
        <div className="container shortcuts-grid">
          {modules.map((m, i) => {
            const Icon = icons[i] ?? Wrench;
            return (
              <Link key={m.key} to="/$module" params={{ module: m.key }}>
                <span className={`module-icon module-${m.key}`}>
                  <Icon size={24} />
                </span>
                <strong>{m.label}</strong>
                <span>
                  {
                    [
                      "Un pro à vos côtés",
                      "Achetez local",
                      "Votre prochain défi",
                      "Donnez vie à vos idées",
                      "D’un point à l’autre",
                      "Les bonnes affaires",
                      "Développez votre activité",
                      "Faites le premier pas",
                    ][i]
                  }
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <div className="container home-demo">
        <DemoNotice />
      </div>
      <section className="container section">
        <SectionTitle
          eyebrow="LES SAVOIR-FAIRE PRÈS DE CHEZ VOUS"
          title="Un besoin ? Un talent pour vous."
        >
          <Button variant="link" asChild>
            <Link to="/$module" params={{ module: "services" }}>
              Tous les services <ArrowRight />
            </Link>
          </Button>
        </SectionTitle>
        <div className="category-strip">
          {[
            { name: "Électricité", icon: Zap },
            { name: "Plomberie", icon: Droplets },
            { name: "Menuiserie", icon: Wrench },
            { name: "Graphisme", icon: Paintbrush },
            { name: "Informatique", icon: Laptop },
            { name: "Couture", icon: Scissors },
          ].map(({ name, icon: Icon }) => (
            <Link key={name} to="/recherche" search={{ q: name, lieu: "" }}>
              <Icon size={20} />
              {name}
              <ChevronRight size={15} />
            </Link>
          ))}
        </div>
        <div className="listing-grid">
          {listings
            .filter((i) => i.module === "services")
            .slice(0, 4)
            .map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
        </div>
      </section>
      <section className="market-band">
        <div className="container section">
          <SectionTitle
            eyebrow="ACHETEZ LOCAL, TROUVEZ L’ESSENTIEL"
            title="De belles découvertes sur le Market."
          >
            <Button variant="link" asChild>
              <Link to="/$module" params={{ module: "market" }}>
                Explorer le Market <ArrowRight />
              </Link>
            </Button>
          </SectionTitle>
          <div className="market-layout">
            <div className="market-editorial">
              <ShoppingBag size={30} />
              <span>IKAZE MARKET</span>
              <h3>
                Une nouvelle façon
                <br />
                d’acheter près
                <br />
                de chez vous.
              </h3>
              <p>
                Mobilier, électronique, artisanat…
                <br />
                Faites place à vos envies.
              </p>
              <Button variant="secondary" asChild>
                <Link to="/$module" params={{ module: "market" }}>
                  Je découvre <ArrowUpRight />
                </Link>
              </Button>
            </div>
            {listings
              .filter((i) => i.module === "market")
              .map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
          </div>
        </div>
      </section>
      <section className="container section">
        <SectionTitle eyebrow="FAITES LE PROCHAIN PAS" title="Votre prochaine opportunité.">
          <Button variant="link" asChild>
            <Link to="/$module" params={{ module: "jobs" }}>
              Toutes les opportunités <ArrowRight />
            </Link>
          </Button>
        </SectionTitle>
        <p className="section-subtitle">
          Emplois, stages et missions : des parcours à explorer. Les offres ci-dessous sont
          fictives.
        </p>
        <div className="jobs-grid">
          {listings
            .filter((i) => i.module === "jobs")
            .map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
        </div>
      </section>
      <section className="digital-band">
        <div className="container digital-layout">
          <img
            src={designer}
            alt="Créatrice de services numériques, illustration"
            width={1024}
            height={768}
            loading="lazy"
          />
          <div>
            <span className="eyebrow">IKAZE DIGITAL</span>
            <h2>
              Vos idées méritent
              <br />
              de prendre vie.
            </h2>
            <p>
              Un logo, un site web, un CV qui vous ressemble.
              <br />
              Rencontrez les talents qui feront la différence.
            </p>
            <div className="tags">
              <span>Design & identité</span>
              <span>Développement web</span>
              <span>CV & documents</span>
            </div>
            <Button asChild size="lg">
              <Link to="/$module" params={{ module: "digital" }}>
                Trouver un talent numérique <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="container section trust-grid">
        {[
          {
            icon: Users,
            title: "Les talents d’ici",
            text: "Une plateforme pensée pour les professionnels et commerçants burundais.",
          },
          {
            icon: ShieldCheck,
            title: "La confiance, avant tout",
            text: "Des parcours transparents et des signalements pour protéger la communauté.",
          },
          {
            icon: Smartphone,
            title: "À portée de main",
            text: "Une expérience accessible, sur votre téléphone comme sur votre ordinateur.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon size={28} />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <section className="join-band">
        <div className="container">
          <div>
            <span className="eyebrow">FAITES GRANDIR VOTRE ACTIVITÉ</span>
            <h2>Votre talent a sa place ici.</h2>
            <p>Artisan, commerçant, indépendant : ouvrez-vous à de nouvelles possibilités.</p>
          </div>
          <Button variant="gold" asChild size="lg">
            <Link to="/inscription">
              Rejoindre IKAZE CONNECT <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
