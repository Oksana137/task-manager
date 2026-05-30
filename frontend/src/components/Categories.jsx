import { useEffect, useState } from "react";
import { fetchCategories } from "../units/network";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchCategories({
      signal: controller.signal,
    })
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Error fetching categories:", error.message)
      );

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex gap-4 p-8">
      {categories &&
        categories.map((category, index) => (
          <Link key={index} to={`/category/${category.id}`}>
            <button className="btn btn-outline">{category.name}</button>
          </Link>
        ))}
    </div>
  );
};

export default Categories;
