import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 p-4 text-center">
      <div className="container mx-auto">
        <p><Link to={'/'}>EvenPulse</Link> © 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
