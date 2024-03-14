import { wishListService } from "../../services/film.service";
import { useEffect, useState } from "react";

function WishList(id) {
  const [wishFilms, setWishFilms] = useState([]);

  useEffect(() => {
    console.log(id);
    const fetchNewFilms = async () => {
      try {
        const { data } = await wishListService.getData(id);
        setWishFilms(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      }
    };

    fetchNewFilms();
  }, [id]);

  return (
  <div>
    {wishFilms.original_title ? wishFilms.original_title : <h2>Films are empty</h2>}
  </div>
  )
}

export default WishList;
