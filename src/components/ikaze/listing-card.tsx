import { Link } from "@tanstack/react-router";
import { Heart, MapPin, ArrowUpRight, BriefcaseBusiness, Wrench, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./demo-context";
import { money, type Listing } from "@/lib/domain";
export function ListingCard({ item }: { item: Listing }) {
  const { favorites, toggleFavorite } = useDemo();
  const selected = favorites.includes(item.id);
  const isJob = item.module === "jobs";
  return (
    <article className={`listing-card ${isJob ? "job-card" : ""}`}>
      {item.image ? (
        <Link to="/annonce/$id" params={{ id: item.id }} className="listing-image">
          <img src={item.image} alt={item.title} width={1024} height={768} loading="lazy" />
          {item.featured && <span className="premium-badge">Sélection démo</span>}
        </Link>
      ) : (
        !isJob && (
          <Link to="/annonce/$id" params={{ id: item.id }} className="listing-placeholder">
            {item.module === "business" ? <Building2 /> : <Wrench />}
            <span>{item.category}</span>
          </Link>
        )
      )}
      <div className="listing-body">
        <div className="listing-topline">
          <span className="category-label">
            {isJob && <BriefcaseBusiness size={16} />} {item.category}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={selected ? "favorite-active" : ""}
            aria-label={`${selected ? "Retirer des" : "Ajouter aux"} favoris : ${item.title}`}
            onClick={() => toggleFavorite(item.id)}
            title="Favoris"
          >
            {" "}
            <Heart fill={selected ? "currentColor" : "none"} />
          </Button>
        </div>
        <Link to="/annonce/$id" params={{ id: item.id }}>
          <h3>{item.title}</h3>
        </Link>
        <p className="seller">{item.seller}</p>
        <p className="location">
          <MapPin size={13} />
          {item.location}
        </p>
        {isJob && (
          <div className="tags">
            {item.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
        <div className="listing-bottom">
          {item.price > 0 ? (
            <div>
              <span className="price-caption">
                {item.unit === "à partir de" ? "À partir de" : ""}
              </span>
              <strong>
                {money(item.price)}
                <small>{item.unit?.startsWith("/") ? item.unit : ""}</small>
              </strong>
            </div>
          ) : (
            <span className="demo-label">{isJob ? "Offre fictive" : "Profil fictif"}</span>
          )}
          <Link
            to="/annonce/$id"
            params={{ id: item.id }}
            aria-label={`Voir ${item.title}`}
            className="arrow-link"
          >
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}
