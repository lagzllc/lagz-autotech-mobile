export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">Lagz AutoTech Mobile</h1>
      <div className="space-x-4">
        <a href="/" className="hover:text-primary">Home</a>
        <a href="/services" className="hover:text-primary">Services</a>
        <a href="/book" className="hover:text-primary">Book</a>
        <a href="/contact" className="hover:text-primary">Contact</a>
      </div>
    </nav>
  );
}
