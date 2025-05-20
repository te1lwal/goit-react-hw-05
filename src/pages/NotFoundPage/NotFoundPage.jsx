import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <main className={css.not_found_container}>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <Link to="/" className={css.go_home_link}>
        Go to Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
