import Header from "../components/Header";

export default function UserLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
