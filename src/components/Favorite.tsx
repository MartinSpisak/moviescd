import { useFavoriteStore } from "../stores/FavoriteStore";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

function Favorite({ id }: { id: string }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }

  return (
    <button
      style={{
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
      onClick={handleClick}
      title={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite(id) ? <StarIcon /> : <StarOutlineIcon />}
    </button>
  );
}

export default Favorite;
