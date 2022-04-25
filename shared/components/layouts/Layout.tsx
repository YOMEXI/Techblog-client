import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: any) {
  return (
    <>
      <div style={{ backgroundColor: "#CEE5D0" }} className="siteContainer">
        <header>
          <NavBar />
        </header>
        <main>{children}</main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
